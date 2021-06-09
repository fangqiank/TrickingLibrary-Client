<template>
  <div>
      <div v-if="tricks">
        <div v-for="item in tricks" :key=item.Id>
          {{item.id}}--{{item.name}}
        </div>
      </div>  

      <div v-if="submissions">
        <div v-for="item in submissions" :key=item.Id>
          {{item.id}}--{{item.description}}--{{item.trickId}}
          <div>
            <video controls
                   :src='`https://localhost:5001/api/videos/${item.video}`'
                   width="300"
                   height="200"
            ></video>
          </div>
        </div>
      </div>  
  </div>
</template>

<script>
// import Logo from '~/components/Logo.vue'
// import VuetifyLogo from '~/components/VuetifyLogo.vue'
import {mapState} from 'vuex';

export default {
  components: {
    // Logo,
    // VuetifyLogo
  },

  computed:{
    ...mapState('tricks',['tricks']),
    ...mapState('submissions',['submissions']),
  },
}
</script>
