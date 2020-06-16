<template>
    
  <div @click="showResize"  
    @mousedown.stop="mouseDown"
    class='select-dialog'
    ref='selectDialog'>
      <p>测试一下拖拽组件</p>
      <div class="my-draggable" v-if="showMask">
        <vue-draggable-resizable v-if='showResizable' :x='x' :y='y' :w='w' :h="h" @dragging="onDrag" @resizing="onResize" :parent="true"  :active="true"
          :min-width="0"
          :min-height="0">
          <p>Hello! I'm a flexible component. You can drag me around and you can resize me.<br>
          X: {{ x }} / Y: {{ y }} - Width: {{ w }} / Height: {{ h }}</p>
        </vue-draggable-resizable>
      </div>
    
  </div>
</template>
<script>
import Vue from 'vue'
import VueDraggableResizable from 'vue-draggable-resizable'
 
// optionally import default styles
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
 
// Vue.component('vue-draggable-resizable', VueDraggableResizable)
export default {
    data: function () {
    return {
        w : 'auto',
        h : 'auto',
        x: 10,
        y: 10,
        showMask: false,
        showResizable: false
    }
  },
  
  methods: {
    showResize(){
        this.showMask = true;
    },
    mouseDown(e) {
      this.x = e.clientX;
      this.y = e.clientY;
      // this.w = 200;
      // this.h = 200;
      //this.showResizable = true;
      console.log(this.x,this.y);


      window.addEventListener("mousemove", this.move);
      window.addEventListener("mouseup", this.mouseUp);
    },
    move(e) {
      let currentX = e.clientX ? e.clientX : 0.1
      let currentY = e.clientY ? e.clientY : 0.1
      this.w = currentX - this.x;
      this.h = currentY = this.y;
      
    },
    mouseUp(e){
      this.showResizable = true;
      window.removeEventListener('mousemove',this.move);
    },
    // onDeactivated() {
    //   this._quit();
    // },
    // onActivated() {
    //   this._lampFun();
    // },
    // _quit() {
    //   if (this.$route.name === "video") {
    //     this.$eventBus.$emit("ctrlDraw", true);
    //   }
    //   this.del_ocr_quiz();
    //   this.show_screenshot_mask(false);
    //   this.set_ocr_type("");
    //   this.set_interaction_type("");
    //   let myDraggable = document.querySelector(".my-draggable");
    //   myDraggable.style.boxShadow = "none";
    // },
    // _lampFun() {
    //   let myDraggable = document.querySelector(".my-draggable");
    //   // this.show_screenshot_mask(true)
    //   myDraggable.style.boxShadow = "rgba(0, 0, 0, .6) 0 0 0 100000px";
    // },
    // // 获取 窗口 Rect
    // _getWindRect() {
    //   this.selectRect =
    //     this.$refs.selectDialog &&
    //     this.$refs.selectDialog.getBoundingClientRect();
    // },
    // // 定位互动 panel
    // _getWrapperRect() {
    //   let dialogInteractionPanleWidth = this.dialogInteracPanel.clientWidth;
    //   let dialogInteractionPanleHeight = this.dialogInteracPanel.clientHeight;
    //   const space = 20;
    //   let top;
    //   let bottomHeight =
    //     this.selectRect.height -
    //     this.ocrDialogSize.y -
    //     this.ocrDialogSize.height;
    //   if (
    //     bottomHeight < this.interactionPanelHeight + space &&
    //     this.ocrDialogSize.y < this.interactionPanelHeight + space
    //   ) {
    //     top = this.selectRect.height / 2 - this.interactionPanelHeight / 2;
    //   } else {
    //     if (
    //       this.ocrDialogSize.y > this.interactionPanelHeight + space &&
    //       bottomHeight < this.interactionPanelHeight + space
    //     ) {
    //       top = this.ocrDialogSize.y - dialogInteractionPanleHeight - space;
    //     } else {
    //       top = this.ocrDialogSize.y + this.ocrDialogSize.height + space;
    //     }
    //   }
    //   let left;
    //   //console.log('======')
    //   //console.log(this.ocrDialogSize.x)
    //   //console.log(this.ocrDialogSize.width)
    //   //console.log(dialogInteractionPanleWidth)
    //   if (
    //     this.ocrDialogSize.x + this.ocrDialogSize.width <=
    //     dialogInteractionPanleWidth
    //   ) {
    //     //宽度小于发送面板宽度-左对齐
    //     left = this.ocrDialogSize.x;
    //     // console.log('++++++++++++++'+left)
    //   } else {
    //     left =
    //       this.ocrDialogSize.x +
    //       this.ocrDialogSize.width -
    //       dialogInteractionPanleWidth;
    //     // console.log('--------------'+left)
    //   }
    //   this.panelStyle.top = top + "px";
    //   this.panelStyle.left = left + "px";
    // },
    onResize: function (x, y, width, height) {
      this.x = x
      this.y = y
      this.width = width
      this.height = height
    },
    onDrag: function (x, y) {
      this.x = x
      this.y = y
    }
  },
  components: {
      VueDraggableResizable
  }
}
</script>

<style scoped>
.select-dialog{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    bottom: 0;
    z-index: 999;
}

.my-draggable .quit{
    position: absolute;
    left: 50%;
    bottom: 0;
    width: 100px;
    height: 48px;
    line-height: 52px;
    margin-left: 12px;
    background: #fff;
    text-align: center;
    font-weight: bold;
    font-size: 16px;
    border-radius: 100px 100px 0 0;
    box-shadow: 0 0 1px 10px rgba(255, 255, 255, 0.15);
}

.my-draggable {
  box-shadow: rgba(0, 0, 0, 0.6) 0 0 0 100000px;
}

.my-draggable ::before{
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
}
</style>