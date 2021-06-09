import https from 'https'

const agent = new https.Agent({  
    rejectUnauthorized: false,
})

const initState = () => ({
    uploadPromise: null,
    active:false,
    type:'',
    step:1,
})

import {UPLOAD_TYPE} from '../data/enum'

export const state = initState

export const mutations = {
    toggleActive(state){
        state.active = !state.active
        if(!state.active){
            Object.assign(state,initState())
        }
    },

    setTask(state, payload){
        //console.log('payload',payload)
        const {uploadPromise} = payload
        state.uploadPromise = uploadPromise
        state.step++
    },

    setUploadType(state,payload){
        //console.log('payload',payload)
        const {type} = payload
        state.type = type
        if(type === UPLOAD_TYPE.TRICK){
            state.step++
        }else if(type === UPLOAD_TYPE.SUBMISSION){
            state.step += 2
        }
    },

    incStep(state){
        state.step++
    },

    reset(state){
        Object.assign(state,initState())
    }
}

export const actions = {
    startVideoUpload({$axios,commit,dispatch},{form}){
        const uploadPromise = this.$axios.$post('/api/videos',form, {httpsAgent: agent })

        commit('setTask',{uploadPromise})
    },

    async createTrick({$axios,state,dispatch},{trick,submission}){
        if(state.type === UPLOAD_TYPE.TRICK){
            const createdTrick = await this.$axios.$post('/api/tricks',trick,{httpsAgent: agent })
            //console.log(createdTrick)
            submission.trickId =createdTrick.id
        }
        
    
        const createdSubmission = await this.$axios.$post('/api/submissions',submission,{httpsAgent: agent })
        
        await dispatch('tricks/fetchTricks',null,{root:true})
        await dispatch('submissions/fetchSubmissions',null,{root:true})
    }
}