<template>
  <v-list>
    <v-list-item
      v-for="(difficulty, index) in lists.difficulties"
      :key="index"
      @click="$router.push(`/difficulties/${difficulty.slug}`)"
    >
      <v-list-item-content>
        <v-list-item-title>{{difficulty.name}}</v-list-item-title>
        <v-list-item-subtitle >{{ difficulty.description }}</v-list-item-subtitle>
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
      <v-btn icon @click.stop="">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <v-list-item-action>

      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script>
import {mapMutations, mapState} from "vuex";
import DifficultyForm from "@/components/content-creation/DifficultyForm";

export default {
  name: "ModerationCategoryOverview",

  computed:{
    ...mapState('tricks',['lists'])
  },

  methods:{
    ...mapMutations('contentUpdate',['activate']),

    editHandler(difficulty){
      this.activate({
        component: DifficultyForm,
        edit: true,
        editPayload: difficulty,
        setup: null
      })
    }
  }
}
</script>

<style scoped>

</style>
