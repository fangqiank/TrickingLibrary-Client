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
        const tricks = await this.$axios.$get('/api/tricks',{httpsAgent: agent })
        //console.log('tricks',tricks)
        commit('setTricks', {tricks})
    },
}