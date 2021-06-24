<template>
  <div>
      <v-text-field label="Comment" v-model="content"></v-text-field>
      <v-btn v-if="$listeners['cancelSend']"  @click="$emit('cancelSend')">Cancel</v-btn>
      <v-btn @click="$emit('sendNewComment',content)">{{label}}</v-btn>
  </div>
</template>

<script>
export default {
  name:'CommentInput',

  data:()=>(
      {
          content:'',
      }
  ),

  props:{
      label:{
          required:false,
          type:String,
          default:'send'
      }
  },
}
</script>

<style>

</style>