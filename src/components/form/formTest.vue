<template>
    <div>
        <kform :model="model" :rules='rules' ref='loginForm'>
            <formItem label= "用户名称" itemName='username'>
                <kinput type='text' v-model='model.userName'></kinput>
            </formItem>
            <formItem label= "密码" itemName='password'>
                <kinput type='password' v-model='model.password'></kinput>
            </formItem>
        </kform>
    </div>
</template>

<script>
import kform from './form'
import formItem from './formItem'
import kinput from './input'
export default {
    name: 'formTest',
    props:{
        
    },
    computed: {
        
    },
    data(){
        return {
            model:{
                username:'',
                password:''
            },
            rules: {        
                username: [{ required: true, message: "请输⼊⽤户名" }],        
                password: [{ required: true, message: "请输⼊密码" }]      
            } 
        }
    },
    mounted() {
        
    },
    methods: {
        submitForm(){
            this.$refs['loginForm'].validate(valid=>{
                if(valid){
                    this.$message("请求成功");
                }else{
                    this.$message("校验失败");
                }
            })
        }
    },
    components:{
        kform,
        formItem,
        kinput
    }
}
</script>