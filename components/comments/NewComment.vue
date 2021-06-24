<template>
  <div>
    <CommentBody 
      :comment="comment" 
      @sendReply = "handleSend"
      @loadReplies ="handleLoadReplies"
    />
    
    <div class='ml-5'>
      <CommentBody v-for="(reply,idx) in replies" :key='idx' :comment="reply" @sendReply = "handleSend"/>
    </div>
  </div>
</template>

<script>
import CommentBody from './CommentBody.vue'
import https from "https"

const agent = new https.Agent({
  rejectUnauthorized: false,
})

export default {
  name:'NewComment',

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

  methods:{
    handleSend(content){
      return this.$axios.$post(`/api/comments/${this.comment.id}/replies`,
        {content},
        {httpsAgent: agent}
      )
      .then(x => {
        this.replies.push(x)
      })
    },
    
    handleLoadReplies(){
      this.$axios.$get(`/api/comments/${this.comment.id}/replies`)
      .then(x => this.replies = x)
    }
  }
}

</script>

<style>

</style>