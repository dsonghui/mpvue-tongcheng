<template>
  <p class="comment-item">
    <span class="m-comment-usr"> <a :href="'/user/' + user.id"> {{ user.name }} </a></span>
    <span class="m-comment-usr" v-if="replyUser">回复<a :href="'/user/'+ replyUser.id ">{{ replyUser.name }}</a></span>
    <span class="m-comment-body" @click="handelClick">{{ body }}</span>
    <span v-if="pinned" class="m-art-comment-icon-top" style="margin-left: 5px; height: auto">置顶</span>
  </p>
</template>
<script>
  export default {
    name: "comment-item",
    props: {
      comment: {
        type: Object,
        required: true
      }
    },
    computed: {
      isMine() {
        return this.$store.getters.CURRENTUSER.id === this.user.id;
      },
      user() {
        return this.comment.user || {};
      },
      replyUser() {
        const {reply} = this.comment;
        return reply && reply.id ? reply : null;
      },
      pinned() {
        return this.comment.pinned;
      },
      body() {
        return this.comment.body || "";
      }
    },
    methods: {
      handelClick() {
        const p = this.isMine
          ? {
            isMine: true
          }
          : {
            isMine: false,
            placeholder: `回复${this.user.name}`,
            reply_user: this.user.id
          };
        this.$emit("on-click", p);
      }
    },
    mounted() {
      if (this.user && !this.$store.getters.isHasUser(this.user.id)) {
        this.$store.commit("SAVE_USER", this.user);
      }
      if (this.replyUser && !this.$store.getters.isHasUser(this.replyUser.id)) {
        this.$store.commit("SAVE_USER", this.replyUser);
      }
    }
  };
</script>
<style lang="less">
  @import "../../../less/base/vars.less";

  .comment-item {
    display: flex;
    .m-comment-usr {
      margin: 0 5px;
      color: @text-color1;
    }
    .m-comment-body:before {
      margin-left: -5px;
      content: "：";
      color: @text-color3;
    }
  }
</style>
