import {EVENTS} from "@/data/events";

export  const onContentUpdated = {
  created() {
    this.$nuxt.$on(EVENTS.CONTENT_UPDATED, this.onUpdate)
  },

  destroyed() {
    this.$nuxt.$off(EVENTS.CONTENT_UPDATED, this.onUpdate)
  },

  methods:{
    onUpdate(){

    }
  }
}
