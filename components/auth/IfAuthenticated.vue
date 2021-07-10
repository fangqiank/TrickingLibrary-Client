<template>
<div>
<!--  <v-skeleton-loader-->
<!--    v-if="loading"-->
<!--    :loading = "loading"-->
<!--    transition="fade-transition"-->
<!--    type="button"-->
<!--  >-->
    <slot
      v-if="authenticated"
      name="allowed"
      :moderator="moderator"
      :admin="admin"
    ></slot>
<!--  </v-skeleton-loader>-->

  <slot
    v-else
    name="forbidden"
    :login="loginHandler"
  ></slot>
</div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "IfAuthenticated",

  computed:{
    //...mapState('auth',['loading']),
    ...mapGetters('auth',['authenticated', 'moderator', 'admin']),
  },

  methods: {
    ...mapActions('auth', ['loginHandler'])
  },
}
</script>

<style scoped>

</style>
