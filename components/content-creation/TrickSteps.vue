<template>
  <v-card>
    <v-card-title>
      Create Trick
      <v-spacer />
      <v-btn icon @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <v-stepper v-model="step" class="rounded-0">
      <v-stepper-header class="elevation-0">
        <v-stepper-step :complete="step > 1" step="1">
          Trick Information
        </v-stepper-step>

        <v-divider></v-divider>
        <v-stepper-step step="2"> Review </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items class="fpt-0">
        <v-stepper-content step="1">
          <v-form ref="form" v-model="validation.valid">
            <v-text-field
              :rules= "validation.name"
              label= "Name"
              :disabled="!!editPayload"
              v-model= "form.name"
            />

            <v-text-field
              :rules= "validation.description"
              label= "Description"
              v-model= "form.description"
            />

            <v-select
              :items="lists.difficulties.map(x => ({value:x.id,text:x.name}))"
              :rules= "validation.difficulty"
              v-model="form.difficulty"
              label="Difficulty"
            />

            <v-autocomplete
              :items="lists.tricks
                           .filter(x => !form.id || x.id !== form.id)
                           .map(x => ({value:x.id,text:x.name}))"
              v-model="form.prerequisites"
              label="Prerequisites"
              multiple
              small-chips
              chips
              deletable-chips
            />

            <v-autocomplete
              :items="lists.tricks
                           .filter(x => !form.id || x.id !== form.id)
                           .map(x => ({value:x.id,text:x.name}))"
              v-model="form.progressions"
              label="Progressions"
              multiple
              small-chips
              chips
              deletable-chips
            />
            <v-select
              :items="lists.categories.map(x => ({value:x.id,text:x.name}))"
              :rules= "validation.categories"
              v-model="form.categories"
              label="Categories"
              multiple
              small-chips
              chips
              deletable-chips
            />

            <div class="d-flex justify-center">
              <v-btn
                @click="$refs.form.validate() ? step++ : 0"
                :disabled="!validation.valid"
              >
                Next
              </v-btn>
            </div>
          </v-form>
        </v-stepper-content>

        <v-stepper-content step="2">
          <div><strong>Name: </strong> {{form.name}}</div>
          <div><strong>Description: </strong> {{form.description}}</div>
          <div v-if="form.difficulty"><strong>Difficulty: </strong> {{dictionaries.difficulties[form.difficulty].name}}</div>
          <div><strong>Prerequisites: </strong> {{form.prerequisites.map(x =>
            dictionaries.tricks[x].name).join(', ')}}</div>
          <div><strong>Progressions: </strong> {{form.progressions.map(x =>
            dictionaries.tricks[x].name).join(', ')}}</div>
          <div><strong>Categories: </strong> {{form.categories.map(x =>
            dictionaries.categories[x].name).join(', ')}}</div>
          <v-text-field
            v-if="requireReason"
            label="Reason For Change"
            v-model="form.reason"
          />
          <div class="d-flex mt-3">
            <v-btn
              @click="step--"
              color="teal accent-4"
              small
            >
              Edit
            </v-btn>
            <v-spacer/>
            <v-btn
              :disabled="requireReason && form.reason.length < 5"
              @click="handleSave"
              color="lime darken-4"
              small
            >
              {{ !!editPayload ? 'Update' : 'Create'  }}
            </v-btn>
          </div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-card>
</template>

<script>
import {mapState} from "vuex";
import {close, formPLus} from "@/components/content-creation/_shared";
import {VERSION_STATE} from "@/components/moderation";

export default {
  name: "TrickSteps",

  mixins: [close, formPLus(() => (
    {
      name: "",
      description: "",
      difficulty: "",
      reason:'',
      prerequisites: [],
      progressions: [],
      categories: [],
    }
  ))],

  data: () => ({
    step: 1,

    validation:{
      valid: false,
      name: [v => !!v || 'name is required'],
      description: [v => !!v || 'Description is required'],
      difficulty: [v => !!v || 'Difficulty is required'],
      categories: [v => v.length > 0 || 'At least one category is required'],
    },
  }),

  created() {
    if(this.editPayload){
      Object.assign(this.form, this.editPayload)
    }
  },

  computed: {
    ...mapState('contentUpdate',['editPayload']),

    ...mapState("tricks", ["lists","dictionaries"]),

    staged(){
      return this.form.state === VERSION_STATE.STAGED
    },

    requireReason(){
      return this.editPayload && !this.staged;
    }
  },

  methods: {
    //...mapMutations('contentUpdate',['reset']),
    //...mapActions("tricks", ["createTrick","updateTrick"]),

    async handleSave() {
      //console.log(JSON.stringify(this.form))
      if(this.form.id) {
        if (this.staged) {
          await this.$axios.$put(`/api/tricks/staged`, this.form)
        } else {
          await this.$axios.$put(`/api/tricks`, this.form)
        }
      }else{
       await this.$axios.$post(`/api/tricks`, this.form)
      }
      this.notifyChangesHandler()
      this.close();
      //Object.assign(this.$data,initState())
    },
  },
};
</script>

<style>
</style>
