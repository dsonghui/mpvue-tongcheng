<template>
  <radio-group class="zan-select__list qs-options" @change="change">
    <label v-for="item in ITEMS" :key="item.value">
      <view class="zan-cell" :class="item.value == myvalue ? '_selected':''">
        <radio class="zan-select__radio" :value="item.value" :checked="item.value === myvalue"/>
        <view class="zan-cell__bd">{{ item.name }}</view>
      </view>
    </label>
  </radio-group>
</template>

<script>
  import TypeValid from "../helpers/TypeValid";

  export default {
    name: "MQsOption",
    props: {
      items: {type: Array, required: true},
      value: {required: true},
      padding: {default: 0},
      namekey: '',
    },
    data() {
      return {myvalue: this.value};
    },

    mounted() {
      this.myvalue = String(this.value);
    },
    computed: {
      ITEMS() {
        var result = this.items.map(i => {
          return {
            value: String(i.value),
            name: this.namekey ? i[this.namekey] : i.name,
          };
        });
        return result;
      }
    },
    methods: {
      change(e) {
        this.$emit("input", this.parseValue(e.mp.detail.value));
      },
      parseValue(val) {
        // is BooleanString
        if (TypeValid.isBooleanString(val)) {
          return val === 'true';
        }
        if (TypeValid.isNumberString(val)) {
          return Number(val);
        }
        return val;
      }
    },
    watch: {
      value: function () {
        this.myvalue = String(this.value);
      }
    }
  };
</script>

