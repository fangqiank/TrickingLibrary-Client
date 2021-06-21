<template>
    <!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
    <ItemLayout>
        <template v-slot:content>
            <div v-if="submissions" class="mx-3">
                <v-card v-for="item in submissions" :key=item.Id class="mb-3">
                    <VideoPlayer :video="item.video"/>
                    <v-card-text>{{item.description}}</v-card-text>
                </v-card>
            </div>
        </template>

        <template v-slot:item>
            <!-- <v-sheet class="pa-3 sticky"> -->
            <div class="text-h6 text-center">
                {{getOneTrick.name}}
            </div>
            <v-alert
                outlined
                color="purple"
            >
                <div>Description: <strong style="color:#fff">{{getOneTrick.description}}</strong></div>
                <div>Difficulty: 
                    <v-chip color="secondary" :to="`/difficulty/${difficulty.id}`">
                        {{difficulty.name}}
                    </v-chip>
                </div>
            </v-alert>
            <div v-for="(rd,index) in getRelatedData" :key="index" v-if="rd.data.length > 0">
                {{rd.title}}:
                <v-chip-group>
                    <!-- {{rd.title}} -->
                    <v-chip v-for="(c,index) in rd.data" 
                            :key="index" 
                            x-small 
                            class="ma-2"
                            color="primary"
                            :to="rd.routeFactory(c)">
                        {{c.name}}
                    </v-chip>
                </v-chip-group>
            </div>
            <!-- </v-sheet> -->
        </template>
    </ItemLayout>
</template>

<script>
    import {mapState,mapGetters} from 'vuex'
    import VideoPlayer from '../../components/content-creation/VideoPlayer.vue'
    import ItemLayout from '../../components/ItemLayout.vue'

    export default {
        data: () =>(
            {
                getOneTrick:null,
                difficulty:null
            }
        ),

        components:{
            VideoPlayer,
            ItemLayout
        },

        computed:{
            ...mapState('submissions',['submissions']),
            ...mapState('tricks',['categories','tricks']),
            ...mapGetters('tricks',['trickById','difficultyById']),

            // getOneTrick() {
            //     return 
            // },

            getTrickCategories(){
                //console.log(this.getOneTrick.categories)
                return this.categories.filter(x=>
                    this.getOneTrick.categories.indexOf(x.name) >= 0
                )
            },

            getRelatedData(){
                //console.log(this.getOneTrick.progressions)
                return [
                    {
                        title:"Categories", 
                        data:this.categories.filter(x=> this.getOneTrick.categories.indexOf(x.id) >= 0),
                        idFactory: c => `category-${c.id}`,
                        routeFactory :c => `/category/${c.id}`
                    },
                    {
                        title:"Prerequisites", 
                        data:this.tricks.filter(x=> this.getOneTrick.prerequisites.indexOf(x.id) >= 0),
                        idFactory: c => `trick-${c.id}`,
                        routeFactory :c => `/trick/${c.id}`
                    },
                    {
                        title:"Progressions", 
                        data:this.tricks.filter(x=> this.getOneTrick.progressions.indexOf(x.id) >= 0),
                        idFactory: c => `trick-${c.id}`,
                        routeFactory :c => `/trick/${c.id}`
                    },
                ]
            },
        },

        async fetch(){
            //console.log(this.$route.params.trick)

            const trickId = this.$route.params.trick

            this.getOneTrick = this.trickById(this.$route.params.trick)

            this.difficulty = this.difficultyById(this.getOneTrick.difficulty)

            await this.$store.dispatch('submissions/fetchSubmissionsForTrick',{trickId},{root:true})
        },

        head() {
            if(!this.getOneTrick) 
                return {}

            return {
                title: this.getOneTrick.name,
                meta: [
                // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                    {
                        hid: 'description',
                        name: 'description',
                        content: this.getOneTrick.description 
                    }
                ]
            }
        }
        
    }
</script>

<style>

</style>