<template>
  <div>
    <v-row justify="space-around">
      <v-col lg="3" v-for="(category,idx) in content" :key="idx" class="d-flex justify-center align-start">
        <v-card width="300" @click="()=>$router.push(`/categories/${category.slug}`)" :ripple="false">
          <v-card-title>{{category.name}}</v-card-title>
<!--          <span>{{category}}</span>span>-->
          <Submission
            v-if="category.submission"
            :mission="category.submission"
            slim
            :elevation=0
          />
          <v-card-text>{{category.description}}</v-card-text>
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
  name: "CategoryFeedForFrontPage",

  mixins:[feed('')],

  data:()=>(
    {
      limit: 8
    }
  ),

  computed:{
    ...mapState('tricks', ['lists','dictionaries'])
  },

  fetch() {
    return this.loadContentsHandler()
  },

  methods:{
    loadContentsHandler(){
      const maxRange = this.lists.categories.length

      let step = this.cursor + this.limit
      if(step > maxRange){
        step = maxRange
        this.finished = true
      }

      const categories = this.lists.categories.slice(this.cursor, step)
      this.cursor += this.limit

      //const byTricks = (c) => c.tricks.reduce((pre,cur) =>`${pre};${cur}`, '')

      const submissionRequests = categories.map(category => {
        if(category.tricks.length > 0){
          const byTricks = category.tricks.map(x => this.dictionaries.tricks[x].slug)
            .reduce((pre,cur) =>`${pre};${cur}`, '')

          return this.$axios
            .$get(`/api/submissions/bestSubmissions?bytricks=${byTricks}`, {httpsAgent: agent()})
            .then(submission => this.content.push(
              {
                ...category,
                submission
              }
            )
          )
        }else{
          this.content.push(category)
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
