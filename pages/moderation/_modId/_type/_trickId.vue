<template>
  <div>
    <div v-if="item">
      {{ item.description }}
    </div>

    <v-row>
      <v-col cols="7">
        <CommentSection :comments="comments" @send="handleSendComment"/>
      </v-col>
      <v-col cols="5">
        <v-card>
          <v-card-title>Reviews ({{approveCount}} / {{reviews.length}})</v-card-title>
          <v-card-text>
            <div v-if="reviews.length>0">
              <div v-for="(review,idx) in reviews" :key="idx">
                <v-icon :color="reviewStatusColor(review.status)">
                  {{reviewStatusIcon(review.status)}}
                </v-icon>
                <span v-if="review.comment">
                  Username -  {{review.comment}}
                </span>
              </div>
            </div>
            <div v-else>
              No Reviews
            </div>

            <v-divider  class="my-3"></v-divider>
            <v-text-field
              clearable
              label="Review Comment"
              v-model="reviewComment"
            >
            </v-text-field>
          </v-card-text>
          <v-card-actions class='justify-center'>
            <v-btn 
              v-for="(action,idx) in reviewActions" 
              :key="idx" 
              :color="reviewStatusColor(action.status)"
              :disabled="action.disabled"
              @click="handleCreateRiview(action.status)"
            >
              <v-icon class='mr-2'>{{reviewStatusIcon(action.status)}}</v-icon>
              {{action.title}}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
   
  </div>
</template>

<script>
import https from "https";
import CommentSection from '@/components/comments/CommentSection.vue';

const agent = new https.Agent({
  rejectUnauthorized: false,
});

const REVIEW_STATUS = {
  APPROVED: 0,
  REJECTED: 1,
  WAITING: 2
}

const reviewStatusColor = status => {
  if(status === REVIEW_STATUS.APPROVED )
    return 'green'
  if(status === REVIEW_STATUS.REJECTED )
    return 'red'
  if(status === REVIEW_STATUS.WAITING )
    return 'orange'

  return ''
}

const reviewStatusIcon = status => {
  if(status === REVIEW_STATUS.APPROVED )
    return 'mdi-check'
  if(status === REVIEW_STATUS.REJECTED )
    return 'mdi-close'
  if(status === REVIEW_STATUS.WAITING )
    return 'mdi-clock'

  return ''
} 


// const commentWithReplies = cmt =>({...cmt, replies:[]})

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
    reviews:[],
    reviewComment:'',
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
      //.then(res => this.comments = res.map(commentWithReplies))
      .then(res => this.comments = res)

      this.$axios.$get(`/api/moderationitems/${modId}/reviews`,{
        httpsAgent: agent}
      )
      .then(res => this.reviews = res)
  },

  methods:{
    // handleLoadReplies(comment){
    //   this.$axios.$get(`/api/comments/${comment.id}/replies`,
    //       {httpsAgent: agent}
    //   )
    //   .then(comments=>this.$set(comment,'replies',comments))
    // },

    reviewStatusColor,
    
    reviewStatusIcon,

    handleSendComment(content){
      const { modId } = this.$route.params
      
      return this.$axios.$post(`/api/moderationitems/${modId}/comments`,{content},{httpsAgent: agent})
        .then(x => {
          this.comments.push(x)
          console.log('comments: ', this.comments)
        })  
    },

    handleCreateRiview(status){
      const { modId } = this.$route.params

      return this.$axios.$post(`/api/moderationitems/${modId}/reviews`,
        {comment:this.reviewComment, status: status},
        {httpsAgent: agent})
        .then(x => {
          this.reviews.push(x)
          this.reviewComment = ''
          console.log('reviews: ', this.reviews)
        }) 
    },

  },

  computed:{
    reviewActions(){
      return [
        {title:"Approve", status:REVIEW_STATUS.APPROVED,disabled:false},
        {title:"Reject", status:REVIEW_STATUS.REJECTED,disabled:!this.reviewComment},
        {title:"Wait", status:REVIEW_STATUS.WAITING,disabled:!this.reviewComment},
      ]
    },

    approveCount(){
      return this.reviews.filter(x=>x.status ===REVIEW_STATUS.APPROVED).length
    },
  }
  
};  
</script>

<style>
</style>