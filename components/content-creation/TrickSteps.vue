<template>
    <v-stepper v-model="step">
        <v-stepper-header>
            <v-stepper-step
                :complete="step > 1"
                step="1"
            >
                Trick Information
            </v-stepper-step>

            <v-divider></v-divider>
            <v-stepper-step step = "2">
                Review
            </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
            <v-stepper-content step="1">
                <div>
                <v-text-field label="Tricking Name" v-model='form.trickName'></v-text-field>
                <v-btn @click="step++">Next</v-btn>
                </div>
            </v-stepper-content>

            <v-stepper-content step="2">
                <div>
                <v-btn @click='handleSave'>Save</v-btn>
                </div>
            </v-stepper-content>
        </v-stepper-items>
    </v-stepper>
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex';

const initState = () =>({
    step: 1,
    form: {
      trickName:''
    }
})

export default {
   name:'TrickSteps',

   data: initState,

   computed:mapState('videos',['active']),

   watch:{
       'active':function(newValue){
           if(!newValue){
               Object.assign(this.$data, initSate())
           }
       }
   },
   
   methods:{
    ...mapMutations('videos',['reset']),

    ...mapActions('tricks',['createTrick']),

    async handleSave(){
      await this.createTrick(
        {
          form: this.form
        }
      )

      this.reset()

      Object.assign(this.$data,initState())
    },
  }
}
</script>

<style>

</style>