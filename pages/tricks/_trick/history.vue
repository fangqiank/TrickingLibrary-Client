<template>
<v-list>
  <v-list-item v-for="(trick,idx) in tricks" :key="idx">
    <v-list-item-title>{{trick.name}}</v-list-item-title>
  </v-list-item>
</v-list>
</template>

<script>
import agent from "@/store/httpsAgent"

export default {
  name: "history",

  data:()=>(
    {
      tricks: []
    }
  ),

  fetch() {
    return this.$axios.$get(`/api/tricks/${this.$route.params.trick}/history`,
      {httpsAgent: agent()})
      .then(tricks => this.tricks = tricks)

  }
}
</script>

<style scoped>

</style>
