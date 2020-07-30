<template>
  <div>
      <nb-button name="bt" class="sss" id="btn1" size="large" @on-click="customEventHandler" @click.native="nativeEventHandler" @click="handle2('这里click会认为是自定义事件')" >
          <!-- <i-icon slot="icon" type="checkmark">ss</i-icon> -->
          <!-- 保存 -->
      </nb-button>
      <i-form :model="formValidate" :rules="ruleValidate">
        <i-form-item label="用户名" prop="name">
            <i-input v-model="formValidate.name"></i-input>
        </i-form-item>
        <i-form-item label="邮箱" prop="mail">
            <i-input v-model="formValidate.mail"></i-input>
        </i-form-item>
      </i-form>

      <!-- <div>
          <label>i-input text</label>
          <i-form-item>
              <i-input v-model="testValue" @input="inputEventHandler" @click.native="testClick"></i-input>
          </i-form-item>
      </div> -->
      <!-- <div>
          <h4>emitter测试</h4>
          <i-input-parent-test>
              <i-input-test v-model="testValue" @input="inputEventHandler"></i-input-test>
              <i-input-test v-model="inputTest" @input="inputEventHandler"></i-input-test>
          </i-input-parent-test>
      </div> -->
  </div>
</template>
<script>
import NbButton  from '../../components/common/NbButton'
import iForm from '../../components/common/NbForm/Form'
import iFormItem from '../../components/common/NbForm/FormItem'
import iInput from '../../components/common/NbForm/Input'

import iInputParentTest from '../../components/common/emitterTest/inputParent'
import iInputTest from '../../components/common/emitterTest/inputTest'

export default {
    data: function () {
      return {
            message:"测试首页create完毕",
            plusResult : 0,

            formValidate:{
                name:'',
                mail:''
            },
            ruleValidate:{

            },
            testValue: 'firstInput',
            inputTest: 'secondInput'
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
        },
        inputEventHandler:function(eventValue){
            console.log("eventValue",eventValue);
        },
        testClick: function(){
            //console.log('blur:',this.testValue);
        }
    },
    created() {

    },
    components:{
        NbButton,
        iForm,
        iFormItem,
        iInput,
        
        iInputTest,
        iInputParentTest
    }
}
</script>
<style scoped>
    
</style>