<template>
  <div :class="VIEW_CLASS">
    <div v-if="label" class="zan-cell__hd zan-field__title">{{label}}</div>
    <div class="zan-cell__bd">
      <picker :mode="mode" :disabled="disabled" :value="MyInnerValue" :range="source"
              :range-key="rangeKey"
              @change="sureChange"
              @columnchange="columnchange"
              @cacel="cacel"
      >
        <div style="width: 100%;min-height:22px">
          {{showText}}
        </div>
      </picker>
    </div>
  </div>
</template>

<script>
  import fieldControlMixins from "../mixins/fieldControlMixins";

  export default {
    name: "m-field-select",
    mixins: [fieldControlMixins],
    props: {
      mode: {type: String, default: "selector"}, //selector,multiSelector,time,date,region
      source: {
        type: Array,
        required: true,
        default: function () {
          return [];
        }
      },
      rangeKey: {type: String, default: 'text'},
      rangeValue: {type: String, default: 'value'}
    },
    computed: {
      showText() {
        let t = [];
        let valueArr = Array.isArray(this.value) ? this.value : [this.value];
        this.source.forEach(item => {
          if (valueArr.indexOf(item[this.rangeValue]) !== -1) {
            t.push(item[this.rangeKey]);
          }
        });
        return t.join(',');
      },

      /**
       * 是否多选
       */
      isMultiple() {
        return this.mode === 'multiSelector';
      },
      isReady() {
        return this.source.length > 0;
      },
      MyInnerValue() {
        return this.isMultiple ? this.innerValue : (this.innerValue.length > 0 ? this.innerValue[0] : null);
      }
    },
    data() {
      return {
        myvalue: [],
        innerValue: [],
      };
    },
    mounted() {
      this.__initMyValue();
      this.__initInnerValue();
    },
    methods: {
      __initMyValue() {
        if (Array.isArray(this.value)) {
          this.myvalue = this.value.map(i => i);
        } else {
          this.myvalue = this.value || this.value === 0 ? [this.value] : [];
        }
      },
      cancel() {
        this.$emit("cancel");
        this.__initMyValue();
      },
      sureChange(e) {
        this.$emit("sure", e.mp.detail.value);
        let index = Number(e.mp.detail.value);
        this.myvalue = [this.source[index][this.rangeValue]];
      },
      columnchange(e) {
        this.$emit("columnchange", e);
      },
      __initInnerValue() {
        if (this.isReady) {
          let indexArr = [];
          this.source.forEach((item, index) => {
            if (this.myvalue.indexOf(item[this.rangeValue]) !== -1) {
              indexArr.push(index);
            }
          });
          this.innerValue = indexArr;
        }
      }
    },
    watch: {
      value: function () {
        this.__initMyValue();
        this.__initInnerValue();
      },
      myvalue: function (v, o) {
        if (v !== o && this.myvalue.length > 0) {
          this.$emit("input", this.isMultiple ? this.myvalue : this.myvalue[0]);
        }
      }
    }
  };
</script>
