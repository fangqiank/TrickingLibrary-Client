import https from 'https'

const agent = new https.Agent({
    rejectUnauthorized: false,
})

const initState = () => ({
    uploadPromise: null,
    active:false,
    component:null,
    uploadCompleted:false,
    uploadCancelSource: null,
    //type:'',
})

//import {UPLOAD_TYPE} from '../data/enum'

export const state = initState

export const mutations = {
    activate(state,{component}){
      state.active = true
      state.component = component
    },

    // toggleActive(state){
    //     state.active = !state.active
    //     if(!state.active){
    //         Object.assign(state,initState())
    //     }
    // },

    hide(state){
        state.active = false
    },

    setTask(state, payload){
        //console.log('payload',payload)
        const {uploadPromise,source} = payload
        state.uploadPromise = uploadPromise
        state.uploadCancelSource = source
        state.step++
    },

    // setUploadType(state,payload){
    //     //console.log('payload',payload)
    //     const {type} = payload
    //     state.type = type
    //     console.log("state.type:",type)
    //     if(type === UPLOAD_TYPE.TRICK){
    //         state.step++
    //     }else if(type === UPLOAD_TYPE.SUBMISSION){
    //         state.step += 2
    //     }
    // },

    // incStep(state){
    //     state.step++
    // },

    completeUpload(state){
        state.uploadCompleted = true
    },

    reset(state){
        Object.assign(state,initState())
    }
}

export const actions = {
    startVideoUpload({$axios,commit},{form}){
        const source = this.$axios.CancelToken.source()

        const uploadPromise = this.$axios.post('/api/files',form,
         {progress:false, cancelToken:source.token},
         {httpsAgent: agent })
           .then(res =>{
             //console.log('res: ',res)
             const {data} = res
             commit('completeUpload')
             return data
           })
           .catch(err=>{
               if(this.$axios.isCancel(err)){
                  //todo
                }

           })

        commit('setTask',{uploadPromise,source})
    },

    // async createTrick({$axios,state,dispatch},{trick,submission}){
    //     if(state.type === UPLOAD_TYPE.TRICK){
    //         console.log(123)
    //         const createdTrick = await this.$axios.$post('/api/tricks',trick,{httpsAgent: agent })
    //         console.log(createdTrick)
    //         submission.trickId =createdTrick.id
    //     }


    //     await this.$axios.$post('/api/submissions',submission,{httpsAgent: agent })
    // }

    async cancelUpload({$axios,state,commit}){
        if(state.uploadPromise){
            commit('hide')

            if(state.uploadCompleted){
                const video = await state.uploadPromise
                await this.$axios.delete(`/api/files/${video}`)
            }else{
                state.uploadCancelSource.cancel()
            }
        }
        commit('reset')
    },

    async createSubmission({/*$axios,*/state,dispatch,commit},{form}){
        if(!state.uploadPromise){
            console.log("uploadPromise is null")
            return
        }

        form.video = await state.uploadPromise

        //await this.createOneSubmission({form: this.form})

        await dispatch('submissions/createOneSubmission',{form},{root:true})

        commit('reset')
    }
}
