import https from 'https'

const agent = new https.Agent({  
    rejectUnauthorized: false,
})

const initState = () => ({
    uploadPromise: null,
    active:false,
    component:null,
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
        const {uploadPromise} = payload
        state.uploadPromise = uploadPromise
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

    reset(state){
        Object.assign(state,initState())
    }
}

export const actions = {
    startVideoUpload({$axios,commit,/*dispatch*/},{form}){
        const uploadPromise = this.$axios.$post('/api/videos',form, {httpsAgent: agent })

        commit('setTask',{uploadPromise})
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

    async createSubmission({$axios,state,dispatch,commit},{form}){
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