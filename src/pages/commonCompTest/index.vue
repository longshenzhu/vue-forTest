<template>
  <div>
      <h3>自定义按钮组件——button</h3>
      <nb-button name="bt" class="sss" id="btn1" size="large" @on-click="customEventHandler" @click.native="nativeEventHandler" @click="handle2('这里click会认为是自定义事件')" >
          <!-- <i-icon slot="icon" type="checkmark">ss</i-icon> -->
          <!-- 保存 -->
      </nb-button>
      <h3>具有数据校验功能的表单组件——Form</h3>
      <i-form ref="form" :model="formValidate" :rules="ruleValidate">
        <i-form-item label="用户名" prop="name">
            <i-input v-model="formValidate.name"></i-input>
        </i-form-item>
        <i-form-item label="邮箱" prop="mail">
            <i-input v-model="formValidate.mail"></i-input>
        </i-form-item>
      </i-form>
       <button @click="handleSubmit">提交</button>
       <button @click="handleReset">重置</button>
      <!-- <div>
          <label>i-input text</label>
          <i-form-item>
              <i-input v-model="testValue" @input="inputEventHandler" @click.native="testClick"></i-input>
          </i-form-item>
      </div> -->
      <!-- <div>
          <h4>emitter测试</h4>
          <i-input-parent-test label="姓名">
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
                name :[
                    {required: true,message:'用户名不能为空',trigger: 'blur'}
                ],
                mail:[
                    {required:true, message: '邮箱不能为空', trigger: 'blur'},
                    {type: 'email', message: '邮箱格式不正确', trigger:'blur' }
                ]
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
        handleSubmit: function(){
            // this.$refs.form.validate((valid) => {
            //     if(valid){
            //         window.alert('提交成功');
            //     }else{
            //         window.alert('表单校验失败');
            //     }
            // })
            const validate = this.$refs.form.validate();
            validate.then((valid) => {
                if(valid){
                    window.alert('提交成功');
                }else{
                    window.alert('表单校验失败');
                }
            })
        },
        handleReset(){
            this.$refs.form.resetFields();
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