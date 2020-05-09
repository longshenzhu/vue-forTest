<template>
  <div class="whiteborad-container" :ref="wbContainerId" :class="{'white-bg': !isForCourseware}" id="whiteborad_container">
    <canvas class="whiteborad" :id="canvasId" :ref="canvasId"></canvas>
  </div>
</template>
<script>
  import SignaturePad from "@Common/script/zonekey.whiteboard";
  const MAX_BUFFER = 5;
  const INIT_COLOR = "#fe0002";
  const INIT_SIZE = "1.5-2.5";
  //记录动态设置，应对切换后修改了颜色、大小
  let dynamicColor = "";
  let dynamicSize = "";

  export default {
    name: "WhiteboardNew",
    props: {
      //外部排序
      sortIndex: {
        type: Number,
        default: 0
      },
      //是课件的话，背景透明
      isForCourseware: {
        type: Boolean,
        default: false
      },
      //是否处于操作状态
      isActive: {
        type: Boolean,
        default: false
      },
      //是否是缩略图
      isThumbnail: {
        type: Boolean,
        default: false
      },
      //外部容器动态赋值宽高
      canvasWidth: {
        type: Number,
        default: 0
      },
      canvasHeight: {
        type: Number,
        default: 0
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
        canvasId: `${new Date().getTime()}-${Math.round(Math.random() * 100)}`, //区别多个canvasId
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
      wbContainerId() {
        return `wbContainer-${this.canvasId}`;
      }
    },
    watch: {
      isActive() {
        if (this.isActive) {
          this.whiteboard.on();
        } else {
          this.whiteboard.off();
        }
      },
      canvasHeight() {
        this.whiteboard.resize(this.canvasWidth, this.canvasHeight);
      },
      canvasWidth() {
        this.whiteboard.resize(this.canvasWidth, this.canvasHeight);
      },
      wbPointsData() {
        this.redrawData(this.deepCopy(this.wbPointsData));
      },
      sortIndex() {
        this.whiteboard.sortIndex = this.sortIndex;
      }
    },
    mounted: function() {
      this.whiteboard = new SignaturePad(this.$refs[this.canvasId], {
        sortIndex: this.sortIndex,
        isThumbnail: this.isThumbnail,
        backgroundColor: "rgba(255, 255, 255, 0)",// this.isForCourseware ? "rgba(255, 255, 255, 0)" : "rgba(255, 255, 255, 1)",
        penColor: INIT_COLOR,
        penSize: INIT_SIZE,
        onUpdate: this.onUpdateHandler,
        dynamicConfig: this.dynamicConfig //每次画之前同步
      });
      dynamicColor = this.whiteboard.penColor;
      dynamicSize = this.whiteboard.penSize;
      this.whiteboard.resize(this.canvasWidth, this.canvasHeight);
      this.$nextTick(() => {
        if (this.isActive) {
          this.whiteboard.on();
        } else {
          this.whiteboard.off();
        }
      });
    },
    beforeDestroy() {
      this.whiteboard.off();
    },
    methods: {
      onUpdateHandler(params) {
        let {
          sortIndex,
          area,
          point
        } = params;
        let allGroups = this.whiteboard.toData();
        let end = allGroups[allGroups.length - 1];
        let lastPoints = this.whiteboard._lastPoints;
        let last = lastPoints[lastPoints.length - 1];
        //相邻坐标太近的直接干死，lastPoints里存的是过滤后的坐标
        if (point.time === last.time) {
          this.countSegment(sortIndex, area, end, this.whiteboard.isDrawIng);
        } else {
          if (
            !this.whiteboard.isDrawIng &&
            lastPoints.length > 1 &&
            this.bufferPoints.length > 0
          ) {
            this.countSegment(sortIndex, area, end, this.whiteboard.isDrawIng);
          }
        }
      },
      countSegment(sortIndex, area, end, isDrawIng) {
        let segment = this.deepCopy(end);
        let pointsLength = segment.points.length;
        if (pointsLength == 0) return;
        let segmentObj = {
          sortIndex: sortIndex,
          isCurve: false,
          area: area,
          segment: null
        };
        let segStartPoint = segment.points[0];
        //点
        if (pointsLength == 1) {
          segmentObj.isCurve = false;
          segmentObj.segment = segment;
          this.updateSegment(segmentObj);
          this.bufferPoints.length = 0;
        } else {
          //线
          segmentObj.isCurve = true;
          if (pointsLength > 1) {
            if (isDrawIng) {
              let copyEndPoint = this.deepCopy(segment.points[pointsLength - 1]);
              this.bufferPoints.push(copyEndPoint);
              if (this.bufferPoints.length >= MAX_BUFFER) {
                this.bufferPoints.unshift(segStartPoint);
                segmentObj.segment = this.deepCopy(this.bufferPoints);
                this.updateSegment(segmentObj);
                this.bufferPoints.length = 0;
              }
            } else {
              //结束时同步坐标，避免下次绘画引起连线bug
              this.bufferPoints.unshift(segStartPoint);
              segmentObj.segment = this.deepCopy(this.bufferPoints);
              this.updateSegment(segmentObj);
              this.bufferPoints.length = 0;
            }
          }
        }
      },
      //多屏广播绘画
      updateSegment(params) {
        let {
          sortIndex
        } = params;
        if (sortIndex !== this.sortIndex) return;
        this.whiteboard.updateSegment(params);
      },
      //多屏同步工具条
      updateBar(params) {
        let {
          sortIndex,
          type,
          itemVal
        } = params;
        switch (type) {
          case "color":
            this.changeEraser(false);
            this.whiteboard.penColor = itemVal;
            dynamicColor = itemVal;
            break;
          case "size":
            this.changeEraser(false);
            this.whiteboard.countDrawWidth(itemVal);
            dynamicSize = itemVal;
            break;
          case "action":
            if (sortIndex !== this.sortIndex) return;
            switch (itemVal) {
              case "undo":
                this.changeEraser(false);
                this.whiteboard && this.whiteboard.undo();
                break;
              case "redo":
                this.changeEraser(false);
                this.whiteboard && this.whiteboard.redo();
                break;
              case "clear":
                this.changeEraser(false);
                this.whiteboard.clear();
                this.whiteboard.clearRedoData();
                this.bufferPoints.length = 0;
                break;
              case "eraser":
                this.changeEraser(true);
                break;
              case "no-eraser":
                this.changeEraser(false);
                break;
            }
            break;
        }
      },
      changeEraser(isEraser) {
        let mode = isEraser ? "destination-out" : "source-over";
        this.whiteboard._ctx.globalCompositeOperation = mode;
        zonekey.log.debug(
          `>>>WhiteboardNew.vue ${this.canvasId} > 橡皮擦: ${isEraser}`
        );
      },
      //每次画之前，同步工具条设置的颜色、大小或其他选项
      dynamicConfig() {
        return {
          penColor: dynamicColor,
          penSize: dynamicSize
        };
      },
      getDrawData() {
        return this.whiteboard.toData();
      },
      redrawData(data) {
        this.whiteboard.fromData(data);
      },
      resetDrawConfig() {
        this.changeEraser(false);
        this.whiteboard.penColor = INIT_COLOR;
        dynamicColor = INIT_COLOR;
        this.whiteboard.countDrawWidth(INIT_SIZE);
        dynamicSize = INIT_SIZE;
      },
      deepCopy(obj) {
        if (typeof obj !== "object") return;
        var newObj = obj instanceof Array ? [] : {};
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            newObj[key] =
              typeof obj[key] === "object" ? this.deepCopy(obj[key]) : obj[key];
          }
        }
        return newObj;
      }
    }
  };
</script>
<style lang="scss" scoped>
  .whiteborad-container {
    position: relative;
    width: 100%;
    height: 100%;

    .whiteborad {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
    }
  }

  .white-bg {
    background:#456547;
;
  }
</style>
