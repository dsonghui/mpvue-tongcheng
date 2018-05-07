import { Vue, Component } from "vue-property-decorator";
import PageMixins from "mixins/PageMixins";
import { Env } from "services/support/Env";
import { WxStorage } from "helpers/WxStorage";
import MFiled from "components/field.vue";

const debug = require('debug')('log:Index');

@Component({
  name: 'Index',
  mixins: [PageMixins],
  components: {
    MFiled
  }
})
export default class Index extends Vue {
  code: string = '';
  Name: string = '';
  Name2: string = '';

  handleSyncInfo() {
    // UsersService.syncUserProfile().then(r => {
    //   console.log(r);
    //   console.log('资料同步成功');
    // })
  }

  handleClearCache() {
    WxStorage.clear();
    //wx.showToast({})
  }

  handleLogout() {
    Env.getInstance().generateSessionId(true);
    Env.getInstance().setToken(null);
  }


  mounted() {

    // vue hook
    console.log(Env.getInstance().getToken());

    console.log(getApp());

    if (!Env.getInstance().getToken()) {
      console.log('goto login');
      wx.navigateTo({
        url: '/pages/login/main?from=/pages/index/main'
      })
    }
  }

}
