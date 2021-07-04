<template>
  <div>
    <v-row v-if="modItem">
      <v-col cols="8">
        <v-row justify="center">
          <v-col cols="4" v-if="current">
            <TrickInfoCard :trick="current" />
          </v-col>
          <v-col cols="4" v-if="current" class="d-flex justify-center">
            <v-icon size="40">mdi-arrow-right</v-icon>
          </v-col>
          <v-col cols="4" v-if="target">
            <TrickInfoCard :trick="target"/>
          </v-col>
        </v-row>
        <CommentSection
          :parent-id="modItem.id"
          :parent-type="modItemParentType"
        />
      </v-col>

      <v-col cols="4">
        <v-card>
          <v-card-title>Reviews ({{approveCount}} / {{3}})</v-card-title>
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
          <div v-if="outdated">
            Outdated
          </div>
          <v-card-actions class='justify-center' v-else>
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
import TrickInfoCard from "../../components/TrickInfoCard";
import {guard, GUARD_LEVEL} from "../../components/auth/AuthMixings";
import {COMMENTS_PARENT_TYPE} from "../../components/comments/_share";

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
  components: {TrickInfoCard, CommentSection },

  data: () => ({
    current: null,
    target: null,
    modItem: null,
    //reviews:[],
    reviewComment:'',
    //replyId:0,
  }),

  mixins: [guard(GUARD_LEVEL.AUTH)],

  async created() {

      const{moderationId} = this.$route.params

      this.modItem = await this.$axios.$get(`/api/moderationitems/${moderationId}`,{
        httpsAgent: agent}
      )
      console.log('modItem: ', this.modItem)

      const {type,current,target} = this.modItem
      this.comments = this.modItem.comments
      //this.reviews = this.modItem.reviews

      // this.$axios.$get(`/api/moderationitems/${modId}/reviews`,{
      //   httpsAgent: agent}
      // )
      // .then(res => this.reviews = res)

      const endpoint = endpointResolever(type)

      this.$axios.$get(`/api/${endpoint}/${current}`,{
        httpsAgent: agent}
      ).then(item => this.current = item )

      this.$axios.$get(`/api/${endpoint}/${target}`,{
        httpsAgent: agent}
      ).then(item => this.target = item )
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
      const { moderationId } = this.$route.params

      return this.$axios.$post(`/api/moderationitems/${moderationId}/comments`,{content},{httpsAgent: agent})
        .then(x => {
          this.comments.push(x)
          console.log('comments: ', this.comments)
        })
    },

    handleCreateRiview(status){
      const { moderationId } = this.$route.params

      return this.$axios.$post(`/api/moderationitems/${moderationId}/reviews`,
        {comment:this.reviewComment, status: status},
        {httpsAgent: agent})
        .then(x => {
          this.reviews.push(x)
          this.reviewComment = ''
          //console.log('reviews: ', this.reviews)
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
      return this.reviews.filter(x=> x.status === REVIEW_STATUS.APPROVED).length
    },

    outdated(){
      return this.current && this.target && (this.target.version - this.current.version) <= 0
    },

    modItemParentType(){
      return COMMENTS_PARENT_TYPE.MODERATION_ITEM
    },

    reviews(){
      return this.modItem.reviews
    }
  }

};
</script>

<style>
</style>
