<template>
  <div>
      组建A
      <component-b name='first'></component-b>
      <component-b name='second'></component-b>
  </div>
</template>

<script>
import componentB from './component-b'
import { findComponentDownward } from '../../utils/assist'

export default {
    name: 'componentA',
    components: { componentB },
    data() {
        return {
            name: 'yanpin'
        }
    },
    methods: {
        sayHello(){
            console.log('hello, Vue.js',this._uid);
        }
    },
    mounted() {
        const comB = findComponentDownward(this, 'componentB');
        if(comB){
            console.log('comB',comB);
            comB.sayHello();
        }
    },
}
</script>

<style>

</style>