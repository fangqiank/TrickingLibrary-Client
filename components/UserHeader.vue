<template>
  <div class="d-flex align-center" :class="{'flex-row-reverse': reverse}">
    <v-avatar :size="size" class="mx-2">
      <img :src="imageUrl" alt="portrait"/>
    </v-avatar>
    <div v-if="username">
      {{username}}
    </div>
    <v-spacer/>
    <div v-if="append">
      {{append}}
    </div>
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
    },

    append:{
      required: false,
      type: String,
      default: ''
    },

    reverse:{
      required: false,
      type: Boolean,
      default: false
    }
  },
}
</script>

<style scoped>

</style>
