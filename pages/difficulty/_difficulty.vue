<template>
    <!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->

    <div class='d-flex mt-3 justify-center align-start'>
        <TrickList :tricks='tricks' class="mx-2"/>
        <!-- <div class="mx-2">
            <v-text-field label="Search" 
             v-model="filter"
             outlined
             prepend-inner-icon="mdi-magnify"
             >
             </v-text-field>
            <div v-for="item in filteredTricks" :key=item.id>
                <p>
                    Trick Name: <span style="color:blue"><strong>{{item.name}}</strong></span>
                </p>
            </div>
        </div> -->

        <v-sheet class="pa-3 mt-2" v-if="difficulty">
            <div class="text-h6 text-center">
                {{difficulty.name}}
            </div>
            <v-divider class="my-1"></v-divider>
            <div class="text-body-2">
                {{difficulty.description}}
            </div>
        </v-sheet>
    </div>  
</template>

<script>
    import {mapGetters} from 'vuex'
    // import trickList from '../../mixins/trickList'
    import TrickList from '../../components/content-creation/TrickList.vue'
    import https from 'https'

    const agent = new https.Agent({  
        rejectUnauthorized: false
    })

    export default {
        //mixins:[trickList],
        components:{TrickList},
         
        data:()=>(
            {
                difficulty:null,
                tricks:[],
            }
        ),

        computed:mapGetters('tricks',['difficultyById']),

        async fetch(){
            //console.log(this.$route.params.category)

            const difficultyId = this.$route.params.difficulty

            this.difficulty = this.difficultyById(difficultyId)

            this.tricks = await this.$axios.$get(`/api/difficulty/${difficultyId}/tricks`
            ,{httpsAgent: agent })
        },

        head() {
            if(!this.difficulty) 
                return {}

            //console.log(this.category)
            return {
                title: this.difficulty.name,
                meta: [
                // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                    {
                        hid: 'description',
                        name: 'description',
                        content: this.difficulty.description 
                    }
                ]
            }

        }
    }
</script>

<style>

</style>