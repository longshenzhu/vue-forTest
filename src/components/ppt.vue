<template>
  <div class="ppt">
    <h1>这是ppt组件 {{ $route.query.index}}</h1>
  </div>
</template>

<script>
export default {
    name:'ppt',
    data(){
        return {
            msg: 'Welcome to ppt component'
        }
    }
}
</script>

<style scoped>

</style>
