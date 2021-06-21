import {mapActions} from 'vuex'

export const close = {
    methods:{
        ...mapActions('videos',['cancelUpload']),
        close(){
            this.cancelUpload()
        }
    }
}

