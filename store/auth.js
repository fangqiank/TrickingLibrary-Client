const initState = () => ({
    user:null,
    loading: true,
})

const ROLES = {
    MODERATOR: 'Admin'
}

export const state = initState

export const getters = {
    authenticated: state => !state.loading && state.user !=  null,
    moderator:  (state, getters) => getters.authenticated && state.user.profile === ROLES.MODERATOR
}

export const mutations = {
    saveUser(state, payload){
        //console.log('auth payload: ', payload)
        const {user} = payload
        state.user = user
    },

    finishLoading(state){
        state.loading = false
    }
}

export const actions = {
    initialize({commit}){
       return this.$auth
          .getUser()
          .then(user =>{
            if(user){
              commit('saveUser', {user})
              this.$axios.setToken(`Bearer ${user.access_token}`)
            }
          })
          .finally(
              () => commit('finishLoading')
          )
    }
}