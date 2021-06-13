<template>
  <v-dialog :value="active" width="800px" persistent>
    <template v-slot:activator='{on}'>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
            <v-btn
            depressed
            v-bind="attrs"
            v-on="on"
            >
            Create
            </v-btn>
        </template>
        <v-list>
            <v-list-item
            v-for="(item, i) in menuItems"
            :key="`ccd-menu-${i}`"
            @click="activate({component:item.component})"
            >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
        </v-list>
        </v-menu>
      </template>

      <div v-if="component">
        <component :is="component"></component>
      </div>

      <div class="d-flex justify-center my-5">
        <v-btn @click='reset'>
          Close
        </v-btn>
      </div>
  </v-dialog>
</template>

<script>
//import {UPLOAD_TYPE} from '../../data/enum'
import {mapState,mapMutations} from 'vuex';
import TrickSteps from './TrickSteps.vue'
import SubmissionSteps  from './SubmissionSteps.vue'
import CategoryForm from './CategoryForm.vue';
import DifficultyForm from './DifficultyForm.vue';

export default {
   name:'ContentCreationDialog',
   components:{TrickSteps,SubmissionSteps,CategoryForm,DifficultyForm},
   data() {
      return {
       
      }
   },

   computed:{
    ...mapState('videos',['active','component']),
    menuItems(){
        return  [
            {component: TrickSteps, title:'Trick'},
            {component: SubmissionSteps, title:'Submission'},
            {component: CategoryForm, title:'Category'},
            {component: DifficultyForm, title:'Difficulty'},
        ]
    }
   },
   
   methods: mapMutations('videos',['reset','activate'])
}
</script>

<style>

</style>