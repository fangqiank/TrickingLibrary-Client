<template>
  <div>
    <CommentBody
      :comment="comment"
      :parent-id="comment.id"
      :parent-type="commentParentType"
      @comment-create = "appendComment"
      @loadReplies ="handleLoadReplies"
    />

    <div class='ml-5'>
      <CommentBody v-for="(c,idx) in comments"
                   :comment="c"
                   :key='idx'
                   :parent-id="comment.id"
                   :parent-type="commentParentType"
                   @comment-create = "appendComment"
     />
    </div>
  </div>
</template>

<script>
import CommentBody from './CommentBody.vue'
import https from "https"
import {COMMENTS_PARENT_TYPE, container} from "./_share";

const agent = new https.Agent({
  rejectUnauthorized: false,
})

export default {
  name:'NewComment',

  mixins:[container],

  components:{
    CommentBody
  },

  props:{
    comment:{
      required:true,
      type:Object
    }
  },

  data:()=>(
    {
      replies:[],
    }
  ),

  computed:{
    commentParentType(){
      return COMMENTS_PARENT_TYPE.COMMENT
    }
  },

  methods:{
    // handleSend(content){
    //   return this.$axios.$post(`/api/comments/${this.comment.id}/replies`,
    //     {content},
    //     {httpsAgent: agent}
    //   )
    //   .then(x => {
    //     this.replies.push(x)
    //   })
    // },

    handleLoadReplies(){
      this.$axios.$get(`/api/comments/${this.comment.id}/replies`)
      .then(x => this.comments = x)
    }
  }
}

</script>

<style>

</style>
