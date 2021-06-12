<template>
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
                Select Trick
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
                :complete="step > 3"
                step="3"
            >
                Submission
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step = "4">
                Review
            </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
            <v-stepper-content step="1">
                <div>
                <v-file-input accept='vodeo/*' @change='handleFile'></v-file-input>
                </div>
            </v-stepper-content>
            
            <v-stepper-content step="2">
                <div>
                    <v-select :items="trickItems" 
                              label="Slect Trick"
                              v-model="form.trickId"
                    ></v-select>
                    <v-btn @click="step++">Next</v-btn>
                </div>
            </v-stepper-content>

            <v-stepper-content step="3">
                <div>
                    <v-text-field label="Description" v-model='form.description'/>
                    <v-btn @click="step++">Next</v-btn>
                </div>
            </v-stepper-content>

            <v-stepper-content step="4">
                <div>
                <v-btn @click='handleSave'>Save</v-btn>
                </div>
            </v-stepper-content>
        </v-stepper-items>
    </v-stepper>
</template>

<script>
import {mapGetters,mapState,mapActions,mapMutations} from 'vuex';

const initState = () =>({
    step:1,
    form:{
        trickId:'',
        video:'',
        description:'',
    }
})

export default {
   name:'SubmissionSteps',
   
   data: initState,

   computed: {
       ...mapGetters('tricks',['trickItems']),
       
       ...mapState('videos',['active']),
   },

   methods:{
    ...mapMutations('videos',['hide']),

    ...mapActions('videos',['startVideoUpload','createSubmission']),

    async handleFile(file){
      if(!file)
        return
      
      const form = new FormData()
      form.append('video',file)
      this.startVideoUpload({form})
      this.step++
    },

    handleSave(){
      this.createSubmission({form:this.form})
    
      this.hide()

      Object.assign(this.$data,initState())
    },
  }
}
</script>

<style>

</style>