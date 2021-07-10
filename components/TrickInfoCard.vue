<template>
  <v-sheet class="pa-3" >
    <div class="text-h6 text-center">
      <span>{{trick.name}}</span>
    </div>
    <v-alert
      outlined
      color="purple"
    >
      <div>Description: <strong style="color:#fff">{{trick.description}}</strong></div>
      <div>Difficulty:
        <v-chip color="secondary" :to="`/difficulties/${getDifficulty.id}`">
          {{getDifficulty.name}}
        </v-chip>
      </div>
    </v-alert>
    <div v-for="(rd,index) in getRelatedData" :key="index" v-if="rd.data.length > 0">
      {{rd.title}}:
      <v-chip-group>
        <!-- {{rd.title}} -->
        <v-chip v-for="(c,index) in rd.data"
                :key="index"
                x-small
                class="ma-2"
                color="primary"
                :to="rd.routeFactory(c)">
          {{c.name}}
        </v-chip>
      </v-chip-group>
    </div>
    <!-- </v-sheet> -->
    <v-divider class="my-2" />

    <IfAuthenticated>
      <template v-slot:allowed>
        <div>
          <v-btn
            outlined
            small
            @click="editHandler();close()"
          >
            Edit
          </v-btn>

          <v-btn
            outlined
            small
            @click="uploadHandler();close()"
          >
            Upload
          </v-btn>
        </div>

      </template>

      <template v-slot:forbidden="{login}">
        <div class="d-flex justify-center">
          <v-btn small outlined @click="login">
            <v-icon small outlined left>mdi-account-circle</v-icon> Log in to edit/update
          </v-btn>
        </div>
      </template>
    </IfAuthenticated>

    <v-divider class="my-2" />
    <UserHeader :username="trick.user.username"
                :imageUrl="trick.user.image"
                reverse
                class="mb-2"
    >
      <template v-slot:append>
        <span>{{trick.version === 1 ? `Created by` :`Edited by`}}</span>
      </template>
    </UserHeader>
  </v-sheet>
</template>

<script>
import {mapMutations, mapState} from "vuex"
import UserHeader from "./UserHeader"
import TrickSteps from "./content-creation/TrickSteps"
import SubmissionSteps from "./content-creation/SubmissionSteps"
import IfAuthenticated from "./auth/IfAuthenticated";

export default {
  name: "TrickInfoCard",
  components: {IfAuthenticated, TrickSteps, UserHeader},
  props:{
    trick:{
      required: true,
      type: Object
    },

    close:{
      required: false,
      type: Function,
      default: () =>{}
    }
  },

  computed:{
    ...mapState('submissions',['submissions']),
    ...mapState('tricks',['dictionaries']),

    //...mapGetters('tricks',['trickById','difficultyById']),

    // getOneTrick() {
    //     return
    // },

    // getTrickCategories(){
    //   //console.log(this.getOneTrick.categories)
    //   return this.categories.filter(x=>
    //     this.getOneTrick.categories.indexOf(x.name) >= 0
    //   )
    // },

    getRelatedData(){
      //console.log(this.getOneTrick.progressions)
      return [
        {
          title: "Categories",
          data: this.trick.categories.map(x=> this.dictionaries.categories[x]),
          idFactory: c => `category-${c.id}`,
          routeFactory: c => `/category/${c.id}`
        },
        {
          title: "Prerequisites",
          data: this.trick.prerequisites.map(x=> this.dictionaries.tricks[x]),
          idFactory: c => `trick-${c.id}`,
          routeFactory: c => `/tricks/${c.slug}`
        },
        {
          title: "Progressions",
          data: this.trick.progressions.map(x=> this.dictionaries.tricks[x]),
          idFactory: c => `trick-${c.id}`,
          routeFactory :c => `/tricks/${c.slug}`
        },
      ]
    },

    getDifficulty(){
      return this.dictionaries.difficulties[this.trick.difficulty]
    },
  },

  methods:{
    ...mapMutations('videos',['activate']),

    editHandler(){
      this.activate(
        {
          component: TrickSteps,
          edit: true,
          editPayload: this.trick
        }
      )
    },

    uploadHandler(){
      this.activate({
          component: SubmissionSteps,
          setup: (form) => form.trickId = this.trick.slug
        })
    }
  },
}
</script>

<style scoped>

</style>
