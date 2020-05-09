<template>
    <div class="pageList-wrapper">
        <div>这是ppt页的列表</div>
        <div class="pageList">
            <Scroll :data="pages">
                <ul class="list">
                    <li class="li" v-for="(page,index) in pages" :key="index">
                        <img :src="page.url" :alt="page.name"/>
                    </li>
                </ul>
            </Scroll>
        </div>
    </div>
    
</template>
<script>
    import Scroll from "@/components/Scroll";
    export default {
        name:"pageList",
        props:{
            pages:{
                type: Array,
                default(){
                    return [];
                }
            },
            activePage:{
                type: String,
                default: ""
            }
        },
        data(){
            return {

            }
        },
        methods:{

        },
        components:{
            Scroll
        }
    }
</script>
<style scoped>

</style>