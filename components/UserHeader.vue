<template>
  <div class="d-flex align-center">
    <v-avatar :size="size" class="mx-2">
      <img :src="imageUrl" alt="portrait"/>
    </v-avatar>
    <div v-if="username">
      {{username}}
    </div>
    <v-spacer/>
  </div>
</template>

<script>
export default {
  name: "UserHeader",

  props:{
    imageUrl:{
      required: false,
      type: String
    },

    username:{
      required: false,
      type: String
    },

    size:{
      required: false,
      type: String,
      default: '42'
    }
  },
}
</script>

<style scoped>

</style>
