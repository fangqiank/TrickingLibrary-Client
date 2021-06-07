import https from 'https'

const agent = new https.Agent({  
    rejectUnauthorized: false
})

const initState = () => ({
    uploadPromise: null,
})

export const state = initState

export const mutations = {
    setTask(state, payload){
        //console.log('payload',payload)
        const {uploadPromise} = payload
        state.uploadPromise = uploadPromise
    },

    reset(state){
        Object.assign(state,initState())
    }
}

export const actions = {
    startVideoUpload({$axios,commit,dispatch},{form}){
        const uploadPromise = this.$axios.$post('https://localhost:5001/api/videos',form, {httpsAgent: agent })

        commit('setTask',{uploadPromise})
    }
}