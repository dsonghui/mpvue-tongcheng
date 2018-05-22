/**
 * 定义User相关的Api作为Api文档使用
 * Author: david.deng<david.deng@jcinfotech.com>
 * Date: 2018/5/22
 */
import Api from '../index'
import {TokenResponse} from "api/entities/UserEntity";

export default class FeedApi {
  static getFeeds(type) {
    return Api.get<TokenResponse>('/api/v2/feeds/', {type: type});
  }
}
