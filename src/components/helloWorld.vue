<template>
  <div class="hello">
    <h1>这是helloworld组件 {{count1}} {{count2}} {{count3}} {{courseIdShow}}</h1>
    <h1>getters数据展示 {{messageCount}} {{unreadMessage}}</h1>
    <button @click="getMessages">获取消息列表</button><button @click="addMessage">添加消息</button><button @click="removeMessage(2)">删除消息</button>
    <button @click="goppt">去ppt</button>
    <button @click="gopptPage">去pptPage</button>
  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions } from 'vuex';        //vuex 提供的辅助方法。
import add from '../utils/common'
export default {
  name: 'helloWorld',
  computed:{
    count1(){
      return this.$store.state.count + 1
    },
    ...mapState({                                               //...mapState(["count","message"])
      count2:(state)=> state.count + 2,
      count3(state){
        return state.count + 3
      },
      courseIdShow: "courseId"
    }),
    unreadMessage(){
      return this.$store.getters.messageUnread
    },
    ...mapGetters({                                            //...mapGetters(["messageCount","messageUnread"])
      messageCount: "messageCount"
    })
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      //count : this.$store.state.count
    }
  },
  mounted() {
    // console.log(add.add(8,9));
  },
  methods:{
    ...mapMutations(["removeMessage"]),
    goppt(){
      // this.$router.push({name:"ppt",query:{index: 2}})
      this.$router.push({path:"/ppt",query:{index: 2}})
    },
    gopptPage(){
      this.$router.push({name:"pptPage",params:{index: 3}})
      //this.$router.push({path:"/pptPage/3"})
    },
    addMessage(){
      var message = {
            title: new Date(),
            read : false
      }
      this.$store.commit("addMessage",message) 
    },
    getMessages(){
      this.$store.dispatch("getMessages");                  //调用action 使用dispatch
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
