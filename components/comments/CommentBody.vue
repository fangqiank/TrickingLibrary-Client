<template>
  <div class='my-1'>
    <div>
      <v-sheet color="teal darken-4" rounded class="d-flex align-center">
        <UserHeader
          :image-url="comment.user.image"
        />
        <p class='mb-1' v-html="comment.htmlContent"></p>
      </v-sheet>

      <v-btn small text v-if="!replying" @click="replying=true">Reply</v-btn>
      <v-btn small text v-if="$listeners['loadReplies']"  @click="$emit('loadReplies')">Load Replies</v-btn>
    </div>

    <CommentInput
        label = "Reply"
        v-if="replying"
        :parentId="parentId"
        :parentType="parentType"
        @comment-create = "emitComment"
        @cancel ="replying=false"/>

  </div>
</template>

<script>
import CommentInput from './CommentInput.vue'
import {configurable, creator} from "./_share";
import UserHeader from "../UserHeader";

export default {
  components: {UserHeader, CommentInput },

  mixins:[creator, configurable],

  name:'CommentBody',

  data:()=>(
    {
        replying:false,
    }
  ),

  props:{
    comment:{
        required:true,
        type:Object
    }
  }
}
</script>

<style>

</style>
