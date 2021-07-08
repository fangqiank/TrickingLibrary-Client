<template>
  <div>
    <v-row justify="space-around">
      <v-col lg="3" v-for="(difficulty,idx) in content" :key="idx" class="d-flex justify-center align-start">
        <v-card width="300" @click="()=>$router.push(`/difficulties/${difficulty.id}`)" :ripple="false">
          <v-card-title>{{difficulty.name}}</v-card-title>
          <Submission
            v-if="difficulty.submission"
            :mission="difficulty.submission"
            slim
            :elevation=0
          />
          <v-card-text>{{difficulty.description}}</v-card-text>
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
  name: "DifficultyFeedForFrontPage",

  mixins:[feed('')],

  data:()=>(
    {
      limit: 8
    }
  ),

  computed:{
    ...mapState('tricks', ['lists'])
  },

  fetch() {
    return this.loadContentsHandler()
  },

  methods:{
    loadContentsHandler(){
      const maxRange = this.lists.difficulties.length

      let step = this.cursor + this.limit
      if(step > maxRange){
        step = maxRange
        this.finished = true
      }

      const difficulties = this.lists.difficulties.slice(this.cursor, step)
      this.cursor += this.limit

      const byTricks = (d) => d.tricks.reduce((pre,cur) =>`${pre};${cur}`, '')

      const submissionRequests = difficulties.map(difficulty => {
        if(difficulty.tricks.length > 0){
          return this.$axios
            .$get(`/api/submissions/bestSubmissions?bytricks=${byTricks(difficulty)}`, {httpsAgent: agent()})
            .then(submission => this.content.push(
              {
                ...difficulty,
                submission
              }
            )
          )
        }else{
          this.content.push(difficulty)
        }
      })

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
