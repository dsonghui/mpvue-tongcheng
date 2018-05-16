/**
 * TypeScript Store 类型提示设置;
 * Author: david.deng<david.deng@jcinfotech.com>
 * Date: 2017/01/24
 */


interface Getters {
  token: string;
  isHasToken: boolean;
}

declare module 'vuex/types' {
  interface Store<S> {
    readonly getters: Getters;
  }
}
