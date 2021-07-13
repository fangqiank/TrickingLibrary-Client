<template>
  <ItemLayout>
    <template v-slot:content>
      <SubmissionFeed :contentEndPoint="`/api/users/${$store.state.auth.profile.id}/submissions`"/>
<!--      <Submission :mission="item" v-for="(item,idx) in submissions" :key="idx"/>-->
<!--      <div v-if="submissions" class="mx-3">-->
<!--        <v-card v-for="item in submissions" :key=item.Id class="mb-3">-->
<!--          <VideoPlayer :video="item.video.videoLink" :thumb="item.video.thumbnailLink"/>-->
<!--          <v-card-text>{{item.description}}</v-card-text>-->
<!--        </v-card>-->
<!--      </div>-->
    </template>

    <template v-slot:item>
      <div v-if="profile">
        <div>
          <input
            type="file"
            accept="image/*"
            class="d-none"
            ref="profileImageInput"
            @change="changeProfileImage"
          >
          <v-hover v-slot:default="{hover}">
            <v-avatar>
              <v-btn icon v-if="hover" @click="$refs.profileImageInput.click()">
                <v-icon>mdi-account-edit</v-icon>
              </v-btn>
              <img v-else-if="profile.image"
                   :src="profile.image"
                   alt="profile image"
              />
              <v-icon v-else>mdi-account</v-icon>
            </v-avatar>
          </v-hover>
        </div>
        {{profile.username}}
      </div>
      <v-divider class="my-2"/>
      <ProfileWithCompletedTricks  :profile-submissions="profile.submissions"/>
      <v-divider class="my-2"/>
      <h5 class="text-h5">Chane Requests</h5>
      <v-list>
        <v-list-item
          v-for="(item,idx) in modItems"
          :key="idx"
          :to="`/moderation/${item.id}`"
        >
<!--          {{item}}-->
          <v-list-item-content>
            <v-list-item-title v-if="item.currentObject">{{item.currentObject.name}}</v-list-item-title>
            <v-list-item-title v-else-if="item.targetObject">{{item.targetObject.name}}</v-list-item-title>
            <v-list-item-subtitle>
              <span><strong>Type: </strong>{{item.type}}</span>
              <span v-if="item.currentObject"><strong>Version: </strong>{{item.currentObject.version}}</span>
              <span v-if="item.targetObject"><strong>Version: </strong>{{item.targetObject.version}}</span>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
  </ItemLayout>
</template>

<script>
import ItemLayout from '@/components/ItemLayout'
import {mapMutations, mapState} from "vuex";
import agent from "@/store/httpsAgent";
import Submission from "@/components/Submission";
//import {guard, GUARD_LEVEL} from "@/components/auth/AuthMixings";
import SubmissionFeed from "@/components/SubmissionFeed";
import ProfileWithCompletedTricks from "@/components/ProfileWithCompletedTricks";

export default {
  components:{
    SubmissionFeed,
    Submission,
    ItemLayout,
    ProfileWithCompletedTricks
  },

  computed:{
    ...mapState('auth', ['profile']),
  },

  fetch() {
    return this.$axios.$get(`/api/moderationitems?user=1`,{httpsAgent: agent()})
    .then(modItems => this.modItems = modItems)
  },

  data:() =>(
    {
      uploadingImage: false,
      modItems:[],
    }
  ),

  //mixins: [profile],

  methods:{
    changeProfileImage(e){
      if(this.uploadingImage) return

      this.uploadingImage =true
      const inputFile = e.target
      const formData = new FormData()
      formData.append('image',inputFile.files[0])

      //console.log(inputFile)

      return this.$axios.$put('/api/users/whoami/image', formData)
       .then(profile =>{
         this.saveProfile({profile})
         inputFile.value= ''
         this.uploadingImage = false
       })
    },

    ...mapMutations('auth',['saveProfile']),
  },

  // mounted(){
  //   return this.$store.dispatch('auth/watchUserLoaded',async ()=>{
  //     //console.log('mounted profile: ',profile)
  //     this.submissions = await
  //     //console.log('submission: ', this.submissions)
  //   })
  //
  // }
}
</script>

<style scoped>

</style>
