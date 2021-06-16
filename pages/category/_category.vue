<template>
    <!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->

    <div class='d-flex mt-3 justify-center align-start'>
        <div class="mx-2">
            <v-text-field label="Search" 
             v-model="filter"
             outlined
             prepend-inner-icon="mdi-magnify"
             >
             </v-text-field>
            <div v-for="item in filteredTricks" :key=item.id>
                <p>
                    Trick Name: <span style="color:red"><strong>{{item.name}}</strong></span>
                </p>
            </div>
        </div>

        <v-sheet class="pa-3 mt-2" v-if="category">
            <div class="text-h6 text-center">
                {{this.category.name}}
            </div>
            <v-divider class="my-1"></v-divider>
            <div class="text-body-2">
                {{this.category.description}}
            </div>
        </v-sheet>
    </div>  
</template>

<script>
    import {mapGetters} from 'vuex'
    import https from 'https'

    const agent = new https.Agent({  
        rejectUnauthorized: false
    })

    export default {
        data:()=>(
            {
                category:null,
                tricks:[],
                filter:'',
            }
        ),

        computed:{
            ...mapGetters('tricks',['categoryById']),

            filteredTricks(){
                if(!this.filter) 
                    return null
                    
                const searchItem = this.filter.trim().toLowerCase()

                return this.tricks.filter(x=>x.name.toLowerCase().includes(searchItem) ||
                x.description.toLowerCase().includes(searchItem))
            }
        },

        async fetch(){
            //console.log(this.$route.params.category)

            const categoryId = this.$route.params.category

            this.category = this.categoryById(categoryId)

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