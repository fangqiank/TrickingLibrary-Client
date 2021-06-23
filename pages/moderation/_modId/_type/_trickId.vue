<template>
  <div>
    <div v-if="item">
      {{ item.description }}
    </div>

    <div v-if="replyId">
         Replying to {{replyId}} <v-btn @click="replyId=0">Clear</v-btn>
    </div>

    <div>
      <v-text-field label="Comment" v-model="comment"></v-text-field>
      <v-btn @click="handleSend">Send</v-btn>
    </div>

    <div v-for="(c,index) in comments" :key="index" class="my-1">
      <span v-html="c.htmlContent"></span>
      <v-btn small @click = "replyId=c.id">Reply</v-btn>
      <v-btn small @click = "handleLoadReplies(c)">Load Replies</v-btn>
      <div v-for="(r,idx) in c.replies" :key="idx">
        <span v-html="r.htmlContent"></span>
      </div>
    </div>
  </div>
</template>

<script>
import https from "https";

const agent = new https.Agent({
  rejectUnauthorized: false,
});

const commentWithReplies = cmt =>({...cmt, replies:[]})

const endpointResolever = (type) => {
  if (type === "trick") {
    return "tricks";
  }
};

export default {
  data: () => ({
    item: null,
    comments:[],
    comment:'',
    replyId:0,
  }),

  created() {
      //console.log(this.$route.params)
      const { modId, type, trickId } = this.$route.params
      const endpoint = endpointResolever(type)
      this.$axios.$get(`/api/${endpoint}/${trickId}`,{
        httpsAgent: agent}
      ).then(item => this.item = item )

      this.$axios.$get(`/api/moderationitems/${modId}/comments`,{
        httpsAgent: agent}
      )
      .then(res => this.comments = res.map(commentWithReplies))
  },

  methods:{
    handleLoadReplies(comment){
      this.$axios.$get(`/api/comments/${comment.id}/replies`,
          {httpsAgent: agent}
      )
      .then(comments=>this.$set(comment,'replies',comments))
    },

    handleSend(){
      const { modId } = this.$route.params

      if(this.replyId > 0){
        this.$axios.$post(`/api/comments/${this.replyId}/replies`,
          {content: this.comment},
          {httpsAgent: agent}
        )
        .then(x => {
          this.comments.find(x=>x.id === this.replyId).replies.push(x)
        })
        
        this.comment = ''
        console.log(this.comments)
      } 
      else{
        this.$axios.$post(`/api/moderationitems/${modId}/comments`,
          {content: this.comment},
          {httpsAgent: agent}
        )
        .then(x => this.comments.push(commentWithReplies(x)))
        
        this.comment = ''
      }
      
    }
  },
  
};  
</script>

<style>
</style>