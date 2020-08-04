<template>
  <div>
      <label v-if="label" :class="{ 'i-form-item-label-required': isRequired }">{{label}}</label>
      <div>
        <slot></slot>
        <div v-if="validateState === 'error'" class="i-form-item-message">{{validateMessage}}</div>
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
        isRequired: false,          //是否必填
        validateState: '',          //校验状态
        validateMessage: ''         //校验不通过时的提示信息
      }
    },
    
    computed: {
      fieldValue(){
        return this.form.model[this.prop];
      }
    },
    methods:{
      getRules()
      {
        let formRules = this.form.rules;
        console.log('form',this.form);
        formRules = formRules? formRules[this.prop]: [];

        return [].concat(formRules);
      },
      getFilteredRule(trigger){
        const rules = this.getRules();
        return rules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1);
      },
      validate(trigger, callback= function(){}){
        let rules = this.getFilteredRule(trigger);

        if(!rules || rules.length === 0){
          return true;
        }
        this.validateState = 'validating';
        //以下为async-validator库的调用方法
        let descriptor = {};
        descriptor[this.prop] = rules;

        const validator = new AsyncValidator(descriptor);
        let model = {};
        model[this.prop] = this.fieldValue;

        validator.validate(model, {firstFields: true}, errors =>{
          this.validateState = !errors ? 'success': 'error';
          this.validateMessage = errors? errors[0].message: '';

          callback(this.validateMessage);
        })
      },
      onFieldBlur(value){
        console.log('blur',value);
        this.validate('blur');
      },
      onFieldChange(value){
        this.validate('change');
      },
      //
      resetField(){
        this.validateState = '';
        this.validateMessage = '';

        this.form.model[this.prop] = this.initialValue;
      }
    },
    created(){
      // this.$on('on-form-blur',this.onFieldBlur);
      // this.$on('on-form-change', this.onFieldChange);
    },
    mounted() {
      console.log('this.form',this.form);
      //如果没有传入prop，则无需校验，父组件就无需缓存该实例
      if(this.prop){
        this.dispatch('iForm','on-form-item-add',this);

        //设置初始值，以便在重置时恢复默认值
        this.initialValue = this.fieldValue
        //监听子组件的事件，当触发on-form-blur、on-form-change时，都会对当前的数据进行一次校验，当前的数据指整个form model
        this.$on('on-form-blur',this.onFieldBlur);
        this.$on('on-form-change', this.onFieldChange);
        // console.log(this.form) 
      }
    },
    //组建销毁前，将实例从Form的缓存中移除
    beforeDestroy() {
      this.dispatch('iForm','on-form-item-remove',this);
    },
}
</script>

<style>
  .i-form-item-label-required:before {
    content: '*';
    color: red;
  }
  .i-form-item-message {
    color: red;
  }
</style>