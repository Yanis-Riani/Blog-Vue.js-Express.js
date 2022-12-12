<!-- https://router.vuejs.org/guide/essentials/dynamic-matching.html -->
<template>
    <div>{{ $route.params.title }}</div>
</template>
  
  <script>
  export default {
    name: 'Article',

    data() {
        return {
            id: null,
        };
    },


    // created() {
    //     this.$watch(
    //         (toParams, previousParams) => {
    //             this.id = toParams.id;
    //         },
    //     )
    // }
  };
  </script>
  
 
<style scoped>

</style>
  