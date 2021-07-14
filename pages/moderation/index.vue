<template>

  <v-card color="basil">
    <v-toolbar>
      <v-tabs
        v-model="tab"
        background-color="transparent"
        color="basil"
        grow
      >
        <v-tab
          v-for="(item,idx) in tabs"
          :key="idx"
        >
          {{ item.title }}
        </v-tab>
      </v-tabs>
    </v-toolbar>


    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="(item,idx) in tabs"
        :key="idx"
      >
        <component :is="item.component"/>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
//import agent from "@/store/httpsAgent";
import ModerationItemFeed from '@/components/moderation/ModerationItemFeed'
import ModerationCategoryOverview from '@/components/moderation/ModerationCategoryOverview'
import ModerationDifficultyOverview from '@/components/moderation/ModerationDifficultyOverview'

export default {
  data:() => (
    {
      tab: 0,
      tabs: [
        {
          title: 'Moderation',
          component : ModerationItemFeed
        },
        {
          title: 'Categories',
          component : ModerationCategoryOverview
        },
        {
          title: 'Difficulties',
          component : ModerationDifficultyOverview
        },
      ]
    }
  ),

  middleware:['mod'],

};
</script>

<style>
</style>
