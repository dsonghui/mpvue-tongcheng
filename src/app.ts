import {Vue, Component} from 'vue-property-decorator'
require('./plugins/extendJs');
import ExtendVue from './plugins/extendVue';
import {UsersService} from "services/UsersService";

Vue.use(new ExtendVue());

const debug = require('debug')('log:App');

// 必须使用装饰器的方式来指定components
@Component({
  mpType: 'app', // mpvue特定,
}as any)
export default class App extends Vue {
  // app hook
  onLaunch() {
    let opt = this.$root.$mp.appOptions;
    debug('onLaunch', opt);

    wx.login({
      success(r) {
        // 小程序登录
        console.log(r);
      }
    });

    /**
     * 初始化用户
     */
    UsersService.boot();


    console.log(UsersService.isLogin())
  }

  onShow() {
  }

  onHide() {
  }

  mounted() {
  }

}
