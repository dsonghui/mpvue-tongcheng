<template>
    <div :class="POPUP_CLASS">
    <div class="zan-popup__mask" @tap="maskClick"></div>
    <div class="zan-popup__container">
      <div class="zan-btns">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "m-popup",
  props: {
    value: { type: Boolean, required: true, default: false },
    size: { type: String, default: "bottom" },
    diffClose: { type: Boolean, default: false }
  },
  data() {
    return {
      myvalue: false
    };
  },
  computed: {
    POPUP_CLASS() {
      let str = "zan-popup";
      if (this.size == "bottom") {
        str += " zan-popup--bottom";
      } else if (this.size == "right") {
        str += " zan-popup--right";
      } else if (this.size == "top") {
        str += " zan-popup--top";
      } else if (this.size == "left") {
        str += " zan-popup--left";
      }
      if (this.myvalue) str += " zan-popup--show";
    }
  },
  mounted(){
      this.myvalue=this.value;
  },
  methods: {
    maskClick() {
      if (this.diffClose) return;
      this.myvalue = false;
    }
  },
  watch:{
      value:function(){
          this.myvalue=this.value;
      },
      myvalue:function(){
          this.$emit('input',this.myvalue);
      }
  }
};
</script>
