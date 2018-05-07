import { Vue, Component } from 'vue-property-decorator'
import { AppUrls } from "config/index";

const debug = require('debug')('log:App')

declare module "vue/types/vue" {
  interface Vue {
    $mp: any;
    $route: { back: (index?) => void, go: (url) => void };
    $toast: { loading: (title) => void, success: (title) => void, none: (title) => void };
    $loading: (title) => void;
    $hidenloading: () => void;
    AppUrls: any;
  }
}

Vue.prototype.$toast = {
  loading(title, time = 6000) {
    wx.showToast({
      icon: 'loading',
      title: title,
      duration: time
    })
  },
  success(title, time = 1500) {
    wx.showToast({
      icon: 'success',
      title: title,
      duration: time
    })
  },
  none(title, time = 1500) {
    wx.showToast({
      icon: 'none',
      title: title,
      duration: time
    } as any)
  }
};
Vue.prototype.$loading = (title) => {
  wx.showLoading({
    title: title,
  })
}
Vue.prototype.$hidenloading = () => {
  wx.hideLoading();
}
Vue.prototype.$route = {
  back(index = 1) {
    wx.navigateBack({ delta: index })
  },
  go(url) {
    wx.navigateTo({
      url: url,
    })
  },
}

Vue.prototype.AppUrls = AppUrls


// 必须使用装饰器的方式来指定components
@Component({
  mpType: 'app', // mpvue特定
}as any)
class App extends Vue {
  // app hook
  onLaunch() {
    let opt = this.$root.$mp.appOptions
    debug('onLaunch', opt)
    wx.login({
      success(r) {
        // 小程序登录
        console.log(r);
      }
    });
  }

  onShow() {
    debug('onShow')
  }

  onHide() {
    debug('onHide')
  }

  mounted() {
  }

}

export default App
