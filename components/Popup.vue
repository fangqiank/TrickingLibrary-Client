﻿<template>
<v-snackbar timeout="3000" :value="message">
  <v-icon :color="popupConfig.color">
    {{popupConfig.icon}}
  </v-icon>
  {{message}}
</v-snackbar>
</template>

<script>
import {mapState} from "vuex";
import {POPUP_TYPES} from "@/store/popup";

export default {
  name: "Popup",

  computed:{
    ...mapState('popup',['message','type']),

    popupConfig(){
      if(this.type === POPUP_TYPES.ERROR){
        return {
          icon: 'mdi-alert-circle',
          color:'red'
        }
      }

      if(this.type === POPUP_TYPES.SUCCESS){
        return {
          icon: 'mdi-check',
          color:'green'
        }
      }

      return {icon: '', color: ''}
    }
  }
}
</script>

<style scoped>

</style>
