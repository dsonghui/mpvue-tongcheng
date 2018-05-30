<template>
  <div class="feed-timeline">
    <feed-time-line-item :feed="feed" :key="feed.id" v-for="(feed, feed_index) in feeds"></feed-time-line-item>
    <feed-message></feed-message>
  </div>
</template>

<script>
  import FeedApi from 'api/services/FeedApi';
  import FeedTimeLineItem from "./FeedTimeLineItem";
  import FeedMessage from "./FeedMessage";

  export default {
    name: "FeedTimeLine",
    components: {FeedMessage, FeedTimeLineItem},
    data() {
      return {
        feeds: []
      }
    },
    props: {
      type: String,
    },
    mounted() {
      this.__init_feeds();
    },
    methods: {
      __init_feeds() {
        return FeedApi.getFeeds('new', 15).then(r => {
          if (Array.isArray(r.feeds)) {
            this.feeds = r.feeds;
          }
        })
      }
    }
  }
</script>

<style lang="less">
  .feed-timeline {
    .feed-wrap {

    }
  }
</style>
