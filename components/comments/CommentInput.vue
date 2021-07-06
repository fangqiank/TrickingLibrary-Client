<template>
  <div>
      <v-text-field
        label="Comment"
        v-model="content"
        clearable
        @keydown.ctrl.enter="$emit('sendNewComment',content)"
      ></v-text-field>
      <v-btn @click="cancel">Cancel</v-btn>
      <v-btn @click="sendComment">{{label}}</v-btn>
  </div>
</template>

<script>
import {configurable, creator} from "./_share";
import agent from "@/store/httpsAgent";

export default {
  name: 'CommentInput',

  mixins: [creator, configurable],

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

  methods:{
    sendComment(){
      const data = {
        parentId: this.parentId,
        parentType: this.parentType,
        content: this.content
      }

      return this.$axios.$post('/api/comments', data,{httpsAgent: agent() })
      .then(this.emitComment)
      .then(this.cancel)
    }
  }
}
</script>

<style>

</style>
