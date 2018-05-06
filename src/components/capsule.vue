<template name="capsule">
  <div :class="TYPECLASS">
    <block v-if="IS_COLOR">
      <div
        class="zan-capsule__left"
        :style="COLOR_ONE_STYLE"
      >{{ leftText }}</div>
      <div
        class="zan-capsule__right"
        :style="COLOR_TWO_STYLE"
      >{{ rightText }}</div>
    </block>
    <block v-else>
      <div class="zan-capsule__left">{{ leftText }}</div>
      <div class="zan-capsule__right">{{ rightText }}</div>
    </block>
  </div>
</template>

<script>
export default {
  name:'m-capsule',
  props: {
    leftText: { type: String, required: true },
    rightText: { type: String, required: true },
    isDanger: { type: Boolean, default: false },
    color: { type: String }
  },
  computed: {
    TYPECLASS() {
      return "zan-capsule zan-capsule--" + this.isDanger ? "danger" : "";
    },
    IS_COLOR() {
      return this.color && this.color.length > 0;
    },
    COLOR_ONE_STYLE() {
      return "background: " + this.color + "; border-color: " + this.color;
    },
    COLOR_TWO_STYLE() {
      return "color: " + this.color + "; border-color:" + this.color;
    }
  }
};
</script>
