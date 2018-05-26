/**
 * 定义User相关的Api作为Api文档使用
 * Author: david.deng<david.deng@jcinfotech.com>
 * Date: 2018/4/24
 */
import Api from '../index'
import {FeedsResponse} from "api/entities/FeedEntity";

export default class FeedApi {
  static getFeeds(type, limit) {
    return Api.get<FeedsResponse>('/api/v2/feeds', {type, limit});
  }
}
