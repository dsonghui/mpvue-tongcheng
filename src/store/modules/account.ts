import {Module} from "vuex";
import {UPDATE_ACCOUNT_USER, UPDATE_TOKEN} from "store/mutation";
import {Role} from "api/entities/UserEntity";

class User {
  id: number = 0;
  name: string = '';
  sex: number = 0;
  location: any = null;
  created_at: string = '';
  updated_at: string = '';
  deleted_at: string = '';
  avatar: any = null;
  bg: any = null;
  roles: Role[] = [];
  phone: any = null;
  email: any = null;
}

export class AccountState {
  token: string = '';
  user: User = new User();
}

class Account implements Module<AccountState, any> {
  state: AccountState = new AccountState();
  mutations = {
    [UPDATE_TOKEN](state: AccountState, payload) {
      state.token = payload;
    },
    [UPDATE_ACCOUNT_USER](state: AccountState, payload) {
      state.user = payload;
    }
  }
  actions = {}

  getters = {
    token: function (state: AccountState) {
      return state.token;
    },
    isHasToken: function (state: AccountState) {
      return !String.IsNullOrWhiteSpece(state.token);
    }
  }

}

export default new Account();
