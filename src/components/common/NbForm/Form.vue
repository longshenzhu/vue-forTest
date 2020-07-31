<template>
  <form>
      <slot></slot>
  </form>
</template>

<script>
import Emitter from '@/mixins/emitter.js'
export default {
    name: "iForm",
    props:{
        model: {
            type:Object
        },
        rules: {
            type:Object
        }
    },
    data() {
        return {
            //缓存所有FormItem实例的。
            fields:[]
        }
    },
    //向下提供form的整体数据
    provide(){
        return {
            form : this
        }
        
    },
    methods: {
        //公开方法：全部重置数据
        resetFields(){

        },
        //公开方法：全部校验数据，支持Promise
        validate(callback){

        }
    },
    created() {
        console.log('rules',this.rules);
        this.$on('on-form-item-add',(field)=>{
            if(field){
                this.fields.push(field);
            }
        });
        this.$on('on-form-item-remove',(field)=>{
            if(field.prop){
                this.fields.splice(this.fields.indexOf(field),1);
            }
        })
    },
}
</script>

<style>

</style>

<!--编写一个 Vue.js 组件，最重要的是设计好它的接口，一个 Vue.js 组件的接口来自三个部分：props、slots、events。
    而 Form 和 FormItem 两个组件主要做数据校验，用不到 events。Form 的 slot 就是一系列的 FormItem，
    FormItem 的 slot 就是具体的表单控件，比如输入框 <i-input> 。那主要设计的就是 props 了。
    使用方式如下：
    <div>
        <i-form :model="formValidate" :rules="ruleValidate">
        <i-form-item label="用户名" prop="name">
            <i-input v-model="formValidate.name"></i-input>
        </i-form-item>
        <i-form-item label="邮箱" prop="mail">
            <i-input v-model="formValidate.mail"></i-input>
        </i-form-item>
        </i-form>
    </div>
-->