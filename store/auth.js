import agent from "@/store/httpsAgent";

const initState = () => ({
    //user:null,
    //loading: true,
    profile:null,
})

const ROLES = {
    MODERATOR: 'Admin'
}

export const state = initState

export const getters = {
    //authenticated: state => !state.loading && state.user !=  null,
    authenticated: state => !state.loading && state.profile !=  null,
    //moderator:  (state, getters) => getters.authenticated && state.user.profile === ROLES.MODERATOR
    moderator:  (state, getters) => getters.authenticated && state.profile.isMod
}

export const mutations = {
    /* saveUser(state, payload){
        //console.log('auth payload: ', payload)
        const {user} = payload
        state.user = user
    }, */

    saveProfile(state, payload){
      //console.log('saveProfile payload: ', payload)
      const {profile} = payload
      state.profile = profile
  },

    /* finishLoading(state){
        state.loading = false
    }*/
}

export const actions = {
    initialize({commit}) {
      //console.log('agent: ',agent())
      return this.$axios.$get('/api/users/whoami',{httpsAgent: agent() })
        .then(profile => {
          console.log('profile: ', profile)
          commit('saveProfile', {profile})
        })
        .catch(e => {
          console.log('failed to loading profile', e.response)
        })
    },
    //    return this.$auth.querySessionStatus()
    //    .then(status => {
    //        console.log(status)
    //        if(status)
    //         return this.$auth.getUser()
    //
    //    })
    //    .then(async (user) =>{
    //             if(user){
    //               console.log('Got user')
    //               commit('saveUser', {user})
    //               this.$axios.setToken(`Bearer ${user.access_token}`)
    //
    //
    //             }
    //    })
    //    .catch(err=>{
    //        console.log(err.message)
    //        if(err.mssage==='login_required'){
    //         return this.$auth.removeUser()
    //        }
    //    })
    //    .finally(() => commit('finishLoading'))
    // },

  loginHandler(){
    if(process.server)
      return

    //localStorage.setItem('post-login-redirect-path',location.pathname)
      //return this.$auth.signinRedirect()
    const returnUrl = encodeURIComponent(location.href)
    window.location = `${this.$config.auth.loginPath}?returnUrl=${returnUrl}`
  },

  logoutHandler(){
    if(process.server)
      return

    const returnUrl = encodeURIComponent(location.href)
    window.location = `${this.$config.auth.logoutPath}`
  },
  // Eye on

  /*
  watchUserLoaded({state,getters}){
      if(process.server)
        return

      return new Promise(async (resolve,reject)=>{
        if(state.loading){
          const unwatch = this.watch(
            store=> store.auth.loading,
            (newVal,oldVal) =>{
              unwatch()
              resolve(getters.authenticated)
            }
          )
        }else{
          resolve(getters.authenticated)
        }
      })

  }
  */

}
