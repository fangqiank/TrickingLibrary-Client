<template>
<v-card>
  <v-card-title>{{payload.name}}</v-card-title>
  <v-card-text>{{payload.description}}</v-card-text>
  <v-card-actions v-if="$listeners['handle-edit']">
    <v-btn outlined @click="$emit('handle-edit')">edit</v-btn>
  </v-card-actions>
</v-card>
</template>

<script>
export default {
  name: "SimpleInfoCard",

  props:{
    payload:{
      required: true,
      type: Object
    }
  },
}
</script>

<style scoped>

</style>
