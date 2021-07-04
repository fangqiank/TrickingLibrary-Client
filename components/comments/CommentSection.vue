<template>
  <div>
    <CommentInput
      label='Comment'
      :parentId="parentId"
      :parentType="parentType"
      @comment-create ="c=>content.unshift(c)"/>
    <v-divider class="my-5"/>
    <NewComment v-for="(comment,idx) in content" :comment="comment" :key="idx"/>
    <div class="d-flex justify-center" v-if="!finished">
      <v-btn
        outlined
        small
        @click="loadContentsHandler"
      >
        load more
      </v-btn>
    </div>
  </div>
</template>

<script>
import CommentInput from './CommentInput.vue'
import NewComment from './NewComment.vue'
import {configurable} from "./_share";
import https from 'https'
import {feed} from "../../mixins/feed";

const agent = new https.Agent({
  rejectUnauthorized: false
})

export default {
  components: { CommentInput, NewComment },

  name:'CommentSection',

  mixins: [configurable,feed('first')],

  // computed:{
  //   endpoint(){
  //     if(this.parentType === COMMENTS_PARENT_TYPE.MODERATION_ITEM){
  //       return `/api/moderationItems/${this.parentId}/comments`
  //     }
  //     if(this.parentType === COMMENTS_PARENT_TYPE.SUBMISSION){
  //       return `/api/submissions/${this.parentId}/comments`
  //     }
  //   }
  // },

  created() {
  //   return this.$axios.$get(`/api/comments/${this.parentId}/${this.parentType}`,{httpsAgent: agent })
  //   .then(comments => comments.
  //         forEach(x=>this.comments.push(x)))
    this.loadContentsHandler()
  },

  methods:{
    getContentUrl() {
      return `/api/comments/${this.parentId}/${this.parentType}${this.query}`;
    }
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
