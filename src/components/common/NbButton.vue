<template>
    <button :class="'i-button-size' + size" :disabled='disabled' @click="clickHandle">
        <!-- 插槽，分发组建内容，扩展性的体现 -->
        <slot name="icon"></slot>
        <slot>Button</slot> 
    </button>
</template>
<script>

//判断参数是否是其中之一
function oneOf(value, validList){
    return validList.indexOf(value) >= 0;
};
export default {
    props:{
        //建议使用对象的方式传值
        size:{
            validator(value){
                return oneOf(value,['small','large','default'])
            },
            default: 'default'
        },
        disabled:{
            type: Boolean,
            default: false
        }
    },
    methods: {
        clickHandle: function(event){
            // 触发自定义事件
            this.$emit('on-click',event)
        }
    },
    created() {
        console.log(this.$attrs)
    },
    inheritAttrs:false,     //默认值为true,当设置为false时，不会在dom上渲染，但$attrs可以获取到值，注意：inheritAttrs: false 选项不会影响 style 和 class 的绑定
    mounted() {
        console.log(this.$attrs.id)
    },
}
</script>
<style scoped>
    .i-button-sizedefault{
        width:100px;
        height: 50px;
    }

    .i-button-sizelarge{
        width:200px;
        height: 100px;
    }
</style>