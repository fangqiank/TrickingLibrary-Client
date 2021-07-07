<template>
  <div>
    <v-row>
      <v-col v-for="(trick,idx) in content" :key="idx" class="d-flex justify-center align-start">
        <v-card width="300" @click="()=>$router.push(`/trick/${trick.slug}`)" :ripple="false">
          <v-card-title>{{trick.name}}</v-card-title>
          <Submission  :mission="trick.submission" :slim="true"/>
          <v-card-text>{{trick.description}}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {feed} from "@/mixins/feed";
import {mapState} from "vuex";
import agent from "@/store/httpsAgent";

export default {
  name: "TrickFeedForFrontPage",

  mixins:[feed('')],

  computed:{
    ...mapState('tricks', ['lists'])
  },

  fetch() {
    return this.loadContentsHandler()
  },

  methods:{
    loadContentsHandler(){
      const maxRange = this.lists.tricks.length

      let step = this.cursor + this.limit
      if(step > maxRange){
        step = maxRange
      }

      const tricks = this.lists.tricks.slice(this.cursor, step)
      this.cursor += this.limit

      //console.log('trickfeedfrontpage',tricks)

      return Promise.all(tricks.map(trick => this.$axios
        .$get(`/api/tricks/${trick.slug}/bestSubmissions`, {httpsAgent: agent()})
      .then(submission => this.content.push(
        {
          ...trick,
          submission
        }
      ))))
    }
  }
}
</script>

<style scoped>
.v-card--link:focus:before{
  opacity: 0;
}
</style>
