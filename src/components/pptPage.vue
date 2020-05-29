<template>
  <div class="pptPage">
    <h1>这是pptPage组件 {{ $route.params.index}}</h1>
  </div>
</template>

<script>
export default {
    name:'pptPage',
    data(){
        return {
            msg: 'Welcome to pptPage component'
        }
    }
}
</script>

<style scoped>

</style>