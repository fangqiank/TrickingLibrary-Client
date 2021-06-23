<template>
  <div>
    <div v-if="item">
      {{ item.description }}
    </div>
    <div>
      <v-text-field label="Comment" v-model="comment"></v-text-field>
      <v-btn @click="handleSend">Send</v-btn>
    </div>
    <div v-for="(c,index) in comments" v-html="c.htmlContent" :key="index"></div>
  </div>
</template>

<script>
import https from "https";

const agent = new https.Agent({
  rejectUnauthorized: false,
});

const endpointResolever = (type) => {
  if (type === "trick") {
    return "tricks";
  }
};

export default {
  data: () => ({
    item: null,
    comments:[],
    comment:''
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
      .then(res => this.comments = res )
      console.log(this.comments)
  },

  methods:{
    handleSend(){
      const { modId } = this.$route.params

      this.$axios.$post(`/api/moderationitems/${modId}/comments`,
        {content: this.comment},
        {httpsAgent: agent}
      )
      .then(x => this.comments.push(x))
    }
  },
  
};
</script>

<style>
</style>