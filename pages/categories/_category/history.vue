<template>
<v-list>
  <v-list-item v-for="(category,idx) in categories" :key="idx">
    <v-list-item-title>{{category.name}}</v-list-item-title>
  </v-list-item>
</v-list>
</template>

<script>
import agent from "@/store/httpsAgent"

export default {
  name: "history",

  data:()=>(
    {
      categories: []
    }
  ),

  fetch() {
    return this.$axios.$get(`/api/categories/${this.$route.params.category}/history`,
      {httpsAgent: agent()})
      .then(categories => this.categories = categories)

  }
}
</script>

<style scoped>

</style>
