/**
 * TypeScript Store 类型提示设置;
 * Author: david.deng<david.deng@jcinfotech.com>
 * Date: 2017/01/24
 */
import { AccountDetailModel } from "api/services/WeixinMiniProgramService";
import { ChildInfoModel } from "api/services/ChildinfoService";


interface Getters {
  account: AccountDetailModel;
  childs: ChildInfoModel[];
  currentChildId: number;
  currentChild: ChildInfoModel;
}

declare module 'vuex/types' {
  interface Store<S> {
    readonly getters: Getters;
  }
}
