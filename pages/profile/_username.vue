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
import profile from "@/mixins/profile";

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

  mixins:[profile],

  async fetch() {
    console.log(this.$route.params)
    const {username} = this.$route.params
    this.profile = await this.$axios.$get(`/api/users/${username}`,{httpsAgent: agent() })
  }
}
</script>

<style scoped>

</style>
