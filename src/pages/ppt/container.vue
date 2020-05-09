<template>
    <div class="pptContainer">
        <div>
            <button type="button" @click="lastPage" class="btn bty-primary">上一页</button>
            <button type="button" @click="nextPage" class="btn bty-primary">下一页</button>
        </div>
        <!-- <pageList :pages="pptData.pageList"></pageList> -->
        <thumbNails :list="pptData.pageList" :activeItem="this.indexNum" v-on:selectItem="selectItem"></thumbNails>
        <router-view :pageData="pptData.pageList[index]" ></router-view>
    </div>
</template>

<script>
    // import pptPage from "@/pages/ppt/pptPage";
    import pageList from "./pageList";
    import thumbNails from '@/components/Thumbnails';
    export default {
        name: "pptContainer",
        props: {
            pptId: '',
            index: ''
        },
        computed:{
            indexNum(){
                return parseInt(this.index)
            }
        },
        data(){
            return {
                pptData:{
                    id: this.pptId,
                    currentIndex: this.index,
                    title:'ppt测试',
                    pageList: [ 
                        { name:"第一页", url: require("@/assets/images/ppt/1.jpg"), index:1 },
                        { name:"第二页", url: require("@/assets/images/ppt/2.jpg"), index:2 },
                        { name:"第三页", url: require("@/assets/images/ppt/3.jpg"), index:3 },
                        { name:"第四页", url: require("@/assets/images/ppt/4.jpg"), index:4 },
                        { name:"第五页", url: require("@/assets/images/ppt/5.jpg"), index:5 }
                     ],
                    
                } 
            }
        },
        mounted(){
            this.init();
        },
        methods:{
            init(){
                console.log(`pptId为${this.pptId}`);
                console.log(`父级获取自己路由参数index为${this.index}`)
            },
            selectItem(itemIndex,params){
                this.pptData.currentIndex = itemIndex;
                this.$router.push(`/ppt/${this.pptId}/${this.pptData.currentIndex}`);
            },
            nextPage(){
                if(this.pptData.currentIndex == this.pptData.pageList.length-1){
                    this.pptData.currentIndex = 0;
                }else{
                    this.pptData.currentIndex++;
                }
                this.$router.push(`/ppt/${this.pptId}/${this.pptData.currentIndex}`);
            },
            lastPage(){
                if(this.pptData.currentIndex == 0){
                    this.pptData.currentIndex = this.pptData.pageList.length-1;
                }else{
                    this.pptData.currentIndex--;
                }
                this.$router.push(`/ppt/${this.pptId}/${this.pptData.currentIndex}`);
            }
        },
        components:{
            pageList,
            thumbNails
        }
    }
</script>
<style scoped>
    
</style>