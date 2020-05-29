<template>
    <div class="blackBoard">
        <h2>这是黑板页</h2>
        <!-- <my-canvas myCanvas="first"></my-canvas>
        <my-canvas myCanvas="second"></my-canvas> -->
        <div class="firstwhiteboard">
            <whiteboard :whiteboardId="id"></whiteboard>
        </div>
    </div>
    
</template>
<script>
import myCanvas from '@/components/myCanvas'
import whiteBoard from '@/components/Whiteboard'
export default {
    name: "blackBoard",
    data(){
        return {
            id : "firstBoard"
        }
    },
    components:{
        "my-canvas" : myCanvas,     //myCanvas
        "whiteboard" : whiteBoard
    }
}
</script>

<style scoped>
    /* .firstwhiteboard{
        width: 800px;
        height: 600px;
    } */
</style>