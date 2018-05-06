<template>
  <picker :mode="mode" :disabled="disabled" :value="innerValue" :range="source" :start="start" :end="end"
          :fields="fields"
          @change="sureChange"
          @columnchange="columnchange"
          @cacel="cacel"
  >
    <div>
      {{myvalue}}
    </div>
  </picker>
</template>

<script>
  export default {
    name: "m-select",
    props: {
      mode: {type: String, default: "selector"}, //selector,multiSelector,time,date,region
      disabled: {type: Boolean, default: false},
      value: {required: true},
      //selector,multiSelector有效
      source: {
        type: Array,
        required: true,
        default: function () {
          return [];
        }
      },
      rangeKey: {type: String},
      //time,date有效
      start: {type: String},
      end: {type: String},
      fields: {type: String, default: "day"},
      //region有效
      customItem: {type: String}
    },
    data() {
      return {
        myvalue: null,
        innerValue: null
      };
    },
    mounted() {
      this.myvalue = this.value;
    },
    methods: {
      cancel() {
        this.$emit("cancel");
        this.innerValue = this.myvalue;
      },
      sureChange(e) {
        this.$emit("sure", e.mp.detail.value);
        this.myvalue = e.mp.detail.value;
      },
      columnchange(e) {
        this.$emit("columnchange", e);
      }
    },
    watch: {
      value: function () {
        this.innerValue = this.value;
        this.myvalue = this.value;
      },
      myvalue: function () {
        this.$emit("input", this.myvalue);
      }
    }
  };
</script>
