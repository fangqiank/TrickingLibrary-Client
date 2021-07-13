<template>
  <v-sheet class="pa-3">
    <div class="text-h6 text-center">
      <nuxt-link
        v-if="link"
        :to="`/tricks/${trick.slug}`"
        class="white--text text-decoration-none"
      >
        {{trick.name}}
      </nuxt-link>
      <span v-else>{{trick.name}}</span>
    </div>
    <v-alert
      outlined
      color="purple"
    >
      <div>Description: <strong style="color:#fff">{{trick.description}}</strong></div>
      <div>Difficulty:
        <v-chip color="secondary" :to="`/difficulties/${getDifficulty.slug}`">
          {{getDifficulty.name}}
        </v-chip>
      </div>
    </v-alert>
    <div v-for="(rd,index) in getRelatedData" :key="index" v-if="rd.data.length > 0 && rd.data != null">
<!--      <span>{{rd.data}}</span>-->
      <div class="text-subtitle-1">{{ rd.title }}</div>
      <v-chip-group>
        <v-chip
          v-for="(d,idx) in rd.data"
          :key="idx"
          color="success"
          small
          :to="rd.routeFactory(d)"
        >
          {{ d.name }}
        </v-chip>
      </v-chip-group>
    </div>
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

    link:{
      required: false,
      type: Boolean,
      default: false
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
      for (const [key, value] of Object.entries(this.dictionaries.categories)) {
        console.log('dict category',value);
      }
      this.trick.categories.map(x=>console.log('trick.categories',x))
      return [
        {
          title: "Categories",
          data: this.trick.categories.map(x=> this.dictionaries.categories[x]),
          idFactory: c => `category-${c.id}`,
          routeFactory: c => `/categories/${c.slug}`
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
    ...mapMutations('contentUpdate',['activate']),

    editHandler(){
      this.activate(
        {
          component: TrickSteps,
          //edit: true,
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
