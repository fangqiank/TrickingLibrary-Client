<template>
    <!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
    <ItemLayout>
        <template v-slot:content>
            <TrickList :tricks='tricks' class="mx-2"/>
        </template>

        <template v-slot:item>
            <div v-if="difficulty">
                <div class="text-h6 text-center">
                    {{difficulty.name}}
                </div>
                <v-divider class="my-1"></v-divider>
                <div class="text-body-2">
                    {{difficulty.description}}
                </div>
            </div>
        </template>
    </ItemLayout>
</template>

<script>
import {mapState} from 'vuex'
    // import trickList from '../../mixins/trickList'
    import TrickList from '../../components/content-creation/TrickList.vue'
    import ItemLayout from '../../components/ItemLayout.vue'
    import https from 'https'

    const agent = new https.Agent({
        rejectUnauthorized: false
    })

    export default {
        //mixins:[trickList],
        components:{TrickList,ItemLayout},

        data:()=>(
            {
                difficulty:null,
                tricks:[],
            }
        ),

        computed:mapState('tricks',['dictionaries']),

        async fetch(){
            //console.log(this.$route.params.category)

            const difficultyId = this.$route.params.difficulty

            this.difficulty = this.dictionaries.difficulties[difficultyId]

            this.tricks = await this.$axios.$get(`/api/difficulties/${difficultyId}/tricks`
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
