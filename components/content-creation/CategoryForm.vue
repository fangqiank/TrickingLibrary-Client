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
        <v-form ref="form" v-model="validation.valid">
          <v-text-field
            label="Name"
            :rules="validation.name"
            v-model='form.name'
          />
          <v-text-field
            label="Description"
            :rules="validation.description"
            v-model='form.description'
          />
        </v-form>
      </v-card-text>

      <v-card-actions class="d-flex justify-center">
        <v-btn
          @click='$refs.form.validate() ? handleSave() : 0'
          color="lime darken-4"
        >
          Create
        </v-btn>
      </v-card-actions>
  </v-card>
</template>

<script>
import {mapState} from 'vuex'
import {close} from './_shared'

export default {
  name:'CategoryForm',

  data:() =>(
      {
          form: {
              name:'',
              description:'',
          },

        validation:{
          valid: false,
          name: [v => !!v || 'Name is required'],
          description: [v => !!v || 'Description is required'],
        },
      }
  ),

  mixins:[close],

  created() {
      if(this.editPayload){
        const {id, name, description} = this.editPayload

        Object.assign(this.form,{id, name, description})
      }
  },

  computed:{
    //...mapGetters('tricks',['categoryItems','difficultyItems']),

    ...mapState('contentUpdate',['editPayload'])
  },

  methods:{
      handleSave(){
        if(this.form.id){
          this.$axios.$put('/api/categories', this.form)
        }else{
          this.$axios.$post('/api/categories', this.form)
        }

        this.close()
      }
  }

}

</script>

<style>

</style>
