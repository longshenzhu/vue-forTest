<template>
  <div class="whiteborad" :ref="wbContainerId" >
    <canvas class="mycanvas" :id="canvasId" :ref="canvasId"></canvas>
  </div>
</template>
<script>
  //源码 https://github.com/szimek/signature_pad  
  import SignaturePad from "signature_pad";
  export default {
    name: "Whiteboard",
    props: {
      whiteboardId: {
        type: String,
        default : "default",
        required: true,
        validator: function (value) {
          return value !== ""
        }
      },
      penColor:{
        type: String,
        default : "#fe0002",
      },
      penSize: {
        type: String,
        default : "1.5-2.5",
      },
      backgroundColor:{
        type: String,
        default : "rgba(255, 255, 255, 0)"
      },
      
      //外部容器动态赋值宽高
      boardWidth: {
        type: Number,
        default: 400
      },
      boardHeight: {
        type: Number,
        default: 300
      },
      boardBackground:{
        type: String,
        default: "#456547"
      },
      boardStyle:{
        type: String,
        default: "border:1px solid black"
      },
      //外部传入绘画数据
      wbPointsData: {
        type: Array,
        default: function() {
          return [];
        }
      }
    },
    data() {
      return {
        wbContainerId: this.whiteboardId,
        canvasId: this.whiteboardId + "_canvas",                   //区别多个canvasId
        whiteboard: null, // 白板实例
        bufferPoints: [], //绘画数据缓存，满5次广播1次
        timeOutEvent: "",
        startPoint: {
          x: 0,
          y: 0
        }
      };
    },
    computed: {
      // wbContainerId() {
      //   return `wbContainer-${this.canvasId}`;
      // }
    },
    watch: {

    },
    mounted: function() {
      let wbContainer = this.$refs[this.wbContainerId];
      wbContainer.style = this.boardStyle;
      wbContainer.style.background= this.boardBackground;

      let canvasElement = this.$refs[this.canvasId];
      canvasElement.width= wbContainer.clientWidth;
      canvasElement.height= wbContainer.clientHeight; 

      let option = {
        minWidth: 1.5,
        maxWidth: 2.5,
        dotSize:  (this.minWidth + this.maxWidth) / 2,
        minDistance: 5,
        backgroundColor: 'rgba(0,0,0,0)',
        penColor: 'black',
        throttle: 16,
        velocityFilterWeight: 0.7,
        onBegin: function(event){

        },
        onEnd: function(event){

        }
      }
      this.whiteboard = new SignaturePad(canvasElement, option);

      // this.whiteboard.resize(this.canvasWidth, this.canvasHeight);
      // this.$nextTick(() => {
      //   if (this.isActive) {
      //     this.whiteboard.on();
      //   } else {
      //     this.whiteboard.off();
      //   }
      // });
    },
    beforeDestroy() {
      // this.whiteboard.off();
    },
    methods: {

    }
  };
</script>
<style lang="scss" scoped>
  .whiteborad {
    // position: relative;
    width: 100%;
    height: 100%;
    //background-color: #456547;
    // .mycanvas {
    //   //position: absolute;
    //   //  left: 0;
    //   // top: 0;
    //   // height: 100%;
    //   // width: 100%;
    // }
  }

  .white-bg {
    background:#456547;
;
  }
</style>
