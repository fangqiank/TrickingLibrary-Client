<template>
  <v-dialog :value="active" width="800px" persistent>
    <template v-slot:activator='{on}'>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
            <v-btn
              depressed
              v-bind="attrs"
              v-on="on"
              class="d-none d-md-flex"
            >
            Create
            </v-btn>

          <v-btn
            v-bind="attrs"
            v-on="on"
            icon
            class="d-flex d-md-none"
          >
            <v-icon>mdi-plus-box</v-icon>
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

      <!-- <div class="d-flex justify-center my-5">
        <v-btn @click='cancelUpload'>
          Close
        </v-btn>
      </div> -->
  </v-dialog>
</template>

<script>
//import {UPLOAD_TYPE} from '../../data/enum'
import {mapState,mapMutations,mapGetters} from 'vuex';
import TrickSteps from './TrickSteps.vue'
import SubmissionSteps  from './SubmissionSteps.vue'
import CategoryForm from './CategoryForm.vue';
import DifficultyForm from './DifficultyForm.vue';

export default {
   name:'ContentCreationDialog',

   components:{TrickSteps,SubmissionSteps,CategoryForm,DifficultyForm},

   computed:{
    ...mapState('contentUpdate',['active','component']),
    ...mapGetters('auth',['moderator']),
    menuItems(){
        return  [
            {component: TrickSteps, title: 'Trick', display: true},
            {component: SubmissionSteps, title: 'Submission', display: true},
            {component: CategoryForm, title: 'Category', display: this.moderator},
            {component: DifficultyForm, title: 'Difficulty', display: this.moderator},
        ].filter(x => x.display)
    }
   },

   methods: {
     ...mapMutations('contentUpdate',['activate']),
   }
}
</script>

<style>

</style>
