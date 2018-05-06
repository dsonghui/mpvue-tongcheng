<template>
  <view :class="TITLE_CLASS" v-if="myvalue" @tap="clearToast">
    <!-- icon 展示 -->
    <block v-if="icon || image">
      <view v-if="image" class="zan-toast__icon zan-toast__icon-image" :style="IMAGE_STYLE"></view>
      <view v-if="isLoading" class="zan-toast__icon zan-toast__icon-loading">
        <view class="zan-loading"></view>
      </view>
      <view v-else :class="ICON_CLASS"></view>
    </block>

    <!-- 文案展示 -->
    <view v-if="title">{{title}}</view>
  </view>
</template>

<script>
export default {
  name: "m-toast",
  data() {
    return {
      myvalue: false,
      timer: 0
    };
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    },
    value: {
      type: Boolean,
      required: true,
      default: false
    },
    image: {
      type: String
    },
    icon: {
      type: String
    },
    timeout: {
      type: Number,
      default: 3000
    }
  },
  computed: {
    TITLE_CLASS() {
      return "zan-toast" + (this.title ? " zan-toast--notitle" : "");
    },
    IMAGE_STYLE() {
      return "background-image: url(" + this.image + ");";
    },
    ICON_CLASS() {
      return "zan-toast__icon zan-icon zan-icon-" + this.icon;
    }
  },
  mounted() {
    this.myvalue = this.value;
  },
  methods: {
    clearToast() {
      clearTimeout(this.timer);
      this.myvalue = false;
    },
    showToast() {
      if (!this.myvalue) return;
      // 清除上一轮的计时器
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = 0;
      }
      // 传入的显示时长小于0，就认为需要一直显示
      if (this.timeout < 0) return;
      // 下一轮计时器
      setTimeout(() => {
        this.clearToast();
      }, this.timeout);
    }
  },
  watch: {
    value: function() {
      this.myvalue = this.value;
    },
    myvalue: function() {
      this.showToast();
      this.$emit("input", this.myvalue);
    }
  }
};
</script>
