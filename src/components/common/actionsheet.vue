<template name="zan-actionsheet">
  <div :class="SHOWCLASS">
    <div class="zan-actionsheet__mask" @tap.stop="clickView"></div>
    <div class="zan-actionsheet__container">
      <!-- 内容 -->
      <slot></slot>

      <!-- 脚部 -->
      <div class="zan-actionsheet__footer" v-if="!noFoot">
        <button class="zan-btn zan-actionsheet__btn" @tap.stop="clickClose">{{ cancelText }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'m-actionsheet',
  props: {
    value: {
      type: Boolean,
      default: false,
      required: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    },
    noFoot: {
      type: Boolean,
      default: false
    },
    cancelText: {
      type: String,
      default: "关闭"
    }
  },
  data() {
    return {
      myvalue: false
    };
  },
  computed: {
    SHOWCLASS() {
      return "zan-actionsheet" + (this.myvalue ? " zan-actionsheet--show" : "");
    }
  },
  mounted: function() {
    console.log(this.cancelText)
    this.myvalue=this.value;
  },
  methods: {
    clickView() {
      if (!this.closeOnClickOverlay) return;
      this.clickClose();
    },
    clickClose() {
      this.myvalue = false;
    }
  },
  watch:{
    'value':function(){
      this.myvalue=this.value;
    },
    'myvalue':function(){
      this.$emit('input',this.myvalue);
    }
  }
};
</script>
