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
            :disabled="!!editPayload"
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
          {{ !!editPayload ? 'Update' : 'Create'  }}
        </v-btn>
      </v-card-actions>
  </v-card>
</template>

<script>
import {mapState} from 'vuex'
import {close, formPLus} from '@/components/content-creation/_shared'
import {VERSION_STATE} from "@/components/moderation";

export default {
  name:'CategoryForm',

  data:() =>(
      {
        validation:{
          valid: false,
          name: [v => !!v || 'Name is required'],
          description: [v => !!v || 'Description is required'],
        },

        staged: false
      }
  ),

  mixins:[close,formPLus(()=>(
    {
      name:'',
      description:'',
    }
  ))],

  created() {
      if(this.editPayload){
        const {id, name, description,state} = this.editPayload

        Object.assign(this.form,{id, name, description})

        if(state)
          this.staged = state === VERSION_STATE.STAGED
      }
  },

  computed:{
    //...mapGetters('tricks',['categoryItems','difficultyItems']),

    ...mapState('contentUpdate',['editPayload'])
  },

  methods:{
      async handleSave(){
        if(this.form.id){
          if(this.staged){
            await this.$axios.$put('/api/categories/staged', this.form)
          }else{
            await this.$axios.$put('/api/categories', this.form)
          }
        }else{
          await this.$axios.$post('/api/categories', this.form)
        }

        this.notifyChangesHandler()

        this.close()
      }
  }

}

</script>

<style>

</style>
