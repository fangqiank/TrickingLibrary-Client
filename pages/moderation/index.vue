<template>
  <div>
    <v-list>
      <v-list-item
        :to="`/moderation/${item.id}`"
        v-for="(item, index) in content"
        :key="index"
      >
        <v-list-item-avatar>
<!--          <v-icon>mdi-account</v-icon>-->
          <user-header :image-url="item.targetObject.user.image" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>Title</v-list-item-title>
          <v-list-item-subtitle>Sub Title</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
//import agent from "@/store/httpsAgent";
import {feed} from "@/mixins/feed";
import {modItemRender} from "@/mixins/moderation";

export default {
  data: () => ({
    items: [],
  }),

  mixins: [feed(''), modItemRender],

  fetch(){
    return this.loadContentsHandler()
  },

  methods: {
    getContentUrl(){
      return `/api/moderationitems${this.query}`
    },

    parseContentHandler(content){
      const {moderationItems, targets} = content
      console.log('moderation????: ',content)
      this.content = moderationItems.map(x => ({
        ...x,
        targetObject: targets.find(t=>t.id === x.target)
      }))
    }
  },
};
</script>

<style>
</style>
