<template>
  <div id="app">
    <!-- <router-link to="/ppt?index=1">ppt </router-link>
    <router-link to="/pptPage/3">pptPage </router-link>
    <router-link to="/helloWorld">helloWorld </router-link> -->
    <router-view></router-view>
  </div>
</template>
<script>

export default {
  name: 'App',
  methods:{

  }
  // computed:{
  //   username:{
  //     return this.$route.paams.username
  //   }
  // },
  // methods :{
  //   goBack(){
  //     window.history.length>1?this.$router.go(-1): this.$router.push('/')
  //   }
  // }
}

</script>

<style>
#app {
  height: 100%;
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>
