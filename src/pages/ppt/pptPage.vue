
<template>
  <div class="pptPage">
    <img id="ocrImgSign" :src="pageData.url" :alt="pageData.name" class="img" crossorigin="Anonymous" />
  </div>
</template>
<script>
    export default {
        name: "pptPage",
        props: {
            index:"",
            pageData:''
        },
        data(){
            return {
                
            }
        },
        mounted(){
            this.init();
        },
        methods:{
            init(){
                console.log(`这是第${this.pageData.index}页`)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .pptPage {
        width: 100%;
        height: 100%;

        .no-img {
            margin-top: 1rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            h2 {
            color: #ffffff;
            }
        }
        .img {
            display: block;
            width: 100%;
            height: 100%;
        }
    }
</style>