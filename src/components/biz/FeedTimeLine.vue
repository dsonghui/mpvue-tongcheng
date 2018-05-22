<template>
  <div class="feed-timeline">
    feed-timeline
  </div>
</template>

<script>
  import FeedApi from 'api/services/FeedApi';

  export default {
    name: "FeedTimeLine",
    props: {
      type: String,
    },
    mounted() {
      FeedApi.getFeeds('new')
    }
  }
</script>

<style lang="less">
  .feed-timeline {

  }
</style>
