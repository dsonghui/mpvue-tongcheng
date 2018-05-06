import Fly from 'flyio/dist/npm/wx'
import { FlyRequestConfig } from "flyio";
import JCConfig from "../config";

export class ApiService {
  $$prefix: string = '';
  $$basePath: string = '';
  api: Fly = new Fly();
  constructor(basePath?) {
    this.$$basePath = basePath ? basePath : '/api';

  }

  /**
   * 以wx.request作为底层方法
   * @param {String} method 请求方法
   * @param {String} url    接口地址
   * @param {Object} params 请求参数
   * @param option
   */
  __defaultRequest<T>(method = '', url = '', params: any = {}, option: FlyRequestConfig = {}) {
    option = Object.assign(this.setOption(), option || {});
    option.method = method;
    return this.api.request<T>(this.geturl(url), params, option)
  }

  setOption(): FlyRequestConfig {
    return {
      timeout: 5000
    }
  }

  geturl(url) {
    if (!(/^\//).test(url)) url = '/' + url;
    return (/^https/).test(url) ? url : JCConfig.HOST + url;
  }

}
