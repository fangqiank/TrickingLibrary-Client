<template>
  <div>
    <h6 class="text-h6 mb-3">Completed Tricks ({{completedTricks.length}} / {{lists.tricks.length}})</h6>
    <v-chip
      v-for="({trick,submission},idx) in completedTricks"
      :key="idx"
      x-small
      class="ma-1"
      @click="toSubmissionHandler(trick.slug, submission.id)"
    >
      {{trick.name}}
    </v-chip>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "ProfileWithCompletedTricks",

  props:{
     profileSubmissions:{
       required: true,
       type: Array
     }
  },

  computed:{
    ...mapState('tricks', ['lists','dictionaries']),

    completedTricks(){
      const submissions = this.submissions
        .filter((v,i,a) => a.map(x => x.trickId).indexOf(v.trickId) === i)

      return submissions.map(submission => ({
        submission: submission,
        trick: this.dictionaries.tricks[submission.trickId]
      }))
    },

    submissions(){
      return [...this.profileSubmissions].sort((x,y)=>y.score - x.score )
    }
  },

  methods:{
    toSubmissionHandler(trickSlug, submissionId){
      this.$router.push(`/tricks/${trickSlug}?submission=${submissionId}`)
    }
  },
}
</script>

<style scoped>

</style>
