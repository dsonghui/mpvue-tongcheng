/**
 *
 * Author: david.deng<david.deng@jcinfotech.com>
 * Date: 2018/4/25
 */
import { WxStorage } from "helpers/WxStorage";
import MyGenerate from "helpers/MyGenerate";

export class JCSession {
  SessionCackeKey = 'JC-SessionCackeKey';
  getSessionCache() {
    return WxStorage.get(this.SessionCackeKey);
  }
  setSessionCache(sessionId) {
    return WxStorage.set(this.SessionCackeKey, sessionId);
  }

  generateSessionId(force = false) {
    let sessionId;
    if (!force) sessionId = this.getSessionCache();
    if (!sessionId) sessionId = MyGenerate.randomStr(64);
    this.setSessionCache(sessionId);
    return sessionId;
  }
}
