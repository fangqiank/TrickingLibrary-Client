<template>
  <div class='my-1'>
    <div>
        <p class='mb-1' v-html="comment.htmlContent"></p>
        <v-btn small text v-if="!replying" @click="replying=true">Reply</v-btn>
        <v-btn small text v-if="$listeners['loadReplies']"  @click="$emit('loadReplies')">Load Replies</v-btn>
    </div>

    <CommentInput
        v-if="replying" 
        @sendNewComment = "c => $emit('sendReply',c)" 
        @cancelSend ="replying=false"/>
    
  </div>
</template>

<script>
import CommentInput from './CommentInput.vue'

export default {
  components: { CommentInput },
  
  name:'CommentBody',

  data:()=>(
    {
        replying:false,
    }
  ),

  props:{
    comment:{
        required:true,
        type:Object
    }
  }
}
</script>

<style>

</style>