<template>
  <div class="zan-noticebar">
    <div :id="viewId" style="height: 18px; overflow: hidden; position: relative;">
      <div :id="contentId" :animation="animationData" style="position: absolute; white-space: nowrap;">
        {{ text }}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "m-noticebar",
    data() {
      return {
        contentId: "contentId_" + new Date().getTime(),
        viewId: "id_" + new Date().getTime(),
        setTimeoutId: '',
        width: null,
        contentWidth: null,
        animation: null,
        resetAnimation: null,
        animationData: null
      };
    },
    props: {
      text: {
        type: String,
        required: true,
        default: ""
      }
    },
    mounted() {
      setTimeout(() => {
        this.init();
      }, 1000);

    },
    methods: {
      init() {
        let vm = this;
        wx.createSelectorQuery().select("#" + vm.viewId).boundingClientRect(rect => {
          if (!rect || !rect.width) {
            console.warn("页面缺少 noticebar 元素");
            return;
          }
          vm.width = rect.width;
          wx.createSelectorQuery().select("#" + vm.contentId).boundingClientRect(rect => {

            if (!rect || !rect.width) {
              return;
            }
            clearTimeout(vm.setTimeoutId);

            vm.contentWidth = rect.width;
            console.log(vm)
            if (vm.width < vm.contentWidth) {
              var mstime = vm.width / 40 * 1000;
              vm.animation = wx.createAnimation({
                duration: mstime,
                timingFunction: "linear"
              });
              vm.resetAnimation = wx.createAnimation({
                duration: 0,
                timingFunction: "linear"
              });

              vm.scrollZanNoticeBar(mstime);
            }
          }).exec();
        }).exec();
        console.log(this)
      },
      scrollZanNoticeBar(mstime) {
        let vm = this;
        let resetAnimationData = vm.resetAnimation.translateX(vm.width).step();
        vm.animationData = resetAnimationData.export();
        let aninationData = vm.animation
          .translateX(-mstime * 40 / 1000)
          .step();
        setTimeout(() => {
          vm.animationData = aninationData.export()
        }, 100);

        vm.setTimeoutId = setTimeout(() => {
          vm.scrollZanNoticeBar(mstime);
        }, mstime);
      }
    }
  };

</script>
