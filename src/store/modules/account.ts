import {Module} from "vuex";
import {SAVE_USER, UPDATE_ACCOUNT_USER, UPDATE_TOKEN} from "store/mutation";
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

class Users {
  [key: string]: User;
}

export class AccountState {
  token: string = '';
  user: User = new User();
  users: Users = new Users();
}

class Account implements Module<AccountState, any> {
  state: AccountState = new AccountState();
  mutations = {
    [UPDATE_TOKEN](state: AccountState, payload) {
      state.token = payload;
    },
    [UPDATE_ACCOUNT_USER](state: AccountState, payload) {
      state.user = payload;
    },
    [SAVE_USER](state, user) {
      if (!user.id) return;
      const key = `user_${user.id}`;
      const oldUser = state.users[key];
      oldUser
        ? (state.users[key] = Object.assign(oldUser, user))
        : (state.users[key] = user);
    },
  }
  actions = {}

  getters = {
    token: function (state: AccountState) {
      return state.token;
    },
    CURRENTUSER(state: AccountState) {
      return state.user;
    },
    getUserById: (state: AccountState) => id => {
      return state.users[`user_${id}`] || {};
    },
    isHasUser: (state: AccountState) => id => {
      return !!state.users[`user_${id}`];
    },
    isHasToken: function (state: AccountState) {
      return !String.IsNullOrWhiteSpece(state.token);
    }
  }

}

export default new Account();
