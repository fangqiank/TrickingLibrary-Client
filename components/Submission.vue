<template>
  <v-card class="my-3">
    <UserHeader :username="mission.user.username" :image-url="mission.user.image">
      <template v-slot:append>
        <span class="caption text--gray">{{mission.created}}</span>
      </template>
    </UserHeader>
    <VideoPlayer :video="mission.video" :thumb="mission.thumb"/>
    <v-card-actions>
      <v-btn
        x-small
        :color = "mission.vote === 1 ? 'blue':''"
        icon
        @click="voteHandler(1)">
        <v-icon>mdi-thumb-up</v-icon>
      </v-btn>
      <span class="mx-3">{{mission.score}}</span>
      <v-btn
        x-small
        :color = "mission.vote === -1 ? 'blue':''"
        icon
        @click="voteHandler(-1)">
        <v-icon>mdi-thumb-down</v-icon>
      </v-btn>
      <v-spacer/>
      <v-btn icon @click="showComments = !showComments">
        <v-icon>mdi-comment</v-icon>
      </v-btn>
    </v-card-actions>
    <IfAuthenticated  v-if="showComments">
      <template v-slot:allowed>
        <CommentSection
          :parent-id="mission.id"
          :parent-type="submissionParentType"
        />
      </template>
      <template v-slot:forbidden="{login}">
        <div class="d-flex justify-center mb-2">
          <v-btn outlined @click="login">sign in to comment</v-btn>
        </div>
      </template>
    </IfAuthenticated>

  </v-card>
</template>

<script>
import UserHeader from "./UserHeader";
import VideoPlayer from "./content-creation/VideoPlayer";
import {COMMENTS_PARENT_TYPE} from "./comments/_share";
import CommentSection from "./comments/CommentSection";
import IfAuthenticated from "./auth/IfAuthenticated";
export default {
  name: "Submission",

  data:() =>(
    {
      showComments: false
    }
  ),

  components: {IfAuthenticated, CommentSection, VideoPlayer, UserHeader},

  props:{
    mission:{
      required: true,
      type: Object
    },
  },

  computed:{
    submissionParentType(){
      return COMMENTS_PARENT_TYPE.SUBMISSION
    }
  },

  methods:{
    voteHandler(val){
      if(this.mission.vote === val)
        return
      this.mission.score += this.mission.value === 0 ? val : val*2
      this.mission.vote = val
      return this.$axios.$put(`/api/submissions/${this.mission.id}/vote?value=${val}`,null)
    }
  }
}
</script>

<style scoped>

</style>
