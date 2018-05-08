import { Vue, Component } from "vue-property-decorator";
import PageMixins from "mixins/PageMixins";
import { UsersService } from "services/UsersService";
import MyStore from "store/index";

const debug = require('debug')('log:Login');

@Component({
  name: 'Login',
  mixins: [PageMixins]
})
export default class Login extends Vue {
  errorMessage: string = '';


  mounted() {
    this.doLogin();
  }

  doLogin() {
    UsersService.login().then(r => {
      // if (r) {
      //   return UsersService.initUserProfile();
      // }
      throw new Error('登录失败');
    }).then(profile => {
    //   if (profile) {
    //     //资料为空时 自动同步资料
    //     if (profile.HeadUrl === null && profile.UserName === null) {
    //       return UsersService.syncUserProfile();
    //     }
    //     return true;
    //   }
    //   throw new Error('获取用户资料失败');
    // }).then(result => {
    //   if (result) {
    //     debug('登录成功');
    //     console.log(MyStore.getters.account);
    //     wx.navigateBack();
    //   }
    // }).catch(e => {
    //   this.errorMessage = e.message ? e.message : '登录失败';
    })
  }

}
