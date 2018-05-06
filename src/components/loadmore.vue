<template>

  <block v-if="nomore">
    <div class="zan-loadmore zan-loadmore--nomore">
      <div class="zan-loadmore__tips">
        <div class="zan-loadmore__dot"></div>
      </div>
    </div>
  </block>

  <block v-if="nodata">
    <div class="zan-loadmore zan-loadmore--nodata">
      <div class="zan-loadmore__tips">{{ nodataStr }}</div>
    </div>
  </block>

  <block v-if="loading">
    <div class="zan-loadmore">
      <div class="zan-loading"></div>
      <div class="zan-loadmore__tips">加载中...</div>
    </div>
  </block>

</template>
<script>
export default {
  name: "m-loadmore",
  props: {
    loading: { type: Boolean, default: false },
    nodataStr: { type: String, default: "暂无数据" },
    nomore: { type: Boolean, default: false }
  }
};
</script>
