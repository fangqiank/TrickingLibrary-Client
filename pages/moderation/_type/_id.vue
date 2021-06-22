<template>
  <div>
    <div v-if="item">
      {{ item.description }}
    </div>
  </div>
</template>

<script>
const endpointResolever = (type) => {
  if (type === "trick") {
    return "tricks";
  }
};

export default {
  data: () => ({
    item: null,
  }),

  methods: {
    async fetchData() {
      //console.log("_id: ", this.$route.params);
      const { type, id } = this.$route.params;
      const endpoint = endpointResolever(type);
      this.item = await this.$axios.$get(`/api/${endpoint}/${id}`);
    },
  },

  mounted() {
    this.fetchData();
  },
};
</script>

<style>
</style>