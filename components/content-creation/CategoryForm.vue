<template>
  <v-card>
      <v-card-title class="white--text">
          Create Category
          <v-spacer/>
          <v-btn icon @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
      </v-card-title>

      <v-card-text>
          <v-text-field label="Name" v-model='form.name'></v-text-field>
          <v-text-field label="Description" v-model='form.description'></v-text-field>
      </v-card-text>

      <v-card-actions class="d-flex justify-center">
        <v-btn @click='handleSave'>Save</v-btn>
      </v-card-actions>
  </v-card>
</template>

<script>
import {mapGetters} from 'vuex'
import {close} from './_shared'

export default {
    name:'CategoryForm',

    data:() =>(
        {
            form: {
                name:'',
                description:'',
            },
        }
    ),

    mixins:[close],

    computed:mapGetters('tricks',['categoryItems','difficultyItems']),

    methods:{
        handleSave(){
            this.$axios.$post('/api/categories', this.form)
            this.close()
        }
    }

}

</script>

<style>

</style>