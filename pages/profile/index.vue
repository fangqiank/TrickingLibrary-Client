<template xmlns="">
  <ItemLayout>
    <template v-slot:content>
      <Submission :mission="item" v-for="(item,idx) in submissions" :key="idx"/>
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
    </template>
  </ItemLayout>
</template>

<script>
import ItemLayout from '@/components/ItemLayout'
import {mapMutations, mapState} from "vuex";
import Submission from "../../components/Submission";

export default {
  components:{
    Submission,
    ItemLayout
  },

  computed:{
    ...mapState('auth', ['profile'])
  },

  data:() =>(
    {
      submissions:[],
      uploadingImage: false
    }
  ),

  methods:{
    changeProfileImage(e){
      if(this.uploadingImage) return

      this.uploadingImage =true
      const inputFile = e.target
      const formData = new FormData()
      formData.append('image',inputFile.files[0])

      console.log(inputFile)

      return this.$axios.$put('/api/users/whoami/image', formData)
       .then(profile =>{
         this.saveProfile({profile})
         inputFile.value= ''
         this.uploadingImage = false
       })
    },

    ...mapMutations('auth',['saveProfile'])
  },

  mounted(){
    return this.$store.dispatch('auth/watchUserLoaded',async ()=>{
      const profile = this.$store.state.auth.profile
      console.log('mounted profile: ',profile)
      this.submissions = await this.$axios.$get(`/api/users/${profile.id}/submissions`)
      //console.log('submission: ', this.submissions)
    })

  }
}
</script>

<style scoped>

</style>
