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
          <div>
            <v-text-field label="Name" v-model="form.name"></v-text-field>

            <v-text-field
              label="Description"
              v-model="form.description"
            ></v-text-field>

            <v-select
              :items="lists.difficulties.map(x => ({value:x.id,text:x.name}))"
              v-model="form.difficulty"
              label="Difficulty"
            ></v-select>

            <v-select
              :items="lists.tricks
                           .filter(x => !form.id || x.id !== form.id)
                           .map(x => ({value:x.id,text:x.name}))"
              v-model="form.prerequisites"
              label="Prerequisites"
              multiple
              small-chips
              chips
              deletable-chips
            ></v-select>

            <v-select
              :items="lists.tricks
                           .filter(x => !form.id || x.id !== form.id)
                           .map(x => ({value:x.id,text:x.name}))"
              v-model="form.progressions"
              label="Progressions"
              multiple
              small-chips
              chips
              deletable-chips
            ></v-select>
            <v-select
              :items="lists.categories.map(x => ({value:x.id,text:x.name}))"
              v-model="form.categories"
              label="Categories"
              multiple
              small-chips
              chips
              deletable-chips
            ></v-select>

            <div class="d-flex justify-center">
              <v-btn @click="step++">Next</v-btn>
            </div>
          </div>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-text-field
            v-if="editing"
            label="Reason For Change"
            v-model="form.reason"
          />
          <div class="d-flex justify-center">
            <v-btn
              :disabled="editing && form.reason.length < 5"
              @click="handleSave"
              color="teal accent-4"
            >Save</v-btn>
          </div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-card>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { close } from "./_shared";

export default {
  name: "TrickSteps",

  mixins: [close],

  data: () => ({
    step: 1,
    form: {
      name: "",
      description: "",
      difficulty: "",
      reason:'',
      prerequisites: [],
      progressions: [],
      categories: [],
    },
  }),

  created() {
    if(this.editing){
      Object.assign(this.form, this.editPayload)
    }
  },

  computed: {
    ...mapState('videos',['editing','editPayload']),
    ...mapState("tricks", ["lists"]),
  },

  methods: {
    //...mapMutations('videos',['reset']),
    ...mapActions("tricks", ["createTrick","updateTrick"]),

    async handleSave() {
      console.log(JSON.stringify(this.form))
      if(this.editing){
        await this.updateTrick({
          form:this.form
        })
      }else{
        await this.createTrick({
          form: this.form,
        });
      }


      this.close();

      //Object.assign(this.$data,initState())
    },
  },
};
</script>

<style>
</style>
