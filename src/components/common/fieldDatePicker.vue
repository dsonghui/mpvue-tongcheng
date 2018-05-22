<template>
  <div :class="VIEW_CLASS" >
    <div v-if="label" class="zan-cell__hd zan-field__title">{{label}}</div>
    <div class="zan-cell__bd">
      <picker :mode="mode" :disabled="disabled" :value="innerValue" :range="source" :start="start" :end="end"
              :fields="fields"
              @change="sureChange"
              @columnchange="columnchange"
              @cacel="cacel"
      >
        <div style="width: 100%;min-height:22px">
          {{myvalue}}
        </div>
      </picker>
    </div>
  </div>
</template>

<script>
  import fieldControlMixins from "../mixins/fieldControlMixins";

  export default {
    name: "m-field-datepicker",
    mixins: [fieldControlMixins],
    props: {
      mode: {type: String, default: "date"}, //selector,multiSelector,time,date,region
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
    computed: {},
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
