import { Env } from "services/support/Env";
import { isToken, wxPromisify } from "utils/index";
import { WeixinMiniProgramService } from "api/services/WeixinMiniProgramService";
import { GetUserInfoResult, LoginResult } from "api/entities/wxapp";
import { ACCCOUNT_UPDATE } from "store/mutation";
import MyStore from "store/index";
import { AppUrls } from "../config";

export class UsersService {

  static _XCXService: WeixinMiniProgramService = new WeixinMiniProgramService();

  static login() {
    return wxPromisify<LoginResult>(wx.login)().then((r) => {
      if (r && r.code) {
        return UsersService._XCXService.LoginByJsCode(r.code);
      }
      return Promise.resolve(null);
    }).then(accountId => {
      console.log(accountId);
      return accountId && accountId > 0
    });
  }

  // static login(code) {
  //   UsersService._WCXService.LoginByJsCode(code).then(r => {
  //     console.log(r);
  //   })
  // }

  static logout() {

  }


  static isLogin() {
    return isToken(Env.getInstance().getToken())
  }

  static initUserProfile() {
    return UsersService._XCXService.GetAccountDetail().then(profile => {
      if (profile) {
        MyStore.commit(ACCCOUNT_UPDATE, profile);
      }
      return profile;
    })
  }

  static syncUserProfile() {
    return UsersService._XCXService.GetAccountDetail().then(profile => {
      return wxPromisify<GetUserInfoResult>(wx.getUserInfo)({ withCredentials: false }).then(r => {
        if (r && r.userInfo) {
          profile.HeadUrl = r.userInfo.avatarUrl;
          profile.UserName = r.userInfo.nickName;
          profile.Sex = r.userInfo.gender;
        }
        return profile;
      })
    }).then(profile => {
      MyStore.commit(ACCCOUNT_UPDATE, profile);
      return UsersService._XCXService.SaveAccountDetail(profile);
    })
  }

  static gotoLoginPage() {
    wx.navigateTo({ url: AppUrls.Login });
  }

}
