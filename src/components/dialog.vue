<template name="zan-dialog">
  <div :class="DIV_CLASS">
    <div class="zan-dialog--mask"></div>
    <div class="zan-dialog--container">
      <div v-if="HAS_TITLE" class="zan-dialog__header">{{ title }}</div>
      <div :class="TITLE_CONTENT_CLASS">
        <slot></slot>
      </div>
      <div :class="FOOTER_CLASS">
        <block v-if="HAS_BUTTONS">
          <button v-for="(item,index) in BUTTONS" :key="index" class="zan-dialog__button zan-btn"
                  @tap="buttonClick(item.command)" :style="item.COLOR">{{ item.text }}
          </button>
        </block>
        <block v-else>
          <button class="zan-dialog__button zan-btn" @tap.stop="buttonClick('cancel')" style="color:#333">取消</button>
          <button class="zan-dialog__button zan-btn" @tap.stop="buttonClick('sure')" style="color:#3CC51F">确定</button>
        </block>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'm-dialog',
    props: {
      title: {
        type: String
      },
      value: {
        type: Boolean,
        required: true
      },
      buttons: {
        type: Array,
        default: []
      },
      isVertical: {
        type: Boolean
      }
    },
    data() {
      return {
        myvalue: this.value,
        resolve: null,
        reject: null,
      }
    },
    computed: {
      BUTTONS() {
        this.buttons.map(item => {
          item.COLOR = 'color:' + (item.color ? item.color : '#333');
          return item;
        });
      },
      HAS_BUTTONS() {
        return this.buttons && this.buttons.length > 0;
      },
      HAS_TITLE() {
        return this.title && this.title.length > 0;
      },
      DIV_CLASS() {
        return 'zan-dialog' + (this.myvalue ? ' zan-dialog--show' : '');
      },
      TITLE_CONTENT_CLASS() {
        return 'zan-dialog__content' + (this.HAS_TITLE ? ' zan-dialog__content--title' : '');
      },
      FOOTER_CLASS() {
        return 'zan-dialog__footer ' + (this.isVertical ? 'zan-dialog__footer--vertical' :
          'zan-dialog__footer--horizon');
      }
    },
    mounted() {
      this.myvalue = this.value;
    },
    methods: {
      buttonClick(command) {
        console.log(command);
        this.$emit('command', command);
        if (command === 'sure' && this.resolve) {
          this.resolve();
          this.myvalue = false;
        }
        if (command === 'cancel' && this.reject) {
          this.reject();
          this.myvalue = false;
        }
      },
      confirm() {
        this.myvalue = true;
        return new Promise((resolve, reject) => {
          this.resolve = resolve;
          this.reject = reject;
        });
      }
    },
    watch: {
      'value': function () {
        this.myvalue = this.value;
      },
      'myvalue': function () {
        this.$emit('input', this.myvalue);
      }
    },
  };

</script>
