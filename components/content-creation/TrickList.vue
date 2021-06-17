<template>
    <div>
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
    </div>
</template>

<script>
export default {
    name:"TrickList",

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
                return null
                
            const searchItem = this.filter.trim().toLowerCase()
    
            return this.tricks.filter(x=>x.name.toLowerCase().includes(searchItem) ||
            x.description.toLowerCase().includes(searchItem))
        }
    }
}
</script>

<style>

</style>