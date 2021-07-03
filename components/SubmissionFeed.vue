<template>
  <div v-scroll="scrollHandler">
    <v-tabs v-model="tab" grow>
      <v-tab>Latest</v-tab>
      <v-tab>Top</v-tab>
    </v-tabs>
    <Submission :mission="item" v-for="(item,idx) in submissions" :key="idx"/>
  </div>
</template>

<script>
import Submission from "@/components/Submission";
export default {
  name: "SubmissionFeed",

  components: {Submission},

  data:()=>(
    {
      submissions: [],
      limit: 0,
      tab: 0,
      finished: false,
      loading: false
    }
  ),

  props:{
    loadSubmissions:{
      required: true,
      type: Function
    }
  },

  computed:{
    order(){
      return this.tab === 0
        ? 'latest':  this.tab === 1
          ? 'top'
          : 'latest'
    },

    query(){
      return `?order=${this.order}&limit=${this.limit}`
    }
  },

  watch:{
    'tabSwitch': function (){
      this.submissions= []
      this.limit= 0
      this.finished= false
      this.handleSubmissions()
    }
  },

  methods:{
    scrollHandler(){
      if(this.finished || this.loading)
        return

      const loadMore = document.body.offsetHeight -(window.pageYOffset + window.innerHeight) < 500
      if(loadMore){
        this.handleSubmissions()
      }
    },

    handleSubmissions(){
      this.loading = true
      return this.loadSubmissions(this.query)
        .then(submissions => {
          console.log(submissions)
          if(submissions.length === 0){
            this.finished = true
          }
          else{
            submissions.forEach(x => this.submissions.push(x))
            this.limit += 10
          }
        })
      .finally(()=>this.loading = false)
    },
  },

  created() {
    this.handleSubmissions()
  }
}
</script>

<style scoped>

</style>
