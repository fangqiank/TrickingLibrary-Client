<template>
  <v-card class="my-3">
    <UserHeader :username="mission.user.username" :image-url="mission.user.image"/>
    <VideoPlayer :video="mission.video" :thumb="mission.thumb"/>
    <v-card-actions>
      <span>{{mission.upVotes}}</span>
      <v-btn icon>
        <v-icon>mdi-thumb-up</v-icon>
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
}
</script>

<style scoped>

</style>
