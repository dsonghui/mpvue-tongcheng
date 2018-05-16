/**
 * 定义User相关的Api作为Api文档使用
 * Author: david.deng<david.deng@jcinfotech.com>
 * Date: 2018/4/24
 */
import Api from '../index'
import {TokenResponse} from "api/entities/UserEntity";

export default class UserApi {
  static getTokenByCode(code) {
    return Api.request<TokenResponse>('/api/sihuiapp/token', {jscode: code});
  }
}
