<template>
    <div class="container">
        <canvas :id="myCanvas" class="myCanvas" width="400" height="300"></canvas>
    </div>
</template>
<script>
export default {
    name:"myCanvas",
    props:{
        myCanvas :""
    },
    data() {
        return {
            canvasId: this.myCanvas
        }
    },
    mounted() {
        this.load();
    },
    computed: {
        
    },
    methods: {
        load(){
            let canvas = document.getElementById(this.canvasId);       //canvas 容器
            let offsetTop = canvas.offsetTop;
            let offsetLeft = canvas.offsetLeft;
            console.log(this.canvasId);
            var canvasCtx = canvas.getContext("2d");                //绘图对象 

            function init() {
                sizeSet(canvas);
            }
            init();

            function sizeSet(canvasObj){
                // window.onresize = function (){
                //     canvasObj.width = window.innerWidth;
                //     canvasObj.height = window.innerHeight;
                // }
            }

            function GetX(x){
                return x-offsetLeft;
            }
            function GetY(y){
                return y-offsetTop;
            }

            //3.动态画图
            canvas.addEventListener("mousedown",down,false);
            var offFlag = false;
            function down(event){
                console.log("begin");
                canvas.addEventListener("mousemove",draw,false);
                canvas.addEventListener("mouseup",up,false);
                offFlag = true;
                canvasCtx.beginPath();
                canvasCtx.moveTo(GetX(event.clientX),GetY(event.y));
            }
            function draw(){
                if(offFlag){
                    // console.log(event)
                    canvasCtx.lineTo(GetX(event.clientX),GetY(event.y));

                    canvasCtx.strokeStyle= "white";       
                    canvasCtx.lineWidth= 4;       
                    canvasCtx.lineCap="round";
                    canvasCtx.stroke();
                }
            }
            function up(){
                offFlag= false;
                canvas.removeEventListener("mousemove",draw,false);
                canvas.removeEventListener("mouseup",draw,false);
                
            }
            //事件使用，参考详解https://blog.csdn.net/qq_29606781/article/details/68490879
            

            //鼠标右键触发事件
            canvas.addEventListener("oncontextmenu",function(){
                return false;
            });
        }
    },
}
</script>
<style scoped>
    .myCanvas{
        background:#456547;
        /* width:1000px;
        height: 500px; */
    }
</style>