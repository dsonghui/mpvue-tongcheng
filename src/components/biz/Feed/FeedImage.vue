<template>
  <div
    class="m-pics"
    :class="wrapClass"
  >
    <div class="m-pics-list">
      <div class="m-pic-item" v-for='(img, img_index) in MyPics' :key="id + '-' + img_index">
        <div class="'m-pics-box" :class="{'gif': img.isGif, 'long':img.isLongImg}">
          <img
            class="m-pic"
            :lazy-load="true"
            :src="img.url"
            :data-url="img.url"
            @click='handleClick'
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import JCConfig from 'config/index';

  export default {
    name: "FeedImage",
    data() {
      return {}
    },
    props: {
      id: {
        type: Number,
        required: true
      },
      pics: {
        type: Array
      }
    },
    computed: {
      wrapClass() {
        return `m-pics-${this.pics.length}`;
      },
      MyPics() {
        return this.pics.map(pic => {
          return {
            url: JCConfig.ImageHOST + '/api/v2/files/' + pic.file,
            isGif: (pic.mime || '').indexOf('gif') > -1,
            isLongImg: this.isLongImg(pic),
          };
        });
      }
    },
    methods: {
      handleClick($event) {
        let url = $event.target.dataset.url || '';
        if (url) {
          wx.previewImage({
            current: url,
            urls: this.MyPics.map(pic => pic.url)
          });
        }
      },
      isLongImg(img) {
        const [w, h] = img.size.split("x");
        img.w = parseInt(w);
        img.h = parseInt(h);
        return h > 3 * w;
      },
      longStyle(w, h) {
        return {
          width: w > 518 ? "518px" : w + "px",
          paddingBottom: h / w * 100 + "%"
        };
      }
    }
  };
</script>
<style lang='less'>
  .m-pic {
    cursor: pointer;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .m-pics {
    width: 100%;
    overflow-y: hidden;
    .m-pics-list {
      text-align: left;
      margin-bottom: -4px;
      font-size: 0;
      max-width: 518px;
      max-height: 692px;
      .m-pic-item {
        font-size: 0;
        line-height: 1;
        width: 1/3 * 100%;
        // vertical-align: top;
        display: inline-block;
        padding: 0 2px 2px 0; /*no*/
        margin: 0 !important;
      }
    }
    .m-pics-box {
      display: inline-block;
      position: relative;
      padding-bottom: 100%;
      width: 100%;
      height: 0;
      max-width: 100%;
      background-color: #f4f5f6;
      .m-pic:after {
        position: absolute;
        bottom: 3px;
        right: 3px;
        background-color: #c8a06c;
        text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
        background-image: -webkit-linear-gradient(
          25deg,
          #e8d1b3 0%,
          rgba(232, 209, 179, 0.6) 100%
        );
        background-image: -o-linear-gradient(
          25deg,
          #e8d1b3 0%,
          rgba(232, 209, 179, 0.6) 100%
        );
        background-image: linear-gradient(
          115deg,
          #e8d1b3 40%,
          rgba(232, 209, 179, 0.6) 50%
        );
        text-align: center;
        width: 20px;
        padding: 3PX;
        height: 10px;
        line-height: 10px;
        font-size: 12PX;
        color: #fff;
      }

      &.long {
        .m-pic:after {
          display: block;
          content: "长图";
        }
      }
      &.gif {
        .m-pic:after {
          display: block;
          content: "GIF";
          display: block;
        }
      }
      .m-pic {
        // background-position: top center;
        max-height: 690px;
      }
    }
    .m-pics-1 {
      text-align: left;
      .m-pics-list {
        display: inline-block;
        overflow-y: hidden;
      }
      .m-pic-item {
        width: 100%;
        .m-pics-box {
          max-width: 100%;
        }
      }
      .long {
        max-width: 100%;
      }
    }
    .m-pics-2,
    .m-pics-4 {
      .m-pic-item {
        width: 50%;
      }
    }
    .m-pics-5 {
      position: relative;
      .m-pic-item:nth-child(1),
      .m-pic-item:nth-child(2) {
        width: 50%;
      }
    }
    .m-pics-8 {
      .m-pic-item:nth-child(4),
      .m-pic-item:nth-child(5) {
        width: 50%;
      }
    }
    .m-pics-7 {
      .m-pic-item:nth-child(1),
      .m-pic-item:nth-child(2),
      .m-pic-item:nth-child(6),
      .m-pic-item:nth-child(7) {
        width: 50%;
      }
    }
  }
</style>
