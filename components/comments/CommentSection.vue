<template>
  <div>
    <CommentInput
      label='Comment'
      :parentId="parentId"
      :parentType="parentType"
      @comment-create ="prependComment"/>
    <v-divider class="my-5"/>
    <NewComment v-for="(comment,idx) in comments" :comment="comment" :key="idx"/>

  </div>
</template>

<script>
import CommentInput from './CommentInput.vue'
import NewComment from './NewComment.vue'
import {COMMENTS_PARENT_TYPE, configurable, container} from "./_share";
import https from 'https'

const agent = new https.Agent({
  rejectUnauthorized: false
})

export default {
  components: { CommentInput, NewComment },

  name:'CommentSection',

  mixins: [configurable,container],

  computed:{
    endpoint(){
      if(this.parentType === COMMENTS_PARENT_TYPE.MODERATION_ITEM){
        return `/api/moderationItems/${this.parentId}/comments`
      }
      if(this.parentType === COMMENTS_PARENT_TYPE.SUBMISSION){
        return `/api/submissions/${this.parentId}/comments`
      }
    }
  },

  created() {
    return this.$axios.$get(this.endpoint,{httpsAgent: agent })
    .then(comments => comments.forEach(x=>this.comments.push(x)))
  },

  // props:{
  //     comments:{
  //         required:true,
  //         type:Array
  //     }
  // }
}
</script>

<style>

</style>
