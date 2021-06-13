import https from 'https'

const agent = new https.Agent({  
    rejectUnauthorized: false
})

const initState = () => ({
    tricks:[],
    categories:[],
    difficulties:[]
})

export const getters = {
    trickItems: state =>state.tricks.map(trick =>(
      {
         text:trick.name,
         value:trick.id
      }
    ))
}

export const state = initState

export const mutations = {
    setTricks(state, payload){
        //console.log('payload',payload)
        const {tricks,categories,difficulties} = payload
        state.tricks = tricks
        state.categories = categories
        state.difficulties = difficulties
    },

    reset(state){
        Object.assign(state,initState())
    }
}

export const actions = {
    async fetchTricks({$axios,commit}){
        const tricks = await this.$axios.$get('/api/tricks',{httpsAgent: agent })
        const categories = await this.$axios.$get('/api/categories',{httpsAgent: agent })
        const difficulties = await this.$axios.$get('/api/difficulty',{httpsAgent: agent })
        //console.log('tricks',tricks)
        commit('setTricks', {tricks,difficulties,categories})
    },

    createTrick({$axios},{form}){
        return this.$axios.$post('/api/tricks',form,{httpsAgent: agent })
    }
}