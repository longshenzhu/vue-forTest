<template>
    <transition>
        <div :class="['box',customClass]" @mouseenter="clearTimer" @mouseleave="startTimer">
            <i :class="typeClass"></i>
            <slot>
                <p class="box-content">{{message}}</p>
            </slot>
            <i v-if="showClose" class="icon-close" @click="close"></i>
        </div>
    </transition>
</template>
<script>

export default {
    data() {
        return {
            message:'',
            type: '',
            iconClass:'',
            center:false,
            customClass:'',
            showClose:false,
            onClose:null,
            closed:false,
            timer:null,
            duration:3000
        }
    },
    mounted() {
        this.startTimer();
    },
    computed:{
        typeClass(){
            return this.type 
        }
    },
    methods:{
        close(){
            this.closed = true;
            if(typeof this.onClose === 'function'){
                this.onClose(this);
            }
        },
        clearTimer(){
            console.log("clearTimer");
            clearTimeout(this.timer);
        },
        startTimer(){
            console.log("startTimer");
            if(this.duration > 0){
                this.timer = setTimeout(()=>{
                    if(!this.closed){
                        this.close();
                    }
                },this.duration)
            }
        },

    }
}
</script>
<style scoped>
    .box {  
        position: fixed;  
        width: 100%;  
        top: 16px;  
        left: 0;  
        text-align: center;  
        pointer-events: none;  
        background-color: #fff;  
        border: grey 3px solid;  
        box-sizing: border-box; 
    } 
    .box-content {  
        width: 200px;  
        margin: 10px auto;  
        font-size: 14px;    
        padding: 8px 16px;  
        background: #fff;  
        border-radius: 3px;  
        margin-bottom: 8px; 
    }
</style>