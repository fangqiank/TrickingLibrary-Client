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
      <v-btn to="/moderation" depressed>Moderation</v-btn>

      <ContentCreationDialog></ContentCreationDialog>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
//import {mapMutations} from 'vuex'
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

  //methods:mapMutations('videos',['toggleActive'])
};
</script>
