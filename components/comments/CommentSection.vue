<template>
  <div>
    <CommentInput label='Comment' @sendNewComment ="(c) => $emit('send',c)"/>
    <v-divider class="my-5"/>
    <NewComment v-for="(comment,idx) in comments" :comment="comment" :key="idx"/>
      
  </div>
</template>

<script>
import CommentInput from './CommentInput.vue'
import NewComment from './NewComment.vue'
export default {
  components: { CommentInput, NewComment },

  name:'CommentSection',

  props:{
      comments:{
          required:true,
          type:Array
      }
  }
}
</script>

<style>

</style>