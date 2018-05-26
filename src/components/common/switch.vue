<template>
  <view
    :class="SWITCH_CLASS"
    :data-checked="CHECKED"
    :data-loading="loading"
    :data-disabled="disabled"
    @tap="tap"
  >
    <div class="zan-switch__circle">
      <div :hidden="!loading" class="zan-switch__loading"></div>
    </div>
    <div class="zan-switch__bg"></div>
  </view>
</template>

<script>
export default {
  name:'m-switch',
  props: {
    value: { require: true },
    activeValue: { default: true },
    inactiveValue: { default: true },
    disabled: { default: false },
    loading: { default: false }
  },
  data:function() {
    return {
      myvalue: ''
    }
  },
  mounted:function(){
    console.log(1);
    this.myvalue=this.value;
  },
  computed:{
    SWITCH_CLASS:function() {
        return 'zan-switch zan-switch--' + (this.CHECKED ? 'on' : 'off') + (this.disabled ? 'zan-swtich--disabled' : '');
    },
    CHECKED:function() {
        return this.myvalue === this.activeValue
    }
  },
  methods: {
    tap: function() {
      this.myvalue = !this.myvalue
      this.$emit('input', this.myvalue)
    }
  },
  watch:{
    'value':function(){
      this.myvalue = this.value;
    }
  }
};
</script>