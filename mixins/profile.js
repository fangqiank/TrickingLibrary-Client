import {mapState} from "vuex";

export default {
  computed:{
    ...mapState('tricks', ['lists','dictionaries']),

    completedTricks(){
      const submissions = this.profile.submissions
        //.map(x => x.trickId)
        .filter((v,i,a) => a.map(x => x.trickId).indexOf(v.trickId) === i)

      return submissions.map(submission => ({
        submission: submission,
        trick: this.dictionaries.tricks[submission.trickId]
      }))
    }
  },

  methods:{
    toSubmissionHandler(trickSlug, submissionId){
      this.$router.push(`/tricks/${trickSlug}?submission=${submissionId}`)
    }
  },
}
