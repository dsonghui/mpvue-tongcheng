/**
 * User 相关统一对外接口, 可操作 MyStore
 */
import {wxPromisify} from "utils/index";
import {LoginResult} from "api/entities/wxapp";
import {UPDATE_ACCOUNT_USER} from "store/mutation";
import MyStore from "store/index";
import {User} from "api/entities/UserEntity";
import UserApi from "api/services/UserApi";
import {TokenManager} from "services/support/Token";

export class UsersService {

  static Token: TokenManager = new TokenManager();

  static boot() {
    UsersService.Token.initToken();
    if (String.IsNullOrWhiteSpece(UsersService.Token.getToken())) {
      UsersService.login();
    }
  }

  static login() {
    return wxPromisify<LoginResult>(wx.login)().then((r) => {
      if (r && r.code) {
        return UserApi.getTokenByCode(r.code).then(response => {
          UsersService.Token.setToken(response.token);
          UsersService.setUser(response.user);
          return true;
        });
      }
      return Promise.resolve(false);
    })
  }

  static isLogin() {
    return MyStore.getters.isHasToken;
  }

  static setUser(user: User) {
    MyStore.commit(UPDATE_ACCOUNT_USER, user);
  }
}

