<template>
    <div>
        <input :value='value' @input="onInput" v-bind="$attrs" />
    </div>

</template>
<script>
export default {
    inheritAttrs:false,
    props:{
        value: {
            type:String,
            default: ''
        }
    },
    data(){
        return {
            // type: {
            //     type : String,
            //     default: 'text'             //input 默认type值为text
            // },
            
        }
    },
    methods: {
        onInput(e){
            console.log(this.value);
            this.$emit('input',e.target.value)
        },
        validate(){

        }
    },
}
</script>