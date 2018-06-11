<template>
  <a
    :href="path"
    class="m-avatar-box"
    :class="styles">
    <img v-if="avatar" :src="avatar" @error="handelError" class="m-avatar-img">
    <i v-if="icon" :style='icon' class="m-avatar-icon"></i>
  </a>
</template>
<script>
  export default {
    name: "avatar",
    props: {
      size: {
        type: String,
        default: "def"
      },
      user: {
        required: true
      }
    },
    mounted() {
    },
    computed: {
      uid() {
        return this.user.id;
      },
      sex() {
        return ~~this.user.sex;
      },
      icon() {
        const {verified = {}} = this.user;
        return verified && verified.icon
          ? {
            "background-image": `url("${verified.icon}")`
          }
          : false;
      },
      path() {
        return this.uid ? `/user/${this.uid}` : "javascript:;";
      },
      styles() {
        const sex = ["secret", "man", "woman"];
        return [`m-avatar-box-${this.size}`, `m-avatar-box-${sex[this.sex]}`];
      },
      avatar: {
        get() {
          return this.user.avatar;
        },
        set(val) {
          this.user.avatar = val;
        }
      }
    },
    methods: {
      handelError() {
        this.avatar = null;
      }
    }
  };
</script>

<style lang="less">
  .m-avatar-box {
    width: 45px;
    height: 45px;
    overflow: hidden;
    border-radius: 4PX;
    .m-avatar-img {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
  }
</style>
