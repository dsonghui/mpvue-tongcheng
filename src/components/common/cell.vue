<template>
  <div class="zan-cell" :class="{'last-cell' : isLastCell, 'zan-cell--access': isLink }" @click="cellTap">
    <div class="zan-cell__icon">
      <slot name="icon"></slot>
    </div>
    <div class="zan-cell__bd">
      <div v-if="title" class="zan-cell__text">{{ title }}</div>
      <div v-if="label" class="zan-cell__desc">{{ label }}</div>
      <slot></slot>
    </div>

    <div @tap="navigateTo" class="zan-cell__ft">
      <div v-if="value">{{ value }}</div>
      <div v-else>
        <slot name="footer"></slot>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "MCell",
    data: function () {
      return {
        isLastCell: true,
      };
    },
    computed: {},
    mounted() {
    },
    props: {
      title: {
        type: String,
      },
      label: {
        type: String,
      },
      value: {
        type: String,
      },
      onlyTapFooter: {
        type: Boolean,
      },
      isLink: {
        type: Boolean,
        default: false,
      },
      linkType: {
        type: String,
        default: 'navigateTo',
      },
      url: {
        type: String,
        default: ''
      }
    },
    methods: {
      navigateTo() {
        const url = this.url
        if (!this.isLink || !url || url === 'true' || url === 'false') return;
        if (['navigateTo', 'redirectTo', 'switchTab', 'reLaunch'].indexOf(this.linkType) === -1) {
          return
        }
        wx[this.linkType].call(wx, {url})
      },
      cellTap() {
        if (!this.onlyTapFooter) {
          this.navigateTo()
        }
      }
    }
  }
</script>
