<template>
  <div v-if="items">
    <v-btn
      :to="`/moderation/${item.id}`"
      v-for="(item, index) in items"
      :key="index"
    >
      {{ item.target}}
    </v-btn>
  </div>
</template>

<script>
import https from "https";

const agent = new https.Agent({
  rejectUnauthorized: false,
});

export default {
  data: () => ({
    items: [],
  }),

  methods: {
    async fetchData() {
      //console.log(123);
      this.items = await this.$axios.$get("/api/moderationitems", {
        httpsAgent: agent,
      });
    },
  },

  mounted() {
    this.fetchData();
  },
};
</script>

<style>
</style>
