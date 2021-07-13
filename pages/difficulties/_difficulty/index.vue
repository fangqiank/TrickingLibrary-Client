<template>
    <!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
  <div>
    <div>
<!--      <span>{{difficulty}}</span>-->
      <div class="text-h6 text-center">{{difficulty.name}}</div>
      <v-divider class="my-1" />
      <div class="text-body-2">{{difficulty.description}}</div>
    </div>
    <v-divider class="my-1"/>
    <TrickList :tricks='tricks' class="mx-2"/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
    import TrickList from '@/components/content-creation/TrickList.vue'

    export default {
        //mixins:[trickList],
        components:{TrickList},

        computed:{
          ...mapState('tricks',['dictionaries','lists']),

          tricks(){
            const difficultySlug =this.$route.params.difficulty
            const difficultyId =this.dictionaries.difficulties[difficultySlug].id
            //console.log(difficultyId)
            return this.lists.tricks.filter(x => x.difficulty === difficultyId)
          },

          difficulty(){
            const difficultyId =this.$route.params.difficulty
            return this.dictionaries.difficulties[difficultyId]
          }
        },

        // async fetch(){
        //     //console.log(this.$route.params.category)
        //
        //     const difficultyId = this.$route.params.difficulty
        //
        //     this.difficulty = this.dictionaries.difficulties[difficultyId]
        //
        //     this.tricks = await this.$axios.$get(`/api/difficulties/${difficultyId}/tricks`
        //     ,{httpsAgent: agent })
        // },

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
