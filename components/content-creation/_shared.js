import {mapActions, mapState} from 'vuex'
import {EVENTS} from "@/data/events";

export const close = {
    methods:{
        ...mapActions('contentUpdate',['cancelUpload']),

        close(hard=true){
          return this.cancelUpload({hard: true})
        }
    }
}

export const formPLus = (formFactory) => (
  {
    data:() => (
      {
        form: formFactory()
      }
    ),

    created() {
      if(this.setup)
        this.setup(this.form)
    },

    computed:{
      ...mapState("contentUpdate", ["setup"]),
    },

    methods: {
      ...mapActions('tricks',['loadContents']),

      notifyChangesHandler(){
        this.$nuxt.$emit(EVENTS.CONTENT_UPDATED)
        this.loadContents()
      }
    }
  }
)

