<template>
    <input 
      type="text"
      :value="currentValue"
      @input="handleInput"
      @blur="handleBlur"
      />
</template>
<script>
import Emitter from '@/mixins/emitter.js'

export default {
  name:'iInput',
  mixins: [Emitter],
  props:{
    value:{
      type: String,
      default: ''
    }
  },
  data() {
    return {
      currentValue: this.value
    }
  },
  watch:{
    value (val) {
        this.currentValue = val;
    }
  },
  methods: {
    handleInput(event){
      const value = event.target.value;
      this.currentValue = value;
      this.$emit('input',value);                  //触发自定义组建的@input 事件
      this.dispatch('iFormItem','on-form-change',value);
    },
    //失去焦点
    handleBlur(){
      this.dispatch('iFormItem','on-form-blur',this.currentValue);
    }
  }
}
</script>

<style>

</style>