<template>
  <div>
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
        <v-btn icon @click.stop="selectedCategory = category">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-list-item>
    </v-list>
    <v-dialog :value="selectedCategory" width="300" persistent>
      <v-card v-if="selectedCategory">
        <v-card-title>Delete {{selectedCategory.name}}? </v-card-title>
        <v-card-actions>
          <v-btn color="primary" @click="selectedCategory = null">No</v-btn>
          <v-spacer />
          <v-btn @click="deleteHandler">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";
import CategoryForm from '@/components/content-creation/CategoryForm'
import {EVENTS} from "@/data/events";

export default {
  name: "ModerationCategoryOverview",

  data: () =>(
    {
      selectedCategory: null
    }
  ),

  computed:{
    ...mapState('tricks',['lists'])
  },

  methods:{
    ...mapMutations('contentUpdate',['activate']),

    editHandler(category){
      //console.log('editHandler:category',category)
      this.activate({
        component: CategoryForm,
        //edit: true,
        editPayload: category,
        setup: null
      })
    },

    deleteHandler(){
      return this.$axios.$delete(`/api/categories/${this.selectedCategory.id}`)
        .then(x => this.$nuxt.$emit(EVENTS.CONTENT_UPDATED))
        .finally(() => this.selectedCategory = null)
    }


  }
}
</script>

<style scoped>

</style>
