<template>
    <v-stepper v-model="step">
        <span></span>
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
                    <v-text-field label="Name" v-model='form.name'></v-text-field>

                    <v-text-field label="Description" v-model='form.description'></v-text-field>
                    
                    <v-select :items="difficultyItems" v-model="form.difficulty" label="Difficulty"></v-select>
                
                    <v-select :items="trickItems" v-model="form.prerequisites" label="Prerequisites" 
                    multiple small-chips chips deletable-chips></v-select>

                    <v-select :items="trickItems" v-model="form.progressions" label="Progressions" 
                    multiple small-chips chips deletable-chips></v-select>
                    <v-select :items="categoryItems" v-model="form.categories" label="Categories" 
                    multiple small-chips chips deletable-chips></v-select>
                
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
import {mapGetters,mapState,mapActions,mapMutations} from 'vuex';

const initState = () =>({
    step: 1,
    form: {
      name:'',
      description:'',
      difficulty:'',
      prerequisites:[],
      progressions:[],
      categories:[]
    },
    // testdata:['aaa','bbb','ccc']
})

export default {
   name:'TrickSteps',

   data: initState,

   computed:{
       ...mapState('videos',['active']),

       ...mapGetters('tricks',['categoryItems','difficultyItems','trickItems']),
   },

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

    handleSave(){
    
      console.log(JSON.stringify(this.form))   
      this.createTrick(
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