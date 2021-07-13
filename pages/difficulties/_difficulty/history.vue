<template>
<v-list>
  <v-list-item v-for="(history,idx) in histories" :key="idx">
    <v-list-item-title>{{history.name}}</v-list-item-title>
  </v-list-item>
</v-list>
</template>

<script>
import agent from "@/store/httpsAgent"

export default {
  name: "history",

  data:()=>(
    {
      histories: []
    }
  ),

  fetch() {
    return this.$axios.$get(`/api/categories/${this.$route.params.category}/history`,
      {httpsAgent: agent()})
      .then(histories => this.histories = histories)

  }
}
</script>

<style scoped>

</style>
