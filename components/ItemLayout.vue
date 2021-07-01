<template>
  <div>
    <v-row>
        <v-col cols="12" sm="7"
                lg="6" offset-lg="1"
                xl="4" offset-xl="3"
        >
            <slot name="content"/>
        </v-col>

        <v-col class="d-none d-sm-block" sm="5" lg="4" xl="3">
            <v-sheet class="pa-3 sticky">
                <slot name="item" :close="()=>{}"/>
            </v-sheet>
        </v-col>
    </v-row>
    <v-dialog v-model="dialog">
        <template v-slot:activator="{on}">
            <v-btn
             fixed fab bottonm right
             color="red"
             small
             v-on="on"
             class="d-sm-none"
            >
                <v-icon>mdi-help</v-icon>
            </v-btn>
        </template>
        <v-sheet class="pa-2" rounded="">
            <slot name="item" :close="()=>dialog=false"/>
        </v-sheet>
    </v-dialog>
  </div>
</template>

<script>
export default {
    name:"ItemLayout",

    data:()=>(
        {
            dialog:false
        }
    ),
}
</script>

<style>

</style>
