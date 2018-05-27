/**
 * Author: david.deng<david.deng@jcinfotech.com>
 * Date: 2018/5/6
 */
import Fly from 'flyio/dist/npm/wx'
import {FlyRequestConfig} from "flyio";
import JCConfig from "../config";
import {Env} from "services/support/Env";
import {WxStorage} from "helpers/WxStorage";

export class ApiService {
  $$prefix: string = '';
  $$basePath: string = '';
  api: Fly = new Fly();

  constructor(basePath?) {
    this.$$basePath = basePath ? basePath : '/api';
    this.setInterceptors();
  }

  /**
   * 以wx.request作为底层方法
   * @param {String} method 请求方法
   * @param {String} url    接口地址
   * @param {Object} params 请求参数
   * @param option
   */
  __defaultRequest<T>(method = '', url = '', params: any = null, option: FlyRequestConfig = {}) {
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

  request<T>(url = '', params: any = null, method = 'post', option: FlyRequestConfig = {}): Promise<T> {
    return this.__defaultRequest<T>(method, url, params, option).then(response => {
      // 取出后台返回的最后值;
      return response;
    }).catch(err => {
      console.log(err);
      throw err;
    })
  }

  get<T>(url = '', params: any = null, option: FlyRequestConfig = {}) {
    return this.request<T>(url, params, 'get', option)
  }

  post<T>(url = '', params: any = null, option: FlyRequestConfig = {}) {
    return this.request<T>(url, params, 'post', option)
  }

  /**
   * 设置request拦截器
   */
  setInterceptors() {

    this.api.interceptors.request.use(request => {
      let token = WxStorage.get('user-token');
      if (token) {
        request.headers['Authorization'] = 'Bearer ' + token;
      }
      return request;
    });


    this.api.interceptors.response.use(response => {
      try {
        //检查返回结果是否有误;
        let {data, status} = response;
        if (status < 300) {
          return data;
        }
      } catch (e) {
        wx.showToast({
          title: e.message && e.message.length < 50 ? e.message : '请求网络失败，请稍后再试。',
        });
        throw e;
      }

    }, err => {
      // 超时
      wx.showToast({
        icon: 'none',
        title: '网络请求超时',
      } as any);
    });

  }

}

const Api = new ApiService();
export default Api;
