<template>
  <div ref="wrapper" class="scroll-wrapper">
    <slot></slot>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';

  export default {
    name: "",
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      // fix:默认为true，会导致使用的页面点击事件执行多次
      click: {
        type: Boolean,
        default: false
      },
      // 列表的数据
      data: {
        type: [Array, Number],
        default: null
      },
      // 是否开启横向滚动
      scrollX: {
        type: Boolean,
        default: false
      },
      // 是否派发滚动事件
      listenScroll: {
        type: Boolean,
        default: false
      },
      // 是否派发顶部下拉事件 用于下拉刷新
      pullup: {
        type: Boolean,
        default: false
      },
      pulldown: {
        type: Boolean,
        default: false
      },
      // 滚动前是否派发列表滚动事件
      beforeScroll: {
        type: Boolean,
        default: false
      },
      // 滚动后是否派发滚动事件
      afterScroll:{
        type: Boolean,
        default: true
      },
      // 当前数据更新后，刷新scroll 的延时
      refreshDelay: {
        type: Number,
        detault: 20
      },
      // 轮播 slide 组件默认关闭 false
      snap: [Boolean, Object],
    },
    mounted() {
      setTimeout(() => {
        this._initScroll();
      }, 20)
    },
    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) {
          return
        }
        // better-scroll 初始化
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.wrapper, {
            probeType: this.probeType,
            click: this.click,
            scrollX: this.scrollX,
            snap: this.snap // 默认false
          });

          if (this.listenScroll) {
            let me = this;
            this.scroll.on('scroll', (pos) => {
              me.$emit('scroll', pos);
            })
          }
          if (this.pullup) { // 上拉动作（加载）
            this.scroll.on('scrollEnd', () => {
              if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
                this.$emit('scrollToEnd');
              }
            })
          }
          // 是否派发顶部下拉事件，用于下拉刷新
          if (this.pulldown) {
            this.scroll.on('touchend', (pos) => {  // 下拉动作
              if (pos.y > 50) {
                this.$emit('pulldown')
              }
            })
          }
          // 滚动前 处理事件
          if (this.beforeScroll) {
            this.scroll.on('beforeScrollStart', () => {
              this.$emit('beforeScroll');
            })
          }
          // 滚动后 处理事件
          if(this.afterScroll){
            this.scroll.on('scrollEnd', () => {
              this.$emit('afterScroll');
            })
          }
        }
      },
      // 代理 better-scroll 的enable方法
      enable() {
        this.scroll && this.scroll.enable();
      },
      // 代理 better-scroll disable
      disable() {
        this.scroll && this.scroll.disable();
      },
      // 代理refresh方法
      refresh() {
        this.scroll && this.scroll.refresh();
      },
      // 代理scrollTo
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
      },
      // 代理better-scroll的scrollToElement方法
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      }
    }
  }
</script>
<style>
    .scroll-wrapper {
        height: 100%;
    }
</style>


