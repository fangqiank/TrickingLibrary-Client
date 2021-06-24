<template>
  <div>
    <div v-if="item">
      {{ item.description }}
    </div>
   
    <CommentSection :comments="comments" @send="handleSend"/>

    <!-- <div v-for="(c,index) in comments" :key="index" class="my-1">
      <span v-html="c.htmlContent"></span>
      <v-btn small @click = "replyId=c.id">Reply</v-btn>
      <v-btn small @click = "handleLoadReplies(c)">Load Replies</v-btn>
      <div v-for="(r,idx) in c.replies" :key="idx">
        <span v-html="r.htmlContent"></span>
      </div>
    </div> -->
  </div>
</template>

<script>
import https from "https";
import CommentSection from '../../../../components/comments/CommentSection.vue';

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
  components: { CommentSection },
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

    handleSend(content){
      const { modId } = this.$route.params
      
      return this.$axios.$post(`/api/moderationitems/${modId}/comments`,{content},{httpsAgent: agent})
        .then(x => {
          this.comments.push(x)
          console.log('comments: ', this.comments)
        })
      
      
    }
  },
  
};  
</script>

<style>
</style>