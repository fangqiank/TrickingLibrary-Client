<template>
  <div>
      <div v-if="tricks">
        <div v-for="item in tricks" :key=item.Id>
          {{item.name}}
          <div>
            <video controls
                   :src='`https://localhost:5001/api/videos/${item.video}`'
                   width="300"
                   height="200"
            ></video>
          </div>
        </div>
      </div>  

      <!-- <div>
        <v-text-field label='Trick Name' v-model='trickName'></v-text-field>
        <v-btn @click="saveTrick">Save</v-btn>
      </div> -->

      <!-- {{message}}
      <v-btn @click="reset">Reset Message</v-btn> -->
      <v-stepper v-model="step">
          <v-stepper-header>
            <v-stepper-step
              :complete="step > 1"
              step="1"
            >
              Upload Video
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
              :complete="step > 2"
              step="2"
            >
              Trick Information
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="3">
              Confirmation
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <!-- <v-card
                class="mb-12"
                color="grey lighten-1"
                height="200px"
              ></v-card> -->
              <div>
                <v-file-input accept='vodeo/*' @change='handleFile'></v-file-input>
              </div>
              <!-- <v-btn
                color="primary"
                @click="step = 2"
              >
                Continue
              </v-btn> -->

              <!-- <v-btn text>
                Cancel
              </v-btn> -->
            </v-stepper-content>

            <v-stepper-content step="2">
              <!-- <v-card
                class="mb-12"
                color="grey lighten-1"
                height="200px"
              ></v-card> -->
              <div>
                <v-text-field label="Tricking Name" v-model='trickName'></v-text-field>
                <v-btn @click="saveTrick">Save</v-btn>
              </div>
              <!-- <v-btn
                color="primary"
                @click="step = 3"
              >
                Continue
              </v-btn> -->

              <!-- <v-btn text>
                Cancel
              </v-btn> -->
            </v-stepper-content>

            <v-stepper-content step="3">
              <!-- <v-card
                class="mb-12"
                color="grey lighten-1"
                height="200px"
              >
              </v-card>-->
              <div>Success</div>
            
              <!-- <v-btn
                color="primary"
                @click="step = 1"
              >
                Continue
              </v-btn> -->

              <!-- <v-btn text>
                Cancel
              </v-btn> -->
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      <!-- <v-btn @click="resetTricks">Reset Tricks</v-btn> -->
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

import {mapState,mapActions,mapMutations} from 'vuex';

export default {
  components: {
    Logo,
    VuetifyLogo
  },

  data() {
      return {
        trickName:'',
        step:1,
      }
    },

  computed:{
    // ...mapState({
    //   message: state => state.message
    // }),

    ...mapState('tricks',['tricks']),
    ...mapState('videos',['uploadPromise']),
  },

  methods:{
    ...mapMutations('videos',{
      resetVideos: 'reset'
    }),

    ...mapMutations('tricks',{
      resetTricks:'reset'
    }),

    ...mapActions('tricks',['createTrick']),

    ...mapActions('videos',['startVideoUpload']),

    async handleFile(file){
      if(!file)
        return
      
      const form = new FormData()
      form.append('video',file)
      this.startVideoUpload({form})
      this.step++
    },

    async saveTrick(){
      if(!this.uploadPromise){
        console.log('uploadPromise is null')
        return;
      }
      const video = await this.uploadPromise
      await this.createTrick({trick:{name:this.trickName,video}})
      this.trickName = ''
      this.step++
      this.resetVideos()
    },

    
  }
}
</script>
