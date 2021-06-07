import https from 'https'

const agent = new https.Agent({  
    rejectUnauthorized: false
})

const initState = () => ({
    tricks:[]
})

export const state = initState

export const mutations = {
    setTricks(state, payload){
        //console.log('payload',payload)
        const {tricks} = payload
        state.tricks = tricks
    },

    reset(state){
        Object.assign(state,initState())
    }
}

export const actions = {
    async fetchTricks({$axios,commit}){
        const tricks = await this.$axios.$get('https://localhost:5001/api/tricks',{httpsAgent: agent })
        //console.log('tricks',tricks)
        commit('setTricks', {tricks})
    },

    async createTrick({$axios,commit,dispatch},{trick}){
        const tricks = await this.$axios.$post('https://localhost:5001/api/tricks',trick,{httpsAgent: agent })
        await dispatch('fetchTricks')
    }
}