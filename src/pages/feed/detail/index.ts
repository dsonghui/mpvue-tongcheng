import {Vue, Component, Watch} from "vue-property-decorator";
import PageMixins from "mixins/PageMixins";
import FeedDetail from "components/biz/Feed/FeedDetail.vue";
import FeedApi from "api/services/FeedApi";
import {Feed} from "api/entities/FeedEntity";

const debug = require('debug')('log:Index');

@Component({
  name: 'FeedDetailPage',
  mixins: [PageMixins],
  components: {
    FeedDetail
  }
})
export default class FeedDetailPage extends Vue {
  feedId: number = null;
  FeedModel: Feed = <any>{};

  mounted() {
    this.__updateFeedId();
    this.__updateFeedDetail();
  }

  __updateFeedId() {
    this.feedId = this.$mp.query.id ? this.$mp.query.id : 0;
  }

  __updateFeedDetail() {
    FeedApi.getFeed(this.feedId).then(r => {
      if (r) {
        this.FeedModel = r;
        return;
      }
      throw new Error('获取数据失败');
    })
  }

}
