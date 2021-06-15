<template>
  <v-card>
      <v-card-title class="white--text">
          Create Category
      </v-card-title>

      <v-card-text>
          <v-text-field label="Name" v-model='form.name'></v-text-field>
          <v-text-field label="Description" v-model='form.description'></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-btn @click='handleSave'>Save</v-btn>
      </v-card-actions>
  </v-card>
</template>

<script>
import {mapGetters} from 'vuex'

const initState = () =>(
    {
        form: {
            name:'',
            description:'',
        },
    }
)

export default {
    name:'CategoryForm',

    data:initState,

    computed:mapGetters('tricks',['categoryItems','difficultyItems']),

    methods:{
        handleSave(){
            this.$axios.$post('/api/categories', this.form)
        }
    }

}

</script>

<style>

</style>