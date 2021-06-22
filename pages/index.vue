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
    <div v-for="item in sections" :key="item.Id">
      <div class="d-flex flex-column align-center">
        <p class="text-h5">{{ item.title }}</p>
        <div>
          <v-btn
            v-for="(collectionItem, index) in item.collection"
            :key="index"
            :to="item.routeFactory(collectionItem.id)"
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
import { mapState } from "vuex";

export default {
  components: {},

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
