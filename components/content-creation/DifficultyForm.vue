<template>
  <v-card>
      <v-card-title class="white--text">
          Create Difficulty
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
    const initState = () =>(
        {
            form: {
                name:'',
                description:'',
            },
        }
    )

    export default {
        name:'DifficultyForm',

        data:initState,

        methods:{
            handleSave(){
                this.$axios.$post('/api/difficulty', this.form)
            }
        }

    }
</script>

<style>

</style>