<template>
  <div>
      <v-text-field 
        label="Comment" 
        v-model="content"
        clearable
        @keydown.ctrl.enter="$emit('sendNewComment',content)"
      ></v-text-field>
      <v-btn v-if="$listeners['cancelSend']"  @click="$emit('cancelSend')">Cancel</v-btn>
      <v-btn @click="$emit('sendNewComment',content)" :disabled="!content">{{label}}</v-btn>
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