<template>
  <div>
    <CommentBody
      :comment="comment"
      :parent-id="comment.id"
      :parent-type="commentParentType"
      @comment-create = "c => content.push(c)"
      @[loadRepliesHandler] ="loadContentsHandler"
    />

    <div class='ml-5'>
      <CommentBody v-for="(c,idx) in content"
                   :comment="c"
                   :key='idx'
                   :parent-id="comment.id"
                   :parent-type="commentParentType"
                   @comment-create = "x => content.push(x)"
     />

    <div class="d-flex justify-center" v-if="content.length > 0 && !finished">
      <v-btn
        outlined
        small
        @click="loadContentsHandler"
      >
        load more
      </v-btn>
    </div>
    </div>
  </div>
</template>

<script>
import CommentBody from './CommentBody.vue'
import https from "https"
import {COMMENTS_PARENT_TYPE} from "./_share";
import {feed} from "../../mixins/feed";

const agent = new https.Agent({
  rejectUnauthorized: false,
})

export default {
  name:'NewComment',

  mixins:[feed('first')],

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
    },

    loadRepliesHandler(){
      return this.content.length === 0
      ? 'loadReplies' : ''
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

    getContentUrl() {
      return `/api/comments/${this.comment.id}/${this.commentParentType}${this.query}`;
    },

    // loadRepliesHandler(){
    //   this.$axios.$get(`/api/comments/${this.comment.id}/replies`)
    //   .then(x => this.comments = x)
    // }
  }
}

</script>

<style>

</style>
