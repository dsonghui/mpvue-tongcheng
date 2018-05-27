<template>
  <div class="feed-wrap">
    <div class="feed-body">
      <div class="feed-avatar">
        <Avatar :user="user"></Avatar>
      </div>
      <div class="feed-content" @click="handleView">

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
            <div class="isflex" @click.stop="handleLike">
              <span class="iconfont icon-like" v-if="!liked"></span>
              <span class="iconfont icon-like1 feed-liked" v-if="liked"></span>
              <span>{{ likeCount }}</span>
            </div>
            <div class="isflex" @click.stop="handleComment">
              <span class="iconfont icon-i-message"></span>
              <span>{{ commentCount  }}</span>
            </div>
            <div class="isflex" @click.stop="handleView">
              <span class="iconfont icon-view"></span>
              <span>{{ viewCount }}</span>
            </div>
          </div>

          <div class="feed-comments">
            <ul v-if="commentCount > 0" class="m-card-comments">
              <li
                v-for="com in comments"
                v-if="com.id"
                :key="com.id">
                <comment-item :comment="com" @on-click="commentAction"/>
              </li>
            </ul>
            <div class="feed-comments-more" v-if="commentCount > 5" @click="handleView('comment_list')">
              <a>查看全部评论>></a>
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
  import Filters from "helpers/Filters";
  import MyBus from "helpers/MyBus";
  import FeedApi from "api/services/FeedApi";
  import CommentItem from "./CommentItem";

  export default {
    name: "FeedTimeLineItem",
    components: {CommentItem, FeedImage, Avatar},
    data() {
      return {
        fetching: false,
      }
    },
    props: {
      feed: Object,
    },
    computed: {
      isMine() {
        return this.feed.user_id === this.$store.getters.CURRENTUSER.id;
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
      images() {
        return this.feed.images || [];
      },
      video() {
        return this.feed.video || false;
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
      }
    },
    mounted() {
      this.user && this.$store.commit("SAVE_USER", this.user);
    },
    methods: {
      handleView() {
        let path = this.AppUrls.FeedDetail + '?id=' + this.feedID;
        this.$route.go(path);
      },
      handleLike() {
        if (this.fetching) return;
        (this.liked ? FeedApi.unlike(this.feedID) : FeedApi.like(this.feedID)).then(r => {
          this.fetching = false;
          this.liked
            ? ((this.liked = false), (this.likeCount -= 1))
            : ((this.liked = true), (this.likeCount += 1));
        }).catch(e => {
          this.fetching = false;
          throw e;
        });
      },
      handleComment({placeholder, reply_user}) {
        // MyBus.$emit("commentInput", {
        //   placeholder,
        //   onOk: text => {
        //     this.sendComment({body: text, reply_user});
        //   }
        // });
      },
      handleMore() {

      },
      commentAction({isMine = false, placeholder, reply_user}) {

      },
      sendComment({reply_user: replyUser, body}) {
        const params = {};
        if (body && body.length > 0) {
          params.body = body;
          replyUser && (params["reply_user"] = replyUser);
          this.$http
            .post(`/feeds/${this.feedID}/comments`, params, {
              validataStatus: s => s === 201
            })
            .then(({data = {comment: {}}}) => {
              this.feed.feed_comment_count += 1;
              this.feed.comments.unshift(data.comment);
              this.$Message.success("评论成功");
              bus.$emit("commentInput:close", true);
            })
            .catch(() => {
              this.$Message.error("评论失败");
              bus.$emit("commentInput:close", true);
            });
        } else {
          this.$Message.error("评论内容不能为空");
        }
      }
    }
  }
</script>
<style lang="less">
  @import "../../../less/base/vars.less";

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
    .feed-comments {
      margin-bottom: 30px;
      color: @text-color3;
      font-size: 0.8em;
      .feed-comments-more {
        font-size: 0.8em;
      }
    }
    .feed-liked {
      color: #f33;
    }
  }
</style>
