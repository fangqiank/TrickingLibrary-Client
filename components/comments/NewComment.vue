<template>
  <div>
    <span v-html="comment.htmlContent"></span>
  </div>
</template>

<script>
export default {
  name:'NewComment',

  props:{
      comment:{
          required:true,
          type:Object
      }
  }
}
</script>

<style>

</style>