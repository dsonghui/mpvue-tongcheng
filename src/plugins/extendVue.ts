/**
 * 全局扩展 Vue ;
 * 注册组件;
 * Author: david.deng<david.deng@jcinfotech.com>
 * Date: 2018/5/13
 */
import {AppUrls} from "config/index";
import {PluginObject} from "vue";
import MyStore from "store/index";
import {Store} from "vuex";

// import * as components from "components/index";

declare module "vue/types/vue" {
  interface Vue {
    $mp: any;
    $store: Store<any>;
    $route: { back: (index?) => void, go: (url) => void };
    $toast: { loading: (title) => void, success: (title) => void, none: (title) => void };
    $loading: (title) => void;
    $hidenloading: () => void;
    AppUrls: any;
  }
}

export default class ExtendVue implements PluginObject<any> {
  public install(Vue, options?: any) {

    // 暂不支持注册全局组件
    // Object.keys(components).forEach(componentKey=>{
    //   console.log(componentKey);
    //   console.log(components[componentKey]);
    //   Vue.component(componentKey, components[componentKey]);
    // })

    Vue.prototype.$store = MyStore;
    Vue.prototype.$bus = new Vue();

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
        wx.navigateBack({delta: index})
      },
      go(url) {
        wx.navigateTo({
          url: url,
        })
      },
    }

    Vue.prototype.AppUrls = AppUrls
  }
}

