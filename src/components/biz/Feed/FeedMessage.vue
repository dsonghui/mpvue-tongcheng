<template>
  <div v-if="isShow">
    <div class="feed-message-pop">
    </div>
    <div class="feed-message">
      <input class="feed-message-input"
             v-model.lazy="myvalue" :placeholder="placeholder" :focus="isFocus" confirm-type="send"
             @confirm="handleConfirm"/>
    </div>
  </div>
</template>
<script>
  import MyBus from "helpers/MyBus";
  const myObj = {
    num: 0
  }

  export default {
    name: "FeedMessage",
    data() {
      return {
        isShow: false,
        isFocus: true,
        loading: false,
        onOk: null,
        placeholder: '请输入评论内容',
        myvalue: '',
      }
    },
    props: {},
    computed: {},
    mounted() {
      myObj.num++;
      console.log('FeedMessage mounted ' + myObj.num + ' time');
      MyBus.$on('commentInput', ({onOk}) => {
        if (typeof onOk === 'function') this.onOk = onOk;
        this.isShow = true;
      })
      MyBus.$on('commentInput:close', (status) => {
        console.log('commentInput:close');
        status && this.clean();
        this.cancel();
      })
    },
    methods: {
      handleConfirm(e) {
        let value = e.mp.detail.value;
        if (this.loading) return;
        this.loading = true;
        if (typeof this.onOk === 'function') this.onOk(value);
        this.loading = false;
      },
      clean() {
        this.myvalue = '';
      },
      cancel() {
        this.placeholder = "请输入评论内容";
        this.loading = false;
        this.onOk = null;
        this.isShow = false;
      },

    },
    destroyed() {
      this.clean();
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
