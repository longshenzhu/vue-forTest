<template>
  <div class="thumbnails-wrapper">
    <div class="arrow" @click="showThumbnails" v-show="isEndAnimate">
      <svg class="svg-icon" aria-hidden="true">
        <use :xlink:href="[isShowThumbnails? '#icon-right': '#icon-left']" />
      </svg>
    </div>
    <transition
      enter-active-class="animated slideInRight "
      leave-active-class="animated slideOutRight"
    >
      <div class="thumbnails" v-show="isShowThumbnails" ref="thumbnails">
        <!-- isShowThumbnails = !isShowThumbnails -->
        <div class="arrow" @click="showThumbnails" key="arrow">
          <svg class="svg-icon" aria-hidden="true">
            <use :xlink:href="[isShowThumbnails? '#icon-right': '#icon-left']" />
          </svg>
        </div>
        <div class="blackboard-list">
          <div class="list-content" :style="computedHeight">
            <Scroll :click="true" :data="list">
              <ul class="list">
                <!-- list 循环-->
                <li
                  class="item"
                  v-for="(item, index) in list"
                  :key="index"
                  :class="{'active': index === activeItem}"
                  @click.stop="selectItem(index)"
                >
                  <slot :item="item">
                    <img class="img" :src="item.url" alt />
                  </slot>
                  <span class="pageNum">{{ index + 1 }}</span>
                </li>
              </ul>
            </Scroll>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Scroll from "./Scroll";

export default {
  name: "thumbnails",
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    },
    // 默认显示
    activeItem: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      // 是否展开列表
      isShowThumbnails: true,
      isEndAnimate: false
    };
  },
  computed: {
    computedHeight() {
      //let isFourth = this.list.length >= 4;
      return this.list.length >= 4 ? { height: "450px" } : { height: "auto" };
    }
  },
  mounted() {
    this.$refs.thumbnails.addEventListener("animationend", () => {
      this.isEndAnimate = !this.isShowThumbnails;
    });
    this.$refs.thumbnails.addEventListener("touchmove", () => {
      zonekey.log.info('缩略图触发了touchmove事件')
    });
    this.$refs.thumbnails.addEventListener("touchend", () => {
       zonekey.log.info('缩略图触发了touchmend事件')
    });
  },
  methods: {
    selectItem(index) {
      //this.activeItem = index;
      this.$emit("selectItem", index, "selectPage");
    },
    showThumbnails() {
      this.isEndAnimate = false;
      this.isShowThumbnails = !this.isShowThumbnails;
    }
  },
  components: { Scroll }
};
</script>

<style lang="scss">
@import "~@/assets/style/var.scss";

.thumbnails-wrapper {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 5;
  color: #fff;
  .arrow {
    position: absolute;
    right: 100%;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    justify-items: center;
    align-items: center;
    height: 60px;
    width: 35px;
    border-radius: 40px 0 0 40px;
    background: rgba(0, 0, 0, 0.35);

    .svg-icon {
      font-size: 30px;
      margin-left: 5px;
    }
  }
}
.thumbnails {
  display: flex;
  align-items: center;
  .blackboard-list {
    /* height: 450px; */
    padding: 15px;
    background: rgba(0, 0, 0, 0.35);
    border-radius: 8px 0 0 8px;

    .list-content {
      overflow: hidden;
    }
  }

        .list {
            width: 170px;
            // padding:0 20px;

    .item {
      position: relative;
      height: 95px;
      width: 100%;
      margin-bottom: 10px;
      border-radius: 6px;
      overflow: hidden;
      border-style: solid;
      border-width: 2px;
      border-color: transparent;
      &:last-child {
        margin-bottom: 0;
      }

      &.active {
        border-color: $themeColor;

        .pageNum {
          background: $themeColor;
        }
      }

      .img {
        width: 100%;
        height: 100%;
        display: block;
        margin: 0;
        object-fit: cover;
      }

      .pageNum {
        position: absolute;
        left: 0;
        top: 0;
        color: #fff;
        width: 25px;
        height: 25px;
        line-height: 25px;
        background: rgba(0, 0, 0, 0.6);
        border-radius: 0 0 4px 0;
        text-align: center;
        font-size: 14px;
      }
    }
  }
}
</style>
