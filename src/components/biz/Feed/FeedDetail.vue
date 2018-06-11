<template>
  <div
    class="feed-detail"
  >
    <div class="feed-detail-header isflex">
      <div class="feed-avatar">
        <Avatar :user="user"></Avatar>
      </div>
      <div class="feed-user-name">
        {{user.name}}
      </div>
    </div>
    <div class="feed-detail-body">
      <div class="feed-detail-content">
        {{feed.feed_content}}
      </div>
      <div class="feed-detail-images">
      </div>
      <div class="feed-detail-video">
      </div>
    </div>

    <div class="feed-detail-footer">
      <div class="feed-status">
        <div class="feed-detail-like-avatar f-f-1">
          <a href="" v-if='likeCount > 0'>
            <div
              :key="index"
              v-for="(likeMode, index) in likesAvatars"
              class="m-avatar-box tiny">
              <img :src="likeMode.user.avatar">
            </div>
            <span>{{ likeCount}}人点赞</span>
          </a>
        </div>
        <div class="feed-detail-viewcount text-right">
          <div>发布于{{ timetext }}</div>
          <div>{{ viewCount }}浏览</div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import Avatar from "../avatar";
  import Filters from "helpers/Filters";
  import MyStore from "../../../store";

  export default {
    name: "FeedDetail",
    components: {Avatar},
    data() {
      return {
        isShow: false,
      }
    },
    props: {
      feed: {
        type: Object,
        required: true
      },
    },
    mounted() {
    },
    computed: {
      isMine() {
        return this.feed.user_id === this.$store.getters.CURRENTUSER.id;
      },
      feedID() {
        return this.feed.id;
      },
      comments() {
        return this.feed.comments || [];
      },
      likes: {
        get() {
          let l = (this.feed.likes || []);
          return l.map(like => {
            return Object.assign({}, like, {
              user: MyStore.getters.getUserById(like.user_id)
            });
          }).slice(0, 5);
        },
        set(val) {
          this.feed.likes = val;
        }
      },
      likesAvatars() {
        return this.likes.filter(l => l.user && l.user.avatar)
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
      images() {
        return this.feed.images || [];
      },
      video() {
        return this.feed.video || false;
      },

    },
    methods: {}
  };
</script>
<style lang='less'>
  .feed-detail {
    padding: 10px;
    .feed-user-name {
      margin-left: 10px;
    }
    .feed-detail-footer {
      .feed-status {
        display: flex;
        font-size: 14PX;
        color: #999;
        .isflex {
          margin-right: 20px;
          align-items: center;
        }
        .iconfont {
          font-size: 18PX;
          margin-right: 5px;
        }
        .feed-detail-like-avatar {

        }
      }
    }

  }
</style>
