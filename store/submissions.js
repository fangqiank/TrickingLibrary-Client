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
    async fetchSubmissionsForTrick({$axios,commit},{trickId}){
        const submissions = await this.$axios.$get(`/api/tricks/${trickId}/submissions`,{httpsAgent: agent })
        //console.log(submissions)
        commit('setSubmissions', {submissions})
    },

    createOneSubmission({$axios,/*state,dispatch*/},{form}){
        return this.$axios.$post('/api/submissions',form,{httpsAgent: agent })
    }
}
