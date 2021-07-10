<template>
  <v-card>
    <v-card-title>
      Create Submission
      <v-spacer />
      <v-btn icon @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>

    <v-stepper v-model="step" class="rounded-0">
      <v-stepper-header s="elevation-0">
        <v-stepper-step :complete="step > 1" step="1">
          Upload Video
        </v-stepper-step>

        <v-divider></v-divider>

<!--        <v-stepper-step :complete="step > 2" step="2">-->
<!--          Select Trick-->
<!--        </v-stepper-step>-->

<!--        <v-divider></v-divider>-->

        <v-stepper-step :complete="step > 2" step="3">
          Submission
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3"> Review </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items class="fpt-0">
        <v-stepper-content step="1">
          <div>
            <v-file-input
              v-model="file"
              accept="vodeo/*"
              @change="handleFile"
            />
          </div>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-form ref="form" v-model="validation.valid">
            <v-autocomplete
              :items="lists.tricks.map(x=>({value: x.slug,text: x.name}))"
              :rules="validation.trickId"
              label="Select Trick"
              v-model="form.trickId"
            />
            <v-text-field
              :rules="validation.description"
              label="Description"
              v-model="form.description"
            />
            <div class="d-flex justify-center">
              <v-btn
                :disabled="!validation.valid"
                @click="$refs.form.validate() ? step++ : 0"
              >
                Next
              </v-btn>
            </div>
          </v-form>
        </v-stepper-content>

<!--        <v-stepper-content step="3">-->
<!--          <div>-->
<!--            <v-text-field label="Description" v-model="form.description" />-->
<!--            <div class="d-flex justify-center">-->
<!--              <v-btn @click="step++">Next</v-btn>-->
<!--            </div>-->
<!--          </div>-->
<!--        </v-stepper-content>-->

        <v-stepper-content step="3">
          <div><strong>File Name: </strong> {{fileName}}</div>
          <div v-if="form.trickId"><strong>Trick: </strong> {{dictionaries.tricks[form.trickId].name}}</div>
          <div><strong>Description: </strong> {{form.description}}</div>

          <div class="d-flex">
            <v-btn @click="handleRestart" color="teal accent-4" small>Restart</v-btn>
            <v-btn @click="step--" color="red accent-2" class="mx-2" small>Edit</v-btn>
            <v-spacer/>
            <v-btn @click="handleSave" color="lime darken-4" small>Complete</v-btn>
          </div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-card>
</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex";
import {close, formPLus} from "./_shared";
//import agent from "@/store/httpsAgent";

const initForm = () => (
  {
    trickId: "",
    video: "",
    description: "",
  }
)

export default {
  name: "SubmissionSteps",

  mixins: [
    close,
    formPLus(initForm)
  ],

  data: () => (
    {
      step: 1,

      file: null,

      validation:{
        valid: false,
        trickId: [v => !!v || 'Trick is required'],
        description: [v => !!v || 'Description is required'],
      },
    }
  ),

  created() {
  },

  computed: {
    ...mapState("tricks", ["lists","dictionaries"]),

    fileName(){
      return this.file ? this.file.name : ""
    }
  },

  methods: {
    ...mapMutations("videos", ["hide"]),

    ...mapActions("videos", ["startVideoUpload","createSubmission"]),

    async handleFile(file) {
      if (!file) return;

      const form = new FormData();
      form.append("video", file);
      this.startVideoUpload({ form });
      this.step++;
    },

    handleRestart(){
      this.formPLus = initForm()
      this.cancelUpload({hard: false})
      this.step = 1
      this.file = null
    },

    handleSave() {
      this.createSubmission({ form: this.form });
      // this.$axios.$post('/api/submissions',this.form, /* {httpsAgent: agent() }*/)
      this.hide();

      //Object.assign(this.$data,initState())
    },
  },
};
</script>

<style>
</style>
