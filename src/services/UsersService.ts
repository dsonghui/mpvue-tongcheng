import { Env } from "services/support/Env";
import { isToken, wxPromisify } from "utils/index";
import { GetUserInfoResult, LoginResult } from "api/entities/wxapp";
import { ACCCOUNT_UPDATE } from "store/mutation";
import MyStore from "store/index";
import { AppUrls } from "../config";
import Api from "api/index";

export class UsersService {
  static login(){
    console.log('==========');
    return wxPromisify<LoginResult>(wx.login)().then((r) => {
      if (r && r.code) {
        console.log(r.code);
        return Api.request('/api/sihuiapp/token',{jscode: r.code}).then(response=>{
          console.log(response);
        });
      }
      return Promise.resolve(null);
    }).then(accountId => {
      console.log(accountId);
      return accountId && accountId > 0
    });
  }
}

