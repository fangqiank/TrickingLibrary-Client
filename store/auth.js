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
       return this.$auth.querySessionStatus()
       .then(status => {
           console.log(status)
           if(status)
            return this.$auth.getUser()
           
       })
       .then(user =>{
                if(user){
                  console.log('Got user')
                  commit('saveUser', {user})
                  this.$axios.setToken(`Bearer ${user.access_token}`)
                }
       })
       .catch(err=>{
           console.log(err.message)
           if(err.mssage==='login_required'){
            return this.$auth.removeUser() 
           }
       })
       .finally(() => commit('finishLoading'))
    }
}