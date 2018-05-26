<template>
  <div class="feed-wrap">
    <div class="feed-body">
      <div class="feed-avatar">
        <Avatar :user="user"></Avatar>
      </div>
      <div class="feed-content">

        <div class="feed-content-header">
          <div class="feed-user-name">{{user.name}}</div>
          <div class="feed-time text-2gray">{{timetext}}</div>
        </div>

        <div class="feed-content-body">
          <div class="feed-textcontent">{{feed.feed_content}}</div>
          <FeedImage
            v-if="images.length > 0"
            :id="feedID"
            :pics="images"
          ></FeedImage>
        </div>

        <div class="feed-content-footer">
          <div class="feed-status">
            <div class="isflex" @click.prevent="handleLike">
              <span class="iconfont icon-like"></span>
              <span>{{ likeCount }}</span>
            </div>
            <div class="isflex" @click.prevent="handleComment">
              <span class="iconfont icon-i-message"></span>
              <span>{{ commentCount  }}</span>
            </div>
            <div class="isflex" @click.prevent="handleView">
              <span class="iconfont icon-view"></span>
              <span>{{ viewCount }}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import Avatar from "../avatar";
  import FeedImage from "./FeedImage";
  import Filters from "helpers/Filters.ts";

  export default {
    name: "FeedTimeLineItem",
    components: {FeedImage, Avatar},
    data() {
      return {}
    },
    props: {
      feed: Object,
    },
    computed: {
      isMine() {
        return true;// this.feed.user_id === this.CURRENTUSER.id;
      },
      feedID() {
        return this.feed.id;
      },
      comments() {
        return this.feed.comments.slice(0, 5);
      },
      liked: {
        get() {
          return !!this.feed.has_like;
        },
        set(val) {
          this.feed.has_like = val;
        }
      },
      likeCount: {
        get() {
          return this.feed.like_count || 0;
        },
        set(val) {
          this.feed.like_count = ~~val;
        }
      },
      commentCount: {
        get() {
          return this.feed.feed_comment_count || 0;
        },
        set(val) {
          val > 0, (this.feed.feed_comment_count = val);
        }
      },
      viewCount() {
        return this.feed.feed_view_count || 0;
      },
      time() {
        return this.feed.created_at || "";
      },
      timetext() {
        return Filters.time2tips(this.time);
      },
      user() {
        const user = this.feed.user;
        return user && user.id ? user : {};
      },
      needPay() {
        const {paid_node} = this.feed;
        return paid_node && !paid_node.paid;
      },
      images() {
        return this.feed.images || [];
      },
      video() {
        return this.feed.video || false;
      },
      body() {
        return this.feed.feed_content || "";
      },
      has_collect: {
        get() {
          return this.feed.has_collect;
        },
        set(val) {
          this.feed.has_collect = val;
        }
      },
      timeLineText() {
        const text = Filters.time2txt(this.time);
        const len = text.length;
        return len > 4
          ? `<span>${text.substr(0, len - 2)}</span><span>${text.substr(
            -2,
            2
          )}</span>`
          : `<span>${text}</span>`;
      },
      title() {
        return this.feed.title || "";
      }
    },
    mounted() {
    },
    methods: {}
  }
</script>

<style lang="less">
  .feed-wrap {
    border-top: 1px solid #ddd;
    .feed-body {
      padding: 10px;
      display: flex;
      .feed-avatar {
        width: 60px;
      }
      .feed-content {
        flex: 1;
        margin-left: 10px;
      }
      .feed-content-header {
        display: flex;
        .feed-user-name {
          flex: 1;
        }
        .feed-time {
          font-size: 0.6em;
        }
      }
      .feed-content-body {

      }
      .feed-content-footer {
        .feed-status {
          display: flex;
          font-size: 12PX;
          color: #ccc;
          .isflex {
            margin-right: 20px;
            align-items: center;
          }
          .iconfont {
            font-size: 18PX;
            margin-right: 5px;
          }
        }
      }
    }

    .feed-textcontent {
      color: #555;
      margin-bottom: 10px;
      font-size: 14px;
    }
  }
</style>
