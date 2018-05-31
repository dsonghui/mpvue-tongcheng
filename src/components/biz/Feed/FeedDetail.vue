<template>
  <div
    class="feed-detail"
  >

  </div>
</template>
<script>

  import MyBus from "helpers/MyBus";
  const myObj = {
    num: 0
  }
  export default {
    name: "FeedDetail",
    data() {
      return {
        isShow:false,
      }
    },
    props: {
      id: {
        type: Number,
        required: true
      },
    },
    mounted(){
      myObj.num++;

    },
    computed: {
    },
    methods: {

    }
  };
</script>
<style lang='less'>

</style>
