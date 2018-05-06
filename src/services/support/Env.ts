import MyGenerate from "helpers/MyGenerate";
import { WxStorage } from "helpers/WxStorage";
import { JCSession } from "services/support/Session";

/**
 *
 * Author: david.deng<david.deng@jcinfotech.com>
 * Date: 2018/4/24
 */

export class Env {
  unique: string = '';
  session: JCSession;
  sessionId: string = '';
  token: string = '';

  static instance: any = null;
  static getInstance(): Env {
    if (this.instance === null) {
      this.instance = new this();
    }
    return this.instance;
  }

  constructor() {
    this.unique = new Date().getTime() + '';
    this.session = new JCSession();
    this.sessionId = this.session.generateSessionId();
    let token = WxStorage.get('user-token');
    if (token) {
      this.setToken(token);
    }
  }

  generateSessionId(force = false) {
    this.sessionId = this.session.generateSessionId(force);
  }


  setToken(token) {
    this.token = token;
    WxStorage.set('user-token', token);
  }

  getToken() {
    return this.token;
  }

  toString() {
    return 'sdfsdf';
  }

}
