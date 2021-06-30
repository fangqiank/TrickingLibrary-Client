<template>
  <div>
    <!-- publicRuntimeConfig:{
       api:process.env.API_URI
    },
    nuxtConfig.js
    -->
    <!-- <div>
      {{ $config.api }}  display the above
    </div> -->
    <div>
      <!-- <v-btn @click="handleLogin">Login</v-btn>
      <v-btn @click="handleLogout">Logout</v-btn> -->
      <v-btn @click="callApi('test')">Access Api</v-btn>
      <v-btn @click="callApi('admin')">Admin Auth</v-btn>
    </div>
    <div v-for="item in sections" :key="item.Id">
      <div class="d-flex flex-column align-center">
        <p class="text-h5">{{ item.title }}</p>
        <div>
          <v-btn
            v-for="(collectionItem, index) in item.collection"
            :key="index"
            :to="item.routeFactory(collectionItem.slug)"
            class="mx-1"
          >
            {{ collectionItem.name }}
          </v-btn>
        </div>
      </div>
      <v-divider class="my-3"></v-divider>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
//import {UserManager,WebStorageStateStore} from 'oidc-client'

export default {
  //components: {},

  data:()=>(
    {
    }
  ),

  //created(){
    // if(!process.server){
      //this.userManager

      //console.log(this.$route)

      // const {
      //   code,
      //   scope,
      //   session_state,
      //   state,
      // } = this.$route.query

      // if(code && scope && session_state && state){
      //    this.userManager.signinRedirectCallback()
      //     .then(user =>{
      //       this.$axios.setToken(`Bearer ${user.access_token}`)
      //       this.$router.push('/')
      //     })
      // }
    //}
  //},

  methods:{
    // handleLogin(){
    //   return this.userManager.signinRedirect()
    //   return
    // },

    // handleLogout(){
    //   return this.$auth.signoutRedirect()
    // },

    callApi(x){
      return this.$axios.$get(`/api/tricks/${x}`)
      .then(inf =>{
        console.log(inf)
      })
    }
  },

  computed: {
    ...mapState("tricks", ["tricks", "categories", "difficulties"]),

    // api() {
    //   return process.env.API_URI;
    // },

    sections() {
      return [
        {
          collection: this.tricks,
          title: "Tricks",
          routeFactory: (id) => `/trick/${id}`,
        },
        {
          collection: this.categories,
          title: "Categories",
          routeFactory: (id) => `/category/${id}`,
        },
        {
          collection: this.difficulties,
          title: "Difficulties",
          routeFactory: (id) => `/difficulty/${id}`,
        },
      ];
    },
  },
  //...mapState('submissions',['submissions']),

  // async fetch(){
  //    await this.$store.dispatch('tricks/fetchTricks',null,{root:true})
  // }
};
</script>
