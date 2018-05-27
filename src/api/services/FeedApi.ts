/**
 * 定义Feed相关的Api作为Api文档使用
 * Author: david.deng<david.deng@jcinfotech.com>
 * Date: 2018/4/24
 */
import Api from '../index'
import {FeedsResponse} from "api/entities/FeedEntity";

export default class FeedApi {
  static preUrl = '/api/v2/feeds'

  static getFeeds(type, limit) {
    return Api.get<FeedsResponse>(FeedApi.preUrl, {type, limit});
  }

  static like(id) {
    return Api.post<any>(FeedApi.preUrl + '/' + id + '/like');
  }

  static unlike(id) {
    return Api.request<any>(FeedApi.preUrl + '/' + id + '/unlike', {}, 'delete');
  }

}
