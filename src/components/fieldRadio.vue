<template>
  <div class="zan-cell zan-field">
    <div class="zan-cell__bd zan-field__title" v-if="label">{{label}}</div>
    <div class="zan-cell__ft">
      <MRadio :items="items" :isInline="isInline" :padding="padding" :namekey="namekey"
              :color="color" v-model="myvalue"></MRadio>
    </div>
  </div>
</template>

<script>
  import fieldControlMixins from "../mixins/fieldControlMixins";
  import MRadio from "./radio";

  export default {
    name: "m-field-radio",
    components: {MRadio},
    mixins: [fieldControlMixins],
    props: {
      items: {type: Array, required: true, default: []},
      color: {type: String, default: "#ff4444"},
      namekey: {type: String, default: 'text'},
      padding: {default: 0},
      isInline: {default: false}
    },
    computed: {},
    data() {
      return {
        myvalue: null,
      };
    },
    mounted() {
      this.myvalue = this.value;
    },
    methods: {},
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
