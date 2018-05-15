import {Vue, Component} from "vue-property-decorator";
import PageMixins from "mixins/PageMixins";
import {Env} from "services/support/Env";
import MFiled from "components/field.vue";

const debug = require('debug')('log:Index');

@Component({
  name: 'Index',
  mixins: [PageMixins],
  components: {
    MFiled,
  }
})
export default class Index extends Vue {
  mounted() {
  }
}
