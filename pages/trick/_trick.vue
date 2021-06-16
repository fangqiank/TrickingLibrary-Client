<template>
    <!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->

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

        <div class="mx-2">
            <v-sheet class="pa-3 mt-2">
                <div class="text-h6 text-center">
                    {{getOneTrick.name}}
                </div>
                <v-alert
                  outlined
                  color="purple"
                >
                    <div>Description: <strong style="color:#fff">{{getOneTrick.description}}</strong></div>
                    <div>Difficulty: <strong style="color:#fff">{{getOneTrick.difficulty}}</strong></div>
                </v-alert>
                <div v-for="(rd,index) in getRelatedData" :key="index" v-if="rd.data.length > 0">
                    {{rd.title}}:
                    <v-chip-group>
                        <!-- {{rd.title}} -->
                        <v-chip v-for="(c,index) in rd.data" 
                                :key="index" 
                                small 
                                class="ma-2"
                                color="primary"
                                :to="rd.routeFactory(c)">
                            {{c.name}}
                        </v-chip>
                    </v-chip-group>
                </div>
            </v-sheet>
        </div>
    </div>  
</template>

<script>
    import {mapState,mapGetters} from 'vuex'

    export default {
        computed:{
            ...mapState('submissions',['submissions']),
            ...mapState('tricks',['categories','tricks']),
            ...mapGetters('tricks',['trickById']),

            getOneTrick() {
                return this.trickById(this.$route.params.trick)
            },

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
                        data:this.categories.filter(x=> this.getOneTrick.categories.indexOf(x.name) >= 0),
                        idFactory: c => `category-${c.id}`,
                        routeFactory :c => '/'
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

            await this.$store.dispatch('submissions/fetchSubmissionsForTrick',{trickId},{root:true})
        },

        head() {
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