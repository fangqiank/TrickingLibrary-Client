<template>
    <div>
        <v-text-field label="Search"
            v-model="filter"
            outlined
            prepend-inner-icon="mdi-magnify"
        />
      <v-row>
        <v-col lg="3" v-for="(item, idx) in filteredTricks"  :key="idx">
          <TrickInfoCard :trick="item"/>
        </v-col>
      </v-row>
    </div>
</template>

<script>
import TrickInfoCard from '@/components/TrickInfoCard'
import {hasOccurrence} from "@/data/functions";
export default {
    name:"TrickList",

    components:{TrickInfoCard},

    props:{
        tricks:{
            required:true,
            type:Array
        }
    },

    data:()=>(
            {
                filter:'',
            }
    ),

    computed:{
        filteredTricks(){
            if(!this.filter)
                return this.tricks

            return this.tricks.filter(x=>{
              let searchIndex = (x.name + x.description).toLowerCase()

              return hasOccurrence(searchIndex, this.filter)
            })
        }
    }
}
</script>

<style>

</style>
