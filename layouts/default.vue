<template>
  <v-app dark>
    <v-app-bar
      app
      color="deep-purple accent-4"
      dense
      dark
    >
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

      <v-toolbar-title>Tricking Library</v-toolbar-title>

      <v-spacer></v-spacer>
      <!-- <v-btn
        depressed
        @click="toggleActive"
      >
        Upload
      </v-btn> -->
      <Upload/>
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
import {mapMutations} from 'vuex'
import Upload from '../components/Upload.vue'

export default {
  components:{
    Upload
  },

  data () {
    return {

    }
  },

  //methods:mapMutations('videos',['toggleActive'])
}
</script>
