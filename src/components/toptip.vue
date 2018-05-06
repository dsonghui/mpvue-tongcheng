<template>
  <view class="TOPTIP_CLASS">{{ content }}</view>
</template>

<script>
export default {
  name: "m-toptip",
  data() {
    return {
      timer: 0,
      myvalue: false
    };
  },
  props: {
    duration: { type: Number, default: 3000 },
    value: { type: Boolean, required: true, default: false },
    content: { type: String, required: true, default: "content请输入内容" }
  },
  computed:{
      TOPTIP_CLASS(){
          return 'zan-toptips'+ (this.myvalue? 'zan-toptips--show' : '');
      }
  },
  mounted() {
    this.myvalue = this.value;
  },
  methods: {
    showTopTips() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = 0;
      }
      this.timer = setTimeout(() => {
        this.myvalue = false;
      }, this.duration);
    }
  },
  watch: {
    value: function() {
      this.myvalue = this.value;
      if (this.myvalue) this.showTopTips();
    },
    myvalue: function() {
      this.$emit("input", this.myvalue);
    }
  }
};
</script>
