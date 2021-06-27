<template>
  <v-app dark>
    <v-app-bar app color="deep-purple accent-4" dense dark>
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
      <nuxt-link
        to="/"
        style="text-decoration: none"
        class="text-h5 text--primary"
      >
        Tricking Library
      </nuxt-link>

      <v-toolbar-title></v-toolbar-title>

      <v-spacer></v-spacer>
      <!-- <v-btn
        depressed
        @click="toggleActive"
      >
        Upload
      </v-btn> -->
      <!-- <Upload/> -->
      <v-btn v-if="moderator" to="/moderation" depressed>Moderation</v-btn>

      <v-skeleton-loader
          :loading = "loading"
          transition="fade-transition"
          type="button"
      >
        <ContentCreationDialog></ContentCreationDialog>  
      </v-skeleton-loader>


      <v-skeleton-loader
          :loading = "loading"
          transition="fade-transition"
          type="button"
      >
        <v-btn depressed outlined v-if='authenticated'>
          <v-icon left>mdi-account-circle</v-icon> Profile
        </v-btn>

        <v-btn depressed outlined v-else @click="$auth.signinRedirect()">
          <v-icon left>mdi-account-circle</v-icon> Sign In
        </v-btn>
      </v-skeleton-loader>
        <v-btn depressed v-if='authenticated' @click="$auth.signoutRedirect()">Logout</v-btn>

    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import {mapState,mapGetters} from 'vuex'
//import Upload from '../components/Upload.vue'
import ContentCreationDialog from "../components/content-creation/ContentCreationDialog.vue";

export default {
  components: {
    //Upload,
    ContentCreationDialog,
  },

  data() {
    return {};
  },

  // beforeMount(){
  //   this.$store.dispatch('clientInit')
  // },

  computed:{
    ...mapState('auth',['loading']),
    ...mapGetters('auth',['authenticated','moderator']),
  },

  // fetch(){
  //   return this.$store.dispatch('clientInit')
  // }

  //methods:mapMutations('videos',['toggleActive'])
};
</script>
