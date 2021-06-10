import https from 'https'

const agent = new https.Agent({  
    rejectUnauthorized: false
})

const initState = () => ({
    //message:'init'
})

export const state = initState

export const mutations = {
    // setMessage(state, message){
    //     state.message = message
    // },

    reset(state){
        Object.assign(state,initState())
    }
}

export const actions = {
    async nuxtServerInit({$axios,commit,dispatch}){
        // const message = await this.$axios.$get('https://localhost:5001/api/home',{httpsAgent: agent })
        // // console.log(message)
        // // commit('setMessage', message)
        // await dispatch('tricks/fetchTricks')
        // await dispatch('submissions/fetchSubmissions')
    }
}