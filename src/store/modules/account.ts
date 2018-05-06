import { ACCCOUNT_UPDATE, ACCOUNT_CLEAN, ACCOUNT_UPDATE_CHILDS, ACCOUNT_UPDATE_CURRENTCHILD } from "store/mutation";
import { AccountDetailModel } from "api/services/WeixinMiniProgramService";
import { ChildInfoModel, ChildinfoService } from "api/services/ChildinfoService";


export default {
  state: {
    account: new AccountDetailModel(),
    childs: [],
    currentChildId: null,
  },
  actions: {
    updateUserChilds({ commit }) {
      return ChildinfoService.getInstance<ChildinfoService>().GetChildsForAccount().then(r => {
        if (Array.isArray(r)) {
          commit(ACCOUNT_UPDATE_CHILDS, r)
        }
        return r;
      })
    }
  },
  mutations: {
    [ACCCOUNT_UPDATE](state, account) {
      state.account = account;
    },
    [ACCOUNT_CLEAN](state) {
      state.account = new AccountDetailModel();
    },
    [ACCOUNT_UPDATE_CHILDS](state, childs) {
      state.childs = childs;
      if (!state.currentChildId && childs.length > 0) {
        state.currentChildId = Number(childs[childs.length - 1].AutoId);
      }
    },
    [ACCOUNT_UPDATE_CURRENTCHILD](state, childId) {
      state.currentChildId = childId;
    }
  },
  getters: {
    account: state => {
      return state.account;
    },
    childs: state => {
      return state.childs;
    },
    currentChildId: state => {
      return Number(state.currentChildId);
    },
    currentChild: state => {
      let childs = state.childs.filter(child => {
        return child.AutoId === Number(state.currentChildId);
      });
      if (childs.length > 0) {
        return childs[0]
      } else {
        return new ChildInfoModel();
      }
    },
    isHasChild(state, getters) {
      return getters.currentChild.AutoId > 0;
    }
  },
};

