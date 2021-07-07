<template>
  <div>
    <v-list>
      <v-list-item
        :to="`/moderation/${item.id}`"
        v-for="(item, index) in content"
        :key="index"
      >
        <v-list-item-avatar>
          <user-header :image-url="item.targetObject.user.image" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{item.targetObject.name}}</v-list-item-title>
          <v-list-item-subtitle v-if="item.reason">{{ item.reason }}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-content>
          <v-list-item-title>
            <span
              class="text-h6"
              :class="item.targetObject.version === 1 ? 'green--text' :'orange--text'"
            >
              {{item.targetObject.version === 1 ? 'NEW' :'CHANGE'}}
            </span>
          </v-list-item-title>
          <v-list-item-subtitle></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-content>
          <v-list-item-title>
            Last Updated
          </v-list-item-title>
          <v-list-item-subtitle>{{item.updated}}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-content>
          <div class="d-flex justify-end">Review Status</div>
          <div class="d-flex justify-end" v-if="item.reviews.length > 0">
            <div v-for="(review,idx) in item.reviews" :key="idx">
              <v-icon :color="reviewStatusColor(review)">
                {{reviewStatusIcon(review)}}
              </v-icon>
            </div>
          </div>
          <div class="d-flex justify-end" v-else>Waiting for review</div>
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
