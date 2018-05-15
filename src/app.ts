import {Vue, Component} from 'vue-property-decorator'
import PageMixins from "mixins/PageMixins";
import {mixins} from 'vue-class-component';
import ExtendVue from './plugins/extendVue';

Vue.use(new ExtendVue());

const debug = require('debug')('log:App');

// 必须使用装饰器的方式来指定components
@Component({
  mpType: 'app', // mpvue特定,
}as any)
export default class App extends mixins(PageMixins) {
  // app hook
  onLaunch() {
    let opt = this.$root.$mp.appOptions;
    debug('onLaunch', opt);

    this.$toast.success('onLaunch');

    wx.login({
      success(r) {
        // 小程序登录
        console.log(r);
      }
    });
  }

  onShow() {
  }

  onHide() {
  }

  mounted() {
  }

}
