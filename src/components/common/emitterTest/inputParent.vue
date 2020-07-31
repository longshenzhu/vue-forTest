<template>
  <div>
      <label v-if="label">{{label}}</label>
      <div>
        <slot></slot>
      </div>
      <button @click="broadTest">广播</button>
  </div>
</template>

<script>
import Emitter from '@/mixins/emitter.js'

//formItem的主要目的：校验。获取上级传过来的校验规则和下级的校验数据，校验后返回校验结果
export default {
    name: 'inputParentTest',
    mixins: [Emitter],
    props:{
      label:{
        type: String,
        default: ''
      },
      prop:{
        type:String
      }
    },
    provide(){
      return {
        foo: this
      }
      
    },
    data(){
      return {};
    },
    methods:{
      onFieldChange(value){
        // console.log(this.form);
        console.log("on-form-change",value); 
      },
      broadTest(value){
        console.log('broadTest',value);
        this.broadcast("iInputTest","on-parent-event",{ from : "iInputParent", message: "come from inputParent"})
      }
    },
    created(){
      this.$on('on-form-change', this.onFieldChange);
    },
    mounted() {
      //如果没有传入prop，则无需校验，父组件就无需缓存该实例
      if(this.prop){
        console.log("监听子组件dispatch的事件");
        //监听子组件的事件，当触发on-form-blur、on-form-change时，都会对当前的数据进行一次校验，当前的数据指整个form model
        this.$on('on-form-change', this.onFieldChange);
        
      }
    }
}
</script>

<style>

</style>