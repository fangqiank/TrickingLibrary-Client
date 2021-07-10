<template>
    <!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
  <div>
    <div v-if="category">
      <div class="text-h6 text-center">{{category.name}}</div>
      <v-divider class="my-1" />
      <div class="text-body-2">{{category.description}}</div>
    </div>
    <v-divider class="my-1"/>
    <TrickList :tricks='tricks' class="mx-2"/>
  </div>
</template>

<script>
    import {mapState} from 'vuex'
    import TrickList from '@/components/content-creation/TrickList'

    export default {
        components:{TrickList},

        computed:{
          ...mapState('tricks',['dictionaries','lists']),

          tricks(){
            const categorySlug =this.$route.params.category
            const categoryId =this.dictionaries.categories[categorySlug].id
            //console.log('_category.categoryId',categoryId)
            return this.lists.tricks.filter(x => x.categories.indexOf(categoryId) > -1)
            // return this.dictionaries.categories[categorySlug]
            //   .tricks.map(x=>this.dictionaries.tricks[x])

          },

          category(){
            const categorySlug =this.$route.params.category
            return this.dictionaries.categories[categorySlug]
          }
        },

        // filteredTricks(){
        //     if(!this.filter)
        //         return null

        //     const searchItem = this.filter.trim().toLowerCase()

        //     return this.tricks.filter(x=>x.name.toLowerCase().includes(searchItem) ||
        //     x.description.toLowerCase().includes(searchItem))
        // }

        // async fetch(){
        //     //console.log(this.$route.params.category)
        //     this.tricks = await this.$axios.$get(`/api/categories/${categoryid}/tricks`
        //     ,{httpsAgent: agent() })
        // },

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
