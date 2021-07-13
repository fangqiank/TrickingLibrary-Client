<template>
  <div>
    <v-list>
      <v-list-item
        v-for="(difficulty, index) in lists.difficulties"
        :key="index"
        @click="$router.push(`/difficulties/${difficulty.slug}`)"
      >
        <v-list-item-content>
          <v-list-item-title>{{difficulty.name}}</v-list-item-title>
          <v-list-item-subtitle >{{ difficulty.description}}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-content>
          <v-list-item-title>
            Last Updated
          </v-list-item-title>
          <v-list-item-subtitle>{{difficulty.updated}}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon @click.stop="editHandler(difficulty)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-list-item-action>
        <v-btn icon @click.stop="selectedDifficulty = difficulty">
          <v-icon>mdi-swap-horizontal</v-icon>
        </v-btn>
      </v-list-item>
    </v-list>
    <v-dialog :value="selectedDifficulty" width="300" persistent>
      <v-card v-if="selectedDifficulty">
        <v-card-title>Migrate {{selectedDifficulty.name}}? </v-card-title>
        <v-card-text>
          <v-select
            :items="lists.difficulties.filter(x => x.id !== selectedDifficulty.id)
                                      .map(x => ({value: x.id, text: x.name}))"
            v-model="target"
            label="Difficulty"
          />
        </v-card-text>

        <v-card-actions>
          <v-btn color="primary" @click="selectedDifficulty = null">No</v-btn>
          <v-spacer />
          <v-btn @click="migrateHandler" :disabled="target === 0">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";
import DifficultyForm from "@/components/content-creation/DifficultyForm";
import {EVENTS} from "@/data/events";

export default {
  name: "ModerationCategoryOverview",

  computed:{
    ...mapState('tricks',['lists'])
  },

  data: () =>(
    {
      selectedDifficulty: null,
      target :0,
    }
  ),

  methods:{
    ...mapMutations('contentUpdate',['activate']),

    editHandler(difficulty){
      this.activate({
        component: DifficultyForm,
        //edit: true,
        editPayload: difficulty,
        setup: null
      })
    },

    migrateHandler(){
     return this.$axios.$put(`/api/difficulties/${this.selectedDifficulty.id}/${this.target}`, null)
       .then(x => this.$nuxt.$emit(EVENTS.CONTENT_UPDATED))
       .finally(() => {
         this.selectedDifficulty = null
         this.target = 0
       })

    }
  },
}
</script>

<style scoped>

</style>
