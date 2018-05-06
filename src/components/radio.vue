<template>
  <radio-group class="zan-select__list" @change="change" :class=" isInline ? 'flex' : ''">
    <label v-for="item in ITEMS" :key="item.value">
      <view class="zan-cell">
        <radio class="zan-select__radio" :value="item.value" :checked="item.value == myvalue"/>
        <view class="zan-cell__bd" :style="item.style">{{ item.name }}</view>
        <view v-if="item.value == myvalue " class="zan-cell__ft">
          <icon type="success_no_circle" :color="item.color" size="14"></icon>
        </view>
      </view>
    </label>
  </radio-group>
</template>

<script>
  export default {
    name: "m-radio",
    props: {
      items: {type: Array, required: true},
      value: {required: true},
      color: {type: String, default: "#ff4444"},
      namekey: {type: String, default: 'text'},
      padding: {default: 0},
      isInline: {default: false}
    },
    data() {
      return {myvalue: this.value};
    },

    computed: {
      ITEMS() {
        return this.items.map(i => {
          console.log();
          return {
            value: i.value,
            name: this.namekey ? i[this.namekey] : i.name,
            style: this.getItemStyle(i, this.myvalue),
            color: this.color
          };
        });
      }
    },
    methods: {
      getItemStyle(item, checkedValue) {
        let padding = this.padding * 10;
        let style = "padding-left: " + padding + "px;";
        // 如果为选中状态，则高亮
        if (item.value == checkedValue) {
          style += "color: " + this.color;
        }
        return style;
      },
      change(e) {
        this.myvalue = e.mp.detail.value;
        this.$emit("input", this.myvalue);
      }
    },
    watch: {
      value: function () {
        this.myvalue = this.value;
        this.$emit("input", this.myvalue);
      }
    }
  };
</script>

<style>
  .zan-select__list .zan-select__radio {
    display: none;
  }
</style>
