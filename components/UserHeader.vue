<template>
  <div class="d-flex align-center" :class="{'flex-row-reverse': reverse}">
    <div
      class="d-flex align-center"
      :class="{'pointer': link}"
      @click="linkHandler"
    >
      <v-avatar :size="size" class="mx-2">
        <img v-if="imageUrl" :src="imageUrl" alt="portrait"/>
        <v-icon v-else>
          mdi-account
        </v-icon>
      </v-avatar>
      <div v-if="username">
        {{username}}
      </div>
    </div>

    <v-spacer/>

    <slot name="append"></slot>
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
      type: String,
      default:''
    },

    size:{
      required: false,
      type: String,
      default: '42'
    },

    reverse:{
      required: false,
      type: Boolean,
      default: false
    },

    link:{
      required: false,
      type: Boolean,
      default: true
    },

  },

  methods:{
    linkHandler(){
      if(this.link)
        return this.$router.push(`/profile/${this.username}`)
    }
  }
}
</script>

<style scoped>

</style>
