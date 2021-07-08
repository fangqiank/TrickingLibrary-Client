<template>
  <div>
    <v-row justify="space-around">
      <v-col lg="3" v-for="(trick,idx) in content" :key="idx" class="d-flex justify-center align-start">
        <v-card width="300" @click="()=>$router.push(`/trick/${trick.slug}`)" :ripple="false">
          <v-card-title>{{trick.name}}</v-card-title>
          <Submission
            v-if="trick.submission"
            :mission="trick.submission"
            slim
            :elevation=0
          />
          <v-card-text>{{trick.description}}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <div v-if="!finished" class="d-flex justify-center my-3">
      <v-btn @click="loadContentsHandler">Load More</v-btn>
    </div>
  </div>
</template>

<script>
import {feed} from "@/mixins/feed";
import {mapState} from "vuex";
import agent from "@/store/httpsAgent";

export default {
  name: "TrickFeedForFrontPage",

  data:()=>(
    {
      limit: 8
    }
  ),

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
        this.finished = true
      }

      const tricks = this.lists.tricks.slice(this.cursor, step)
      this.cursor += this.limit

      const submissionRequests = tricks.map(trick => this.$axios
        .$get(`/api/submissions/bestSubmissions?bytricks=${trick.slug}`, {httpsAgent: agent()})
        .then(submission => this.content.push(
          {
            ...trick,
            submission
          }
        )))

      return Promise.all(submissionRequests)
    }
  }
}
</script>

<style scoped>
.v-card--link:focus:before{
  opacity: 0;
}
</style>
