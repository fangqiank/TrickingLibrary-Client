<template>
  <v-card class="mb-3">
    <UserHeader :username="mission.user.username" :image-url="mission.user.image"/>
    <VideoPlayer :video="mission.video" :thumb="mission.thumb"/>
    <v-card-text class="d-flex justify-center">
      <span>{{mission.upVotes}}</span>
      <v-spacer/>
      <span>{{mission.created}}</span>
    </v-card-text>
  </v-card>
</template>

<script>
import UserHeader from "./UserHeader";
import VideoPlayer from "./content-creation/VideoPlayer";
export default {
  name: "Submission",
  components: {VideoPlayer, UserHeader},
  props:{
    mission:{
      required: true,
      type: Object
    },

  }
}
</script>

<style scoped>

</style>
