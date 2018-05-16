/**
 *
 * Author: david.deng<david.deng@jcinfotech.com>
 * Date: 2018/4/25
 */
import {WxStorage} from "helpers/WxStorage";
import MyStore from "store/index";
import {UPDATE_TOKEN} from "store/mutation";

export class TokenManager{
  __cacheKey = 'user-token';

  constructor(token?) {
    this.initToken(token);
  }

  initToken(token?) {
    if (!token) token = WxStorage.get(this.__cacheKey);
    if (token) {
      this.setToken(token);
    }
  }

  setToken(token) {
    WxStorage.set(this.__cacheKey, token);
    MyStore.commit(UPDATE_TOKEN, token);
  }

  getToken() {
    return MyStore.getters.token;
  }

}
