import {mapActions, mapState} from 'vuex'

export const close = {
    methods:{
        ...mapActions('videos',['cancelUpload']),
        close(){
            this.cancelUpload()
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
      ...mapState("videos", ["setup"]),
    }
  }
)

