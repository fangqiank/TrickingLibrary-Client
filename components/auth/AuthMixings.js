﻿export const GUARD_LEVEL = {
  AUTH: 1,
  MOD: 2
}

export const  guard = (level) => ({
  beforeRouteEnter(to, from, next){
    if(process.server){
      next()
    }else{
      next(nuxt =>{
        nuxt.$store.dispatch('auth/watchUserLoaded', ()=>{
          let allowed = false
          if(level === GUARD_LEVEL.AUTH){
            allowed = nuxt.$store.getters['auth/authenticated']
          }
          else if( level === GUARD_LEVEL.MOD){
            allowed = nuxt.$store.getters['auth/moderator']
          }

          if(allowed){
            if(nuxt.$fetch){
              nuxt.$fetch
            }
          }else{
            nuxt.$store.dispatch('auth/loginHandler')
          }
        })
      })
    }
  }
})
