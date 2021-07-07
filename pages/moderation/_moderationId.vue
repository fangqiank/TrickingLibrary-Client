<template>
  <div>
    <v-row v-if="modItem">
      <v-col cols="8">
        <v-row justify="center">
          <v-col cols="5" v-if="current">
            <TrickInfoCard :trick="current" />
          </v-col>
          <v-col cols="2" v-if="current" class="d-flex justify-center">
            <v-icon size="40">mdi-arrow-right</v-icon>
          </v-col>
          <v-col cols="5" v-if="target">
            <v-sheet class="pa-3">
              <TrickInfoCard :trick="target"/>
            </v-sheet>
          </v-col>
        </v-row>

<!--        <v-divider class="my-3"/>-->

        <IfAuthenticated>
          <template v-slot:allowed>
            <div class="text-h4 my-3">Change Discussion</div>
            <CommentSection
              :parent-id="modItem.id"
              :parent-type="modItemParentType"
            />
          </template>
          <template v-slot:forbidden="{login}" >
            <div class="d-flex justify-center">
              <v-btn  class="my-3" x-small outlined @click="login">Join The Discussion</v-btn>
            </div>
          </template>
        </IfAuthenticated>
      </v-col>

      <v-col cols="4">
        <v-card>
<!--          <v-card-title>Reviews ({{approveCount}} / {{3}})</v-card-title>-->
          <v-card-text>
            <div v-if="reviews.length >0">
              <div class="d-flex mb-2" v-for="(review,idx) in reviews" :key="idx">
                <div class="mr-3">
                  <v-badge
                    v-if="review"
                    :icon="reviewStatusIcon(review.status)"
                    :color="reviewStatusColor(review.status)"
                    bottom
                    overlap
                  >
                    <UserHeader :image-url="review.user.image"/>
                  </v-badge>
                </div>
                <div>
<!--                  <div v-if="review">{{review.user.username}}</div>-->
                  <div v-if="review.comment">{{review.comment}}</div>
                </div>
              </div>
            </div>
            <div v-else class="d-flex justify-center">
              No Reviews
            </div>

            <v-divider class="my-3"/>

            <span>{{moderator}}</span>
            <div v-if="moderator">
              <div v-if="outdated">
                Outdated
              </div>

              <v-select
                v-else
                :label="'review'"
                v-model="review.status"
                :items="reviewActions"
              >
                <template v-slot:item="{on,attrs,item}">
                  <v-list-item
                    v-on="on"
                    :attrs="attrs"
                    :value="item.value"
                  >
                    <v-list-item-icon>
                      <v-icon :color="reviewStatusColor(item.value)">{{reviewStatusIcon(item.value)}}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>{{item.text}}</v-list-item-content>
                  </v-list-item>
                </template>
              </v-select>
              <v-dialog
                :value="review.status >= 0"
                persistent
                width="400"
              >
                <v-card v-if="selectedReview">
                  <v-card-text class="pt-4">
                    <v-text-field v-model="review.comment" :label="'Review Comment'"/>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn text @click="resetReviewFormHandler">cancel</v-btn>
                    <v-spacer/>
                    <v-btn
                      :color="reviewStatusColor(review.status)"
                      :disabled="selectedReview.commentRequired && review.comment.length < 5"
                      @click="createReviewHandler"
                    >
                      {{selectedReview.text}}
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import agent from "@/store/httpsAgent";
import CommentSection from '@/components/comments/CommentSection.vue';
import TrickInfoCard from "@/components/TrickInfoCard";
import IfAuthenticated from "@/components/auth/IfAuthenticated";
import UserHeader from "@/components/UserHeader";
//import {guard, GUARD_LEVEL} from "../../components/auth/AuthMixings";
import {COMMENTS_PARENT_TYPE} from "@/components/comments/_share";
import {modItemRender, REVIEW_STATUS} from "@/mixins/moderation";
import {mapGetters} from "vuex";

const initReview = () => (
  {
    status: -1,
    comment: ''
  }
)

export default {
  components: {TrickInfoCard, CommentSection, IfAuthenticated,UserHeader},

  mixins: [modItemRender],

  data: () => ({
    current: null,
    target: null,
    modItem: null,
    review: initReview(),
    reviews:[],
  }),

  // mixins: [guard(GUARD_LEVEL.AUTH)],

  async fetch() {

      const{moderationId} = this.$route.params

      this.modItem = await this.$axios.$get(`/api/moderationitems/${moderationId}`,{
        httpsAgent: agent()}
      )
      //console.log('modItem: ', this.modItem)

      const {type,current,target} = this.modItem
      this.comments = this.modItem.comments
      //this.reviews = this.modItem.reviews

      // this.$axios.$get(`/api/moderationitems/${modId}/reviews`,{
      //   httpsAgent: agent}
      // )
      // .then(res => this.reviews = res)

      const endpoint = this.endpointResolver(type)

      const loadReviews = this.loadReviewsHandler()

      const loadCurrent = this.$axios.$get(`/api/${endpoint}/${current}`,{
        httpsAgent: agent()}
      ).then(item => this.current = item )

      const loadTarget =this.$axios.$get(`/api/${endpoint}/${target}`,{
        httpsAgent: agent()}
      ).then(item => this.target = item )

      await Promise.all([loadReviews,loadCurrent,loadTarget])
  },

  methods:{
    // handleLoadReplies(comment){
    //   this.$axios.$get(`/api/comments/${comment.id}/replies`,
    //       {httpsAgent: agent}
    //   )
    //   .then(comments=>this.$set(comment,'replies',comments))
    // },

    // sendCommentHandler(content){
    //   const { moderationId } = this.$route.params
    //
    //   return this.$axios.$post(`/api/moderationitems/${moderationId}/comments`,{content},{httpsAgent: agent()})
    //     .then(x => {
    //       this.comments.push(x)
    //       console.log('comments: ', this.comments)
    //     })
    // },

    loadReviewsHandler(){
        return this.$axios.$get(`/api/moderationitems/${this.modItem.id}/reviews`,{httpsAgent: agent()})
          .then(reviews => {
            console.log('loadreviews', reviews)
            this.reviews = reviews
            //console.log('reviews: ', reviews)
          })
    },

    createReviewHandler(status){
      const { moderationId } = this.$route.params

      return this.$axios.$put(`/api/moderationitems/${moderationId}/reviews`,
        {
          comment: this.review.comment,
          status: this.review.status
        }
        //{httpsAgent: agent()}
      )
        .then(this.loadReviewsHandler)
        .then(this.resetReviewFormHandler)
    },

    resetReviewFormHandler(){
      this.review = initReview()
    }
  },

  computed:{
    ...mapGetters('auth',['moderator']),

    reviewActions(){
      return [
        {text:"Approve", value:REVIEW_STATUS.APPROVED,commentRequired:false},
        {text:"Reject", value:REVIEW_STATUS.REJECTED,commentRequired:true},
        {text:"Wait", value:REVIEW_STATUS.WAITING,commentRequired:true},
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

    selectedReview(){
      const review =this.reviewActions.find(x=>x.value === this.review.status)
      return review === undefined ? null : review
    }
  }

};
</script>

<style>
</style>
