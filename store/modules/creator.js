// import axios from "axios";
const state = {
  creator: {},
  responder: {},
};
const getters = {
  creator(state) {
    return state.creator;
  },
  responder(state) {
    return state.responder;
  },
};
const actions = {
  async getCreatorById({ commit }, id) {
    try {
      const creator = await this.$axios.$get(`/incident-management/user/${id}`);
      console.log(creator, "creatorcreatorcreatorcreatorcreator");
      commit("creatorData", creator);
    } catch (err) {
      console.log(err);
    }
  },
  // async getResponderById({ commit }, id) {
  //   try {
  //     const responder = await this.$axios.$get(`/user-management/users/${id}`);
  //     console.log(responder, "responder");
  //     commit("responderData", responder);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
};
const mutations = {
  creatorData: (state, creator) => (state.creator = creator),
  responderData: (state, responder) => (state.responder = responder),
};
export default {
  state,
  getters,
  actions,
  mutations,
};
