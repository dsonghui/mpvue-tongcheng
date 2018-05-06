<template>
  <div class="zan-panel">
    <div v-if="title" class="zan-panel__title">{{title}}</div>
    <div class="zan-panel__content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'm-panel',
    data() {
      return {
        aa: 'm-panel AA',
      };
    },
    props: {
      title: {type: String}
    }
  }
</script>
