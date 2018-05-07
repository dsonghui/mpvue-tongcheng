/**
 * Author: david.deng<david.deng@jcinfotech.com>
 * Date: 2018/5/6
 */
import Fly from 'flyio/dist/npm/wx'
import { FlyRequestConfig } from "flyio";
import JCConfig from "../config";
import { UsersService } from "services/UsersService";
import { Env } from "services/support/Env";

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

  request<T>(url = '', params: any = {}, method = 'post', option: FlyRequestConfig = {}): Promise<T> {
    return this.api.__defaultRequest<T>(method, url, params, option).then(response => {
      // 取出后台返回的最后值;
      return response.data.Data;
    }).catch(err => {
      console.log(err);
      throw err;
    })
  }

  getRequest(url = '', params: any = {}, option: FlyRequestConfig = {}) {
    return this.request(url, params, 'get', option)
  }

  postRequest(url = '', params: any = {}, option: FlyRequestConfig = {}) {
    return this.request(url, params, 'post', option)
  }

  /**
   * 设置request拦截器
   */
  setInterceptors() {

    this.api.api.interceptors.request.use(request => {
      request.headers['sessionId'] = Env.getInstance().sessionId;
      if (Env.getInstance().token) {
        request.headers['token'] = Env.getInstance().getToken();
      }
      return request;
    });


    this.api.api.interceptors.response.use(response => {
      //处理Token
      if (response.headers.token) {
        if (!Env.getInstance().getToken() || Env.getInstance().getToken() !== response.headers.token) {
          Env.getInstance().setToken(response.headers.token);
        }
      }
      try {

        //检查返回结果是否有误;
        let responseData = response.data;
        if (!responseData.Data) {
          throw new Error('服务器返回的数据有误。');
        }
        let { Status, Info, Data } = responseData;
        if (Status === 0) {
          throw new Error(Info ? Info : '服务器返回的数据有误。。');
        }
        if (Status === 2) {
          throw new Error(Info ? Info : '服务器返回的数据有误。。。');
        }
        if (Status !== 1) {
          throw new Error(Info ? Info : '服务器返回的数据有误。。。。');
        }

      } catch (e) {
        wx.showToast({
          title: e.message && e.message.length < 50 ? e.message : '请求网络失败，请稍后再试。',
        });
        throw e;
      }

    }, err => {
      // 超时
      if (!err.response) {
        wx.showToast({
          icon: 'none',
          title: '网络请求超时',
        } as any);
        return;
      }
      let { status, data, request } = err.response;
      if (data.Status === -1 || data.Status === 0) {
        wx.showToast({
          icon: 'none',
          title: data.Info && data.Info.length < 60 ? data.Info : '服务器报错了。',
        } as any);
      }
      if (data.Status === -2) { //没有登录
        // return UsersService.gotoLoginPage();
      }
      console.log(status);
      console.log(data);
    });

  }

}

export default new ApiService();
