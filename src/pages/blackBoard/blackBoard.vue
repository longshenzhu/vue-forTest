<template>
    <div class="blackBoard">
        <h2>这是黑板页</h2>
        <my-canvas myCanvas="first"></my-canvas>
        <my-canvas myCanvas="second"></my-canvas>
    </div>
</template>
<script>
import myCanvas from '@/components/myCanvas'
export default {
    name: "blackBoard",
    data(){
        return {
            
        }
    },
    components:{
        "my-canvas" : myCanvas,     //myCanvas
    }
}
</script>

<style scoped>

</style>