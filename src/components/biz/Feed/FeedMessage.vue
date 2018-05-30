<template>
  <div v-if="isShow">
    <div class="feed-message-pop">
    </div>
    <div class="feed-message">
      <input class="feed-message-input" placeholder="请输入评论内容" :focus="isFocus" confirm-type="send"
             @confirm="handleConfirm"/>
    </div>
  </div>
</template>
<script>
  import MyBus from "helpers/MyBus";

  export default {
    name: "FeedMessage",
    data() {
      return {
        isShow: false,
        isFocus: true
      }
    },
    props: {},
    computed: {},
    mounted() {
      console.log('FeedMessage mounted');
      MyBus.$on('commentInput', (p) => {
        console.log(p);
        this.isShow = true;
      })
    },
    methods: {
      handleConfirm(e) {
        let value = e.mp.detail.value;
        console.log(value);
      }
    }
  };
</script>
<style lang='less'>
  .feed-message {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 6px;
    background: #f1f1f1;
    z-index: 201;
    .feed-message-input {
      border: 1px solid #ddd;
      border-radius: 4px;
      background: #fff;
      font-size: 16PX;
    }
  }

  .feed-message-pop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, .2);
    z-index: 101;
  }
</style>
