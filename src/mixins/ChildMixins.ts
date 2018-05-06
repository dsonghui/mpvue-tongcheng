/**
 * 需要 选选择Child的页面
 * Author: david.deng<david.deng@jcinfotech.com>
 * Date: 2018/5/3
 */
import { Vue, Component } from "vue-property-decorator";
import { ChildInfoModel } from "api/services/ChildinfoService";
import MyStore from "store/index";

@Component({})
export default class ChildMixins extends Vue {

  isChildMixins: string = '';
  get Child() {
    return MyStore.getters.currentChild;
  }
  onShow() {
    console.log('ChildMixins onShow');
  }
}
