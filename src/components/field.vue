<template>
  <div :class="VIEW_CLASS">
    <div v-if="label" class="zan-cell__hd zan-field__title">{{label}}</div>
    <textarea
      v-if="type === 'textarea'"
      auto-heigh
      :disabled="disabled"
      v-model.lazy="myvalue"
      :placeholder="placeholder"
      :class="INPUT_CLASS"
      placeholder-class="zan-field__placeholder"
      @focus="focus"
      @blur="blur"></textarea>

    <input
      v-if="type==='number'"
      type="number"
      :disabled="disabled"
      v-model.lazy="myvalue"
      :placeholder="placeholder"
      :class="INPUT_CLASS"
      placeholder-class="zan-field__placeholder"
      @focus="focus"
      @blur="blur"/>
    <input
      v-if="type==='tel'"
      type="tel"
      :disabled="disabled"
      v-model.lazy="myvalue"
      :placeholder="placeholder"
      :class="INPUT_CLASS"
      placeholder-class="zan-field__placeholder"
      @focus="focus"
      @blur="blur"/>
    <input
      v-else
      type="text"
      :disabled="disabled"
      v-model.lazy="myvalue"
      :placeholder="placeholder"
      :class="INPUT_CLASS"
      placeholder-class="zan-field__placeholder"
      @focus="focus"
      @blur="blur"/>
  </div>
</template>
<script>
  export default {
    name: "m-filed",
    props: {
      type: {type: String, default: "text"},
      mode: {type: String}, //selector
      disabled: {type: Boolean, default: false},
      label: {type: String},
      isError: {type: Boolean, default: false},
      isFocus: {type: Boolean, default: false},
      value: {type: String, require: true, default: ""},
      placeholder: {type: String, default: ""},
      isRight: {type: Boolean, default: false}
    },
    data() {
      return {
        myvalue: this.value
      }
    },
    computed: {
      VIEW_CLASS() {
        return (
          "zan-cell zan-field" +
          (this.isError ? " zan-field--error" : "") +
          (this.mode === "wrapped" ? " zan-field--wrapped" : "")
        );
      },
      INPUT_CLASS() {
        return (
          "zan-field__input zan-cell__bd" +
          (this.isRight ? " zan-field__input--right" : "")
        );
      }
    },
    mounted() {
      this.myvalue = this.value;
    },
    methods: {
      focus() {
        this.$emit("focus");
      },
      blur() {
        this.$emit("blur");
      }
    },
    watch: {
      value: function () {
        this.myvalue = this.value;
      },
      myvalue: function (v, o) {
        if (v !== 0) {
          this.$emit("input", this.myvalue);
        }
      }
    }
  };
</script>
