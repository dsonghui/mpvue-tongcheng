import Vue from 'vue';
import Vuex from 'vuex';
import account from './modules/account';

Vue.use(Vuex as any);
// const persistencePlugin = store => {
//   // 使用缓存合并state
//   store.replaceState(Object.assign({}, store.state, WxStorage.get('vuex-store')));
//   // 当 store 初始化后调用
//   store.subscribe((mutation, state) => {
//     // 每次 mutation 之后调用
//     // mutation 的格式为 { type, payload }
//     WxStorage.set('vuex-store', state);
//   });
// }
const MyStore = new Vuex.Store({
  modules: {
    account,
  },
  //plugins: [persistencePlugin]
  //strict: process.env.NODE_ENV !== 'production' //是否开启严格模式
});
export default MyStore;
