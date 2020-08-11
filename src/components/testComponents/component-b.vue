<template>
    <div>
        组件B
    </div>
</template>

<script>
import { findComponentUpward,findBrothersComponents } from '../../utils/assist'
export default {
    name: 'componentB',
    data() {
        return {
            name: 'componentB'
        }
    },
    methods: {
        sayHello(){
            console.log('hello,this is componentB:', this.$attrs['name'] )
        }
    },
    mounted() {
        const comA = findComponentUpward(this, 'componentA');
        if(comA){
            console.log('parent',comA.name);
            comA.sayHello();
        }

        const comBs = findBrothersComponents(this, 'componentB');
        console.log('brothers',comBs);
    },
}
</script>