import {mapActions, mapState} from 'vuex'

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
      this.setup(this.form)
    },

    computed:{
      ...mapState("contentUpdate", ["setup"]),
    }
  }
)

