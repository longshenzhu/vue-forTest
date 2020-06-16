<template>
    <div>
        <label v-if="label">{{ label }}</label>
        <slot></slot>
        <p v-if="error">{{error}}</p>
    </div>

</template>
<script>
import Schema from "async-validator";
export default {
    props:{
        label:{
            type: String,
            default: ''
        },
        itemName:{
            type: String,
            default: ''
        }
    },
    data(){
        return {
            error: ''       //校验错误
        }
    },
    inject:['form'],        //注入
    methods: {
        onInput(e){
            this.$emit('input',e.target.value)
        },
        validate(){
            let rule = this.form.rules[this.itemName];
            let value = this.form.model[this.itemName];
            let descriptor = { [this.itemName]: rule };
            let schema = new Schema(descriptor);
            
            //返回promise
            return schema.validate({ [this.itemName]: value }, errors=>{
                if(errors){
                    this.error = errors[0].message;
                }else{
                    this.error = '';
                }
            })
        }
    },
}
</script>