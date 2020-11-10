<template>
    <label>
        <span>
            <input 
                type="checkbox" 
                :disabled="disabled" 
                :checked="currentValue" 
                @change='change' />
        </span>
        <slot></slot>
    </label>
</template>

<script>
export default {
    name: 'iCheckbox',
    watch: {
        value(val){
            if(typeof val === "boolean"){
                this.updateModel();
            }else{
                throw 'Value should be Boolean Type'
            }
        }
    },
    props: {
        value:{
            type: Boolean,
            default: false
        },
        disabled:{
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            currentValue: this.value
        }
    },
    methods: {
        change(event){
            if(this.disabled){
                return false;
            }

            const checked = event.target.checked;
            this.currentValue = checked;

            this.$emit('input', checked);
            this.$emit('on-change', checked);
        },
        updateModel(){
            this.currentValue = this.value;
        }
    },
}
</script>

<style>

</style>