<template>
<div>
  <div>
    <v-text-field label="Email" :disabled="loading" v-model="email">
      <template  slot="append-outer">
        <v-btn
          color="primary"
          :disabled="loading"
          :loading="loading"
          @click="sendInviteHandler"
        >
          Invite
        </v-btn>
      </template>
    </v-text-field>
  </div>
  <v-list>
    <v-list-item v-for="(moderator,idx) in moderators" :key="idx">
      <v-list-item-content>
        <v-list-item-title>{{moderator.email}}</v-list-item-title>
        <v-list-item-subtitle>{{moderator.id}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</div>
</template>

<script>
import agent from "@/store/httpsAgent";

export default {
  data:() =>({
    moderators: [],
    email: '',
    loading: false
  }),

  fetch() {
    return this.$axios.$get(`/api/admin/moderators`,{httpsAgent: agent()})
      .then(moderators => this.moderators = moderators)
  },

  middleware:['admin'],

  methods:{
    sendInviteHandler(){
      if(this.loading)
        return

      const body = {
        email: this.email,
        returnUrl : location.origin
      }

      this.loading = true
      return this.$axios.$post(`/api/admin/moderators`, body)
      .then(() => {
        this.email = ''
        this.loading = false
      })
        .finally(this.$fetch)

    }
  }
}
</script>

<style scoped>

</style>
