<template>
  <text>{{showtext}}</text>
</template>
<script>
  export default {
    name: 'm-source-show',
    data() {
      return {};
    },
    computed: {
      showtext() {
        let t = [];
        let valueArr = Array.isArray(this.value) ? this.value : [this.value];
        this.source.forEach(item => {
          if (valueArr.indexOf(item[this.rangeValue]) !== -1) {
            t.push(item[this.rangeKey]);
          }
        });
        return t.join(',');
      }
    },
    props: {
      value: {type: Number},
      source: {type: Array, default: []},
      rangeKey: {type: String, default: 'text'},
      rangeValue: {type: String, default: 'value'}
    }
  }
</script>
