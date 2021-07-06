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
      </div>
    </template>
  </ItemLayout>
</template>

<script>
import ItemLayout from '@/components/ItemLayout'
import Submission from "@/components/Submission";
import SubmissionFeed from "@/components/SubmissionFeed";
import agent from "@/store/httpsAgent";
import UserHeader from "../../components/UserHeader";

export default {
  components:{
    UserHeader,
    SubmissionFeed,
    Submission,
    ItemLayout
  },

  data:() =>(
    {
      profile:null
    }
  ),

  async fetch() {
    console.log(this.$route.params)
    const {username} = this.$route.params
    this.profile = await this.$axios.$get(`/api/users/${username}`,{httpsAgent: agent() })
  }
}
</script>

<style scoped>

</style>
