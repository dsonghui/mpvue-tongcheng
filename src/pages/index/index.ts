import {Vue, Component} from "vue-property-decorator";
import PageMixins from "mixins/PageMixins";
import FeedTimeline from "components/biz/Feed/FeedTimeLine.vue";

const debug = require('debug')('log:Index');

@Component({
  name: 'Index',
  mixins: [PageMixins],
  components: {
    FeedTimeline
  }
})
export default class Index extends Vue {
  mounted() {
    console.log('mounted==');
  }
}
