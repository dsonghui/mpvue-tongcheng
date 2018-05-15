import {Module} from "vuex";
import {UPDATE_TOKEN} from "store/mutation";

class AccountState {
  token: string = '';
}

class Account implements Module<AccountState, any> {
  state: AccountState = new AccountState();
  mutations = {
    [UPDATE_TOKEN](state: AccountState, payload) {
      state.token = payload;
    }
  }
  actions = {}

  getters = {}

}

export default new Account();
