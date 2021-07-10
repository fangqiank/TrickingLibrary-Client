<template xmlns="">
  <ItemLayout  v-if="profile">
    <template v-slot:content>
      <SubmissionFeed :contentEndPoint="`/api/users/${profile.id}/submissions`" />
    </template>

    <template v-slot:item>
      <div>
        <UserHeader
          :username="profile.username"
          :image-url="profile.image"
          :link="false"
        />

        <v-divider class="my-2"/>
        <ProfileWithCompletedTricks  :profile-submissions="profile.submissions"/>
      </div>
    </template>
  </ItemLayout>
</template>

<script>
import ItemLayout from '@/components/ItemLayout'
import Submission from "@/components/Submission"
import SubmissionFeed from "@/components/SubmissionFeed"
import ProfileWithCompletedTricks from "@/components/ProfileWithCompletedTricks"
import agent from "@/store/httpsAgent"
import UserHeader from "../../components/UserHeader"

export default {
  components:{
    UserHeader,
    SubmissionFeed,
    Submission,
    ItemLayout,
    ProfileWithCompletedTricks
  },

  data:() =>(
    {
      profile:null
    }
  ),

  //mixins:[profile],

  async fetch() {
    console.log(this.$route.params)
    const {username} = this.$route.params
    this.profile = await this.$axios.$get(`/api/users/${username}`,{httpsAgent: agent() })
  }
}
</script>

<style scoped>

</style>
