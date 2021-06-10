<template>
    <div class='d-flex justify-center'>
        <div v-if="submissions">
            <div v-for="item in submissions" :key=item.Id>
            <p>Submission Id: <span style="color:red"><strong style="font">{{item.id}}</strong></span></p>
            <p>Trick Id: <span style="color:red"><strong>{{item.trickId}}</strong></span></p>
            <div>
                <video controls
                    :src='`https://localhost:5001/api/videos/${item.video}`'
                    width="300"
                    height="200"
                ></video>
            </div>
            </div>
        </div>

        <!-- <div>
            Trick:{{$route.params.trick}}
        </div> -->
    </div>  
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        computed:mapState('submissions',['submissions']),

        async fetch(){
            const trickId = this.$route.params.trick 

            await this.$store.dispatch('submissions/fetchSubmissionsForTrick',{trickId},{root:true})
        }
    }
</script>

<style>

</style>