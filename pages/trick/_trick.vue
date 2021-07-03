<template>
    <!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
    <ItemLayout>
        <template v-slot:content>
<!--            <div v-if="submissions" class="mx-3">-->
          <SubmissionFeed :loadSubmissions = "loadSubmissionsHandler"/>
<!--            </div>-->
        </template>

        <template v-slot:item="{close}">
           <TrickInfoCard :trick="getOneTrick" :close="close"/>
            <!-- <v-sheet class="pa-3 sticky"> -->
<!--            <div class="text-h6 text-center">-->
<!--                {{getOneTrick.name}}-->
<!--            </div>-->
<!--            <v-alert-->
<!--                outlined-->
<!--                color="purple"-->
<!--            >-->
<!--                <div>Description: <strong style="color:#fff">{{getOneTrick.description}}</strong></div>-->
<!--                <div>Difficulty:-->
<!--                    <v-chip color="secondary" :to="`/difficulty/${difficulty.slug}`">-->
<!--                        {{difficulty.name}}-->
<!--                    </v-chip>-->
<!--                </div>-->
<!--            </v-alert>-->
<!--            <div v-for="(rd,index) in getRelatedData" :key="index" v-if="rd.data.length > 0">-->
<!--                {{rd.title}}:-->
<!--                <v-chip-group>-->
<!--                    &lt;!&ndash; {{rd.title}} &ndash;&gt;-->
<!--                    <v-chip v-for="(c,index) in rd.data"-->
<!--                            :key="index"-->
<!--                            x-small-->
<!--                            class="ma-2"-->
<!--                            color="primary"-->
<!--                            :to="rd.routeFactory(c)">-->
<!--                        {{c.name}}-->
<!--                    </v-chip>-->
<!--                </v-chip-group>-->
<!--            </div>-->
<!--            &lt;!&ndash; </v-sheet> &ndash;&gt;-->
<!--          <v-divider class="my-2"></v-divider>-->
<!--          <div>-->
<!--            <v-btn-->
<!--                   outlined-->
<!--                   small-->
<!--                   @click="editHandler();close()"-->
<!--            >-->
<!--              Edit-->
<!--            </v-btn>-->
<!--          </div>-->
        </template>
    </ItemLayout>
</template>

<script>
    import {mapState} from 'vuex'
    import ItemLayout from '@/components/ItemLayout.vue'
    import TrickSteps from "@/components/content-creation/TrickSteps"
    import Submission from "@/components/Submission";
    import TrickInfoCard from "@/components/TrickInfoCard";
    import https from 'https'
    import SubmissionFeed from "@/components/SubmissionFeed";

    const agent = new https.Agent({
      rejectUnauthorized: false
    })

    export default {
        data: () =>(
            {
                //getOneTrick:null,
                //difficulty:null
            }
        ),

      methods:{
        // ...mapMutations('videos',['activate']),
        // editHandler(){
        //   this.activate(
        //     {
        //       component:TrickSteps,
        //       edit: true,
        //       editPayload:this.getOneTrick
        //     }
        //   )
        // }
        loadSubmissionsHandler(query){
          //console.log(query)
          return this.$axios.$get(`/api/tricks/${this.getOneTrick.slug}/submissions${query}`,{httpsAgent: agent })
        }
      },

      components:{
        SubmissionFeed,
        TrickInfoCard,
        Submission,
        ItemLayout,
        TrickSteps,
      },

      computed:{
          //...mapState('submissions',['submissions']),
          ...mapState('tricks',['dictionaries']),

        getOneTrick(){
            return this.dictionaries.tricks[this.$route.params.trick]
          }
      //
      //     //...mapGetters('tricks',['trickById','difficultyById']),
      //
      //     // getOneTrick() {
      //     //     return
      //     // },
      //
      //     getTrickCategories(){
      //         //console.log(this.getOneTrick.categories)
      //         return this.categories.filter(x=>
      //             this.getOneTrick.categories.indexOf(x.name) >= 0
      //         )
      //     },
      //
      //     getRelatedData(){
      //         //console.log(this.getOneTrick.progressions)
      //         return [
      //             {
      //                 title: "Categories",
      //                 data: this.getOneTrick.categories.map(x=> this.dictionaries.categories[x]),
      //                 idFactory: c => `category-${c.id}`,
      //                 routeFactory: c => `/category/${c.id}`
      //             },
      //             {
      //                 title: "Prerequisites",
      //                 data: this.getOneTrick.prerequisites.map(x=> this.dictionaries.tricks[x]),
      //                 idFactory: c => `trick-${c.id}`,
      //                 routeFactory: c => `/trick/${c.slug}`
      //             },
      //             {
      //                 title: "Progressions",
      //                 data: this.getOneTrick.progressions.map(x=> this.dictionaries.tricks[x]),
      //                 idFactory: c => `trick-${c.id}`,
      //                 routeFactory :c => `/trick/${c.slug}`
      //             },
      //         ]
      //     },

      },

      //async fetch(){
          //console.log(this.$route.params.trick)

          //this.getOneTrick =

          //this.difficulty = this.dictionaries.difficulties[this.getOneTrick.difficulty]

          //await this.$store.dispatch('submissions/fetchSubmissionsForTrick',{trickId: trickSlug},{root:true})

      //},

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
