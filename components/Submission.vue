<template>
  <v-card>
    <UserHeader
      :username="mission.user.username"
      :image-url="mission.user.image"
      class="pa-2"
    >
      <template v-slot:append>
        <div v-if="slim">
          <v-icon small>mdi-thumb-up</v-icon>
          <span class="mx-3">{{mission.score}}</span>
          <v-icon small>mdi-thumb-down</v-icon>
        </div>
        <span v-else class="caption text--gray">{{mission.created}}</span>
      </template>
    </UserHeader>
    <v-card-text v-if="!slim">{{mission.description}}</v-card-text>
    <VideoPlayer :video="mission.video" :thumb="mission.thumb"/>
    <IfAuthenticated v-if="!slim">
      <template v-slot:allowed>
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
        <CommentSection
          v-if="showComments"
          :parent-id="mission.id"
          :parent-type="submissionParentType"
          class="px-3"
        />
      </template>
      <template v-slot:forbidden="{login}">
        <v-card-actions>
          <v-btn
            x-small
            :color = "mission.vote === 1 ? 'blue':''"
            icon
            disabled
            @click="voteHandler(1)">
            <v-icon>mdi-thumb-up</v-icon>
          </v-btn>
          <span class="mx-3">{{mission.score}}</span>
          <v-btn
            x-small
            disabled
            icon
            @click="voteHandler(-1)">
            <v-icon>mdi-thumb-down</v-icon>
          </v-btn>
          <v-spacer/>
          <v-btn icon @click="showComments = !showComments">
            <v-icon>mdi-comment</v-icon>
          </v-btn>
          <v-btn outlined @click="login" small>comment</v-btn>
        </v-card-actions>
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
      required: false,
      type: Object
    },

    slim:{
      required: false,
      type: Boolean,
      default: false
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
