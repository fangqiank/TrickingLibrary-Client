<template>
  <div>
      <div v-if="tricks">
        <div v-for="item in tricks" :key=item.Id>
          <v-btn :to="`trick/${item.id}`">{{item.name}}</v-btn>
        </div>
      </div>  
  </div>
</template>

<script>

import {mapState} from 'vuex';

export default {
  components: {
    
  },

  computed:mapState('tricks',['tricks']),
  //...mapState('submissions',['submissions']),

  async fetch(){
     await this.$store.dispatch('tricks/fetchTricks',null,{root:true})
  }
}
</script>
