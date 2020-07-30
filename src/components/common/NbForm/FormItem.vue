<template>
  <div>
      <label v-if="label">{{label}}</label>
      <div>
        <slot></slot>
        <div></div>
      </div>
      
  </div>
</template>

<script>
import Emitter from '@/mixins/emitter.js'
import AsyncValidator from 'async-validator'

//formItem的主要目的：校验。获取上级传过来的校验规则和下级的校验数据，校验后返回校验结果
export default {
    name: 'iFormItem',
    mixins: [Emitter],
    //注入上级提供的数据
    inject: ['form'],
    props:{
      label:{
        type: String,
        default: ''
      },
      prop:{
        type:String
      }
    },
    data(){
      return {
        validateState: '',          //校验状态
        validateMessage: '',        //校验不通过时的提示信息
      }
    },
    methods:{
      //
      onFieldBlur(value){
        // console.log(value);
        
      },
      onFieldChange(value){
        console.log("onFieldChange",value); 
      }
    },
    created(){
      this.$on('on-form-blur',this.onFieldBlur);
      this.$on('on-form-change', this.onFieldChange);
    },
    mounted() {
      //如果没有传入prop，则无需校验，父组件就无需缓存该实例
      if(this.prop){
        this.dispatch('iForm','on-form-item-add',this);
        //监听子组件的事件，当触发on-form-blur、on-form-change时，都会对当前的数据进行一次校验，当前的数据指整个form model
        this.$on('on-form-blur',this.onFieldBlur);
        this.$on('on-form-change', this.onFieldChange);
        // console.log(this.form) 
      }
    },
    //组建销毁前，将实力从Form的缓存中移除
    beforeDestroy() {
      this.dispatch('iForm','on-form-item-remove',this);
    },
}
</script>

<style>

</style>