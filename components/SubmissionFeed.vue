<template>
  <div v-scroll="scrollHandler">
    <v-tabs v-model="tab" grow>
      <v-tab>Latest</v-tab>
      <v-tab>Top</v-tab>
    </v-tabs>
<!--    <span>{{query}}</span>-->
    <Submission
      :mission="item"
      v-for="(item,idx) in content" :key="idx"
      class="my-3"
    />
  </div>
</template>

<script>
import Submission from "@/components/Submission";
import {feed} from "../mixins/feed";
import agent from "@/store/httpsAgent";

export default {
  name: "SubmissionFeed",

  components: {Submission},

  //mixins:[feed('', true)],
  mixins:[feed('latest')],

  data:()=>(
    {
      // submissions: [],
      // cursor: 0,
      tab: 0,
      // finished: false,
      // loading: false
    }
  ),

  // props:{
  //   loadSubmissions:{
  //     required: true,
  //     type: Function
  //   }
  // },

  computed:{
    // order(){
    //   return this.tab === 0
    //     ? 'latest':  this.tab === 1
    //       ? 'top'
    //       : 'latest'
    // },

    // query(){
    //   return `?order=${this.order}&cursor=${this.cursor}`
    // }
  },

  async fetch(){
    await this.loadContentsHandler()
    if(this.$route.query.submission){
      const submission = await this.$axios.$get(`/api/submissions/${this.$route.query.submission}`,{httpsAgent: agent()})

      const existed = this.content.map(x => x.id).indexOf(submission.id)
      if(existed > -1){
        this.content.splice(existed, 1)
      }

      this.content.unshift(submission)
    }
  },

  watch:{
    // 'tab': {
    //   handler: function(newValue){
    //     this.order = newValue === 0 ? 'latest'
    //       : newValue === 1 ? 'top'
    //         :'latest'
    //   },
    //   immediate:true
    'tab':  function(newValue){
        this.order = newValue === 0 ? 'latest'
          : newValue === 1 ? 'top'
            :'latest'
    },
  },

  // methods:{
  //   scrollHandler(){
  //     if(this.finished || this.loading)
  //       return
  //
  //     const loadMore = document.body.offsetHeight -(window.pageYOffset + window.innerHeight) < 500
  //     if(loadMore){
  //       this.handleSubmissions()
  //     }
  //   },
  //
  //   handleSubmissions(){
  //     this.loading = true
  //     return this.loadSubmissions(this.query)
  //       .then(submissions => {
  //         console.log(submissions)
  //         if(submissions.length === 0){
  //           this.finished = true
  //         }
  //         else{
  //           submissions.forEach(x => this.submissions.push(x))
  //           this.cursor += 10
  //         }
  //       })
  //     .finally(()=>this.loading = false)
  //   },
  // },

  // created() {
  //   this.handleSubmissions()
  // }
}
</script>

<style scoped>

</style>
