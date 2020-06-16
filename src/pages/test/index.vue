<template>
  <div>
      <router-link to="/test/vueDraggableTest">拖拽组件</router-link>
      <router-link to="/test/mask">阴影遮罩层 </router-link>
  </div>
</template>
<script>
import {log, expCatch}  from '../../utils/decorator/logDecorator'
export default {
    data: function () {
      return {
            message:"测试首页create完毕",
            plusResult : 0
        }
    },
    methods:{
        @expCatch("/pages/test/index.vue")
        testLogs(first,second){
            if(typeof first === "number" && typeof second === "number"){
                this.plusResult = first + second;
            }
            throw new Error("出错了！");
        }
    },
    created() {
        console.log(`${this.message}`);
        this.testLogs(1,2);
    },
}
</script>