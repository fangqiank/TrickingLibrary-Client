<template>
    <!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
    <ItemLayout>
        <template v-slot:content>
            <TrickList :tricks='tricks' class="mx-2"/>
        </template>
        <template v-slot:item>
            <div v-if="category">
                <div class="text-h6 text-center">
                    {{category.name}}
                </div>
                <v-divider class="my-1"></v-divider>
                <div class="text-body-2">
                    {{category.description}}
                </div>
            </div>
        </template>
    </ItemLayout>
</template>

<script>
    import {mapState} from 'vuex'
    import https from 'https'
    import TrickList from '../../components/content-creation/TrickList.vue'
    import ItemLayout from '../../components/ItemLayout.vue'

    const agent = new https.Agent({
        rejectUnauthorized: false
    })

    export default {
        components:{TrickList,ItemLayout},

        data:()=>(
            {
                category:null,
                tricks:[],
            }
        ),

        computed:{
          ...mapState('tricks',['dictionaries'])
        },

            // filteredTricks(){
            //     if(!this.filter)
            //         return null

            //     const searchItem = this.filter.trim().toLowerCase()

            //     return this.tricks.filter(x=>x.name.toLowerCase().includes(searchItem) ||
            //     x.description.toLowerCase().includes(searchItem))
            // }

        async fetch(){
            //console.log(this.$route.params.category)

            const categoryId = this.$route.params.category

            this.category = this.dictionaries.categories[categoryId]

            this.tricks = await this.$axios.$get(`/api/categories/${categoryId}/tricks`
            ,{httpsAgent: agent })
        },

        head() {
            if(!this.category)
                return {}

            //console.log(this.category)
            return {
                title: this.category.name,
                meta: [
                // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                    {
                        hid: 'description',
                        name: 'description',
                        content: this.category.description
                    }
                ]
            }

        }
    }
</script>

<style>

</style>
