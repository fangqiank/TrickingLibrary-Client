<template>
  <v-list>
    <v-list-item
      :to="`/moderation/${item.id}`"
      v-for="(item, index) in content"
      :key="index"
    >
<!--      {{item.targetObject}}-->
      <v-list-item-avatar>
        <user-header :image-url="item.user.image" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title v-if="item.currentObject">{{item.currentObject.name}}</v-list-item-title>
        <v-list-item-title v-else-if="item.targetObject">{{item.targetObject.name}}</v-list-item-title>
        <v-list-item-subtitle v-if="item.reason">{{ item.reason }}</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-content>
        <v-list-item-title>
            <span
              class="text-h6"
              :class="changeTypeColorHandler(item)"
            >
              {{changeTypeHandler(item)}}
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
    <v-list-item @click="loadContentsHandler" v-if="!finished">
      <v-list-item-content class="d-flex justify-center">Load More</v-list-item-content>

    </v-list-item>
  </v-list>
</template>

<script>
import {feed} from "@/mixins/feed";
import {modItemRender, VERSION_STATE} from "@/mixins/moderation";
import {EVENTS} from "@/data/events";
import {onContentUpdated} from "@/mixins/onContentUpdated";

export default {
  name: "ModerationItemFeed",

  data: () => ({
    items: [],
  }),

  mixins: [feed(''), modItemRender, onContentUpdated],

  fetch(){
    return this.loadContentsHandler()
  },

  // created() {
  //   this.$nuxt.$on(EVENTS.CONTENT_UPDATED, this.reloadContentHandler)
  // },
  //
  // destroyed() {
  //   this.$nuxt.$off(EVENTS.CONTENT_UPDATED, this.reloadContentHandler)
  // },

  methods: {
    onUpdate(){
      return this.reloadContentHandler()
    },

    getContentUrl(){
      return `/api/moderationitems${this.query}`
    },

    changeTypeHandler(modItem){
      return modItem.currentObject === null
        ? "NEW"
        : modItem.targetObject === null ? "DELETE"
          : modItem.targetObject.state === VERSION_STATE.LIVE ? "MIGRATION"
            : "CHANGE"
    },

    changeTypeColorHandler(modItem){
      return modItem.currentObject === null
        ? 'green--text'
        : modItem.targetObject === null ? 'red--text'
          : modItem.targetObject.state === VERSION_STATE.LIVE ? 'orange--text'
            : 'orange--text'
    },

    // parseContentHandler(content){
    //   const {moderationItems, targets} = content
    //   console.log('moderation????: ',content)
    //   this.content = moderationItems.map(x => ({
    //     ...x,
    //     targetObject: targets.find(t=>t.id === x.target)
    //   }))
    // }
  },
}
</script>

<style scoped>

</style>
