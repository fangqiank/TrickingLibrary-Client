import https from 'https'

const agent = new https.Agent({  
    rejectUnauthorized: false
})

const initState = () => ({
    submissions:[]
})

export const state = initState

export const mutations = {
    setSubmissions(state, payload){
        //console.log('payload',payload)
        const {submissions} = payload
        state.submissions = submissions
    },

    reset(state){
        Object.assign(state,initState())
    }
}

export const actions = {
    async fetchSubmissions({$axios,commit}){
        const submissions = await this.$axios.$get('/api/submissions',{httpsAgent: agent })
        //console.log('tricks',tricks)
        commit('setSubmissions', {submissions})
    },
}