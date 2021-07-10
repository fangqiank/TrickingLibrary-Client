<template>
  <v-list>
    <v-list-item
      v-for="(category, index) in lists.categories"
      :key="index"
      @click="$router.push(`/categories/${category.slug}`)"
    >
      <v-list-item-content>
        <v-list-item-title>{{category.name}}</v-list-item-title>
        <v-list-item-subtitle >{{ category.description }}</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-content>
        <v-list-item-title>
          Last Updated
        </v-list-item-title>
        <v-list-item-subtitle>{{category.updated}}</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn icon @click.stop="editHandler(category)">
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
import CategoryForm from '@/components/content-creation/CategoryForm'

export default {
  name: "ModerationCategoryOverview",

  computed:{
    ...mapState('tricks',['lists'])
  },

  methods:{
    ...mapMutations('contentUpdate',['activate']),

    editHandler(category){
      console.log('editHandler:category',category)
      this.activate({
        component: CategoryForm,
        edit: true,
        editPayload: category,
        setup: null
      })
    }
  }
}
</script>

<style scoped>

</style>
