const initState = () => ({
    user:null,
    loading: true,
    profile:null,
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

    saveProfile(state, payload){
      //console.log('saveProfile payload: ', payload)
      const {profile} = payload
      state.profile = profile
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
       .then(async (user) =>{
                if(user){
                  console.log('Got user')
                  commit('saveUser', {user})
                  this.$axios.setToken(`Bearer ${user.access_token}`)
                  const profile = await this.$axios.$get('/api/users/whoami')
                  commit('saveProfile', {profile})
                }
       })
       .catch(err=>{
           console.log(err.message)
           if(err.mssage==='login_required'){
            return this.$auth.removeUser()
           }
       })
       .finally(() => commit('finishLoading'))
    },

  // Eye on
  watchUserLoaded({state,getters},action){
      if(process.server) return

      return new Promise(async (res,rej)=>{
        if(state.loading){
          console.log('start watching')
          const unwatch = this.watch(
            store=> store.auth.loading,
            (newVal,oldVal) =>{
              unwatch()
              if(!getters.authenticated){
                this.$auth.signinRedirect()
              }
              else if(!newVal){
                console.log('finish loading executing action')
                res(action())
              }

            }
          )
        }else{
          console.log('user is loaded executing action')
          await res(action())
        }
      })

  }

}
