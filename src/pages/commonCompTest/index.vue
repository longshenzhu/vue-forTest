<template>
  <div>
      <nb-button name="bt" class="sss" id="btn1" size="large" @on-click="customEventHandler" @click.native="nativeEventHandler" @click="handle2('这里click会认为是自定义事件')" >
          <!-- <i-icon slot="icon" type="checkmark">ss</i-icon> -->
          <!-- 保存 -->
      </nb-button>
  </div>
</template>
<script>
import NbButton  from '../../components/common/NbButton'
export default {
    data: function () {
      return {
            message:"测试首页create完毕",
            plusResult : 0
        }
    },
    methods:{
        //自定义事件触发
        customEventHandler:function(event){
            console.log(event);
            console.log("this is customEventHandler")
        },

        //原生事件触发
        nativeEventHandler: function(event){
            console.log("this is nativeEventHandler")
        },

        //不会执行该方法
        handle2: function(){
            console.log("original event")
        }
    },
    created() {

    },
    components:{
        NbButton
    }
}
</script>
<style scoped>
    
</style>