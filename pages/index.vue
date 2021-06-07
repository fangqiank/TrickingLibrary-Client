<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center">
        <logo />
        <vuetify-logo />
      </div>
      
      <div v-if="tricks">
        <p v-for="item in tricks" :key=item.Id>
          {{item.name}}
        </p>
      </div>  

      <div>
        <v-text-field label='Trick Name' v-model='trickName'></v-text-field>
        <v-btn @click="saveTrick">Save</v-btn>
      </div>

      {{message}}
      <v-btn @click="reset">Reset Message</v-btn>
      <v-btn @click="resetTricks">Reset Tricks</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

import {mapState,mapActions,mapMutations} from 'vuex';

export default {
  components: {
    Logo,
    VuetifyLogo
  },

  data() {
      return {
        trickName:''
      }
    },

  computed:{
    ...mapState({
      message: state => state.message
    }),

    ...mapState('tricks',{
      tricks: state => state.tricks
    }),
  },

  methods:{
    ...mapMutations(
      ['reset']
    ),

    ...mapMutations('tricks',{
      resetTricks:'reset'
    }),

    ...mapActions('tricks',['createTrick']),
      async saveTrick(){
        await this.createTrick({trick:{name:this.trickName}})
        this.trickName = ''
      }
    
  }
    
  // async asyncData({ $axios }) {
  //   const data = await $axios.$get('https://localhost:5001/api/tricks',{ 
  //     httpsAgent: agent })
  //   return {message:data}
  // }

  // async fetch(){
  //   await this.$store.dispatch('fetchMessage')
  // }
}
</script>
