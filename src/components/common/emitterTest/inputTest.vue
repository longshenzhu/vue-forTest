<template>
    <input 
      type="text"
      :value="currentValue"
      @input="handleInput"
      />
</template>
<script>
import Emitter from '@/mixins/emitter.js'

export default {
  name:'iInputTest',
  mixins: [Emitter],
  props:{
    value:{
      type: String,
      default: ''
    }
  },
  inject: ['foo'],
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
      this.dispatch('inputParentTest','on-form-change',value);
    },

    parentNotify(event){
        console.log("parentEvent",event);
    }
  },
  mounted() {
      console.log('parent',this.foo.label);
      this.$on('on-parent-event', this.parentNotify);
  },
}
</script>

<style>

</style>