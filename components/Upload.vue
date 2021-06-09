<template>
  <v-dialog :value="active" width="800px" persistent>
    <template v-slot:activator='{on}'>
      <v-btn depressed @click="toggleActive">
        Upload
      </v-btn>
    </template>
       <v-stepper v-model="step">
          <v-stepper-header>
            <v-stepper-step
              :complete="step > 1"
              step="1"
            >
              Select Type
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
              :complete="step > 2"
              step="2"
            >
              Trick Information
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step 
              :complete="step > 3"
              step="3"
            >
              Upload Video
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step 
              :complete="step > 4"
              step="4"
            >
              Submission Information
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step = "5">
              Review
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <div class='d-flex flex-column align-center'>
                <v-btn class='my-2' @click='setUploadType({type:uploadType.TRICK})'>Trick</v-btn>
                <v-btn class='my-2'  @click='setUploadType({type:uploadType.SUBMISSION})'>Submission</v-btn>
              </div>
            </v-stepper-content>

            <v-stepper-content step="2">
              <div>
                <v-text-field label="Tricking Name" v-model='trickName'></v-text-field>
                <v-btn @click="incStep">Next</v-btn>
              </div>
            </v-stepper-content>

            <v-stepper-content step="3">
              <div>
                <v-file-input accept='vodeo/*' @change='handleFile'></v-file-input>
              </div>
            </v-stepper-content>

            <v-stepper-content step="4">
              <div>
                <!-- <v-text-field label="Description" v-model='id'></v-text-field> -->
                <v-text-field label="Description" v-model='submission'></v-text-field>
                <v-btn @click="incStep">Next</v-btn>
              </div>
            </v-stepper-content>

            <v-stepper-content step="5">
              <div>
                <v-btn @click='handleSave'>Save</v-btn>
              </div>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
        <div class="d-flex justify-center my-5">
          <v-btn @click='toggleActive'>
            Close
          </v-btn>
        </div>
    </v-dialog>
</template>

<script>
import {UPLOAD_TYPE} from '../data/enum.js'
import {mapState,mapActions,mapMutations} from 'vuex';
export default {
   name:'Upload',
   data() {
      return {
        trickName:'',
        submission:'',
        id:1,
      }
   },

   computed:{
    ...mapState('videos',['uploadPromise','active','step','type']),
    uploadType(){
      return UPLOAD_TYPE
    }
   },

   methods:{
    ...mapMutations('videos',['reset','toggleActive','setUploadType','incStep']),

    ...mapActions('videos',['startVideoUpload','createTrick']),

    async handleFile(file){
      if(!file)
        return
      
      const form = new FormData()
      form.append('video',file)
      this.startVideoUpload({form})
      //this.step++
    },

    async handleSave(){
      if(!this.uploadPromise){
        console.log('uploadPromise is null')
        return;
      }
      const video = await this.uploadPromise
      await this.createTrick(
        {
          trick:{name:this.trickName},
          submission:{description: this.submission, video, trickId:1}
        }
      )
      this.trickName = ''
      this.submission = ''
      this.reset()
    },
  }
}
</script>

<style>

</style>