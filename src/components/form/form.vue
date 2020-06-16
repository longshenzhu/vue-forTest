<template>
    <form>
        <slot></slot>
    </form>

</template>
<script>
export default {
    name:"kform",
    provide(){
        return {
            form: this                      //将组件实例作为提供者，子代组件方便获取
        }
    },
    props:{
        model: {
            type : Object,
            required:true        
        },
        rules: Object
    },
    data(){
        return {
            // model: {
            //     type : Object,
            //     required:true          
            // },
            // rules: Object
        }
    },
    methods: {
        validate(cb){
            const tasks = this.$children
                            .filter(item =>item.itemName)
                            .map(item => item.validate());
            Promise.all(tasks)
                    .then(()=>cb(true))         
                    .catch(()=>cb(false));
            
        }
    },      
}
</script>