import {Vue, Component} from "vue-property-decorator";
import PageMixins from "mixins/PageMixins";
import FeedDetail from "components/biz/Feed/FeedDetail.vue";
import MyBus from "helpers/MyBus";

const debug = require('debug')('log:Index');

@Component({
  name: 'FeedDetailPage',
  mixins: [PageMixins],
  components: {
    FeedDetail
  }
})
export default class FeedDetailPage extends Vue {
  isShow: boolean = false;
  time: number = 0;

  mounted() {
    console.log('FeedDetailPage mounted');
    this.time++;
    MyBus.$on('commentInput', ({onOk}) => {
      this.isShow = true;
      console.log('commentInput on FeedDetail' + this.time);
    })
  }
}
