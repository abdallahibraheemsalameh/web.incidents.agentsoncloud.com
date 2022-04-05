const state = {
  responder: {},
  responders: [],
};
const getters = {
  newResponder(state) {
    return state.responder;
  },
  responders(state) {
    return state.responders;
  },
};
const actions = {
  async createResponder({ commit }, { incidentId, responderName }) {
    try {
      const responderCreated = await this.$axios.$post(
        "/incident-management/responder",
        { incidentId, responderName }
      );
      console.log(responderCreated, "responderCreated");
      commit("setResponder", responderCreated);
    } catch (err) {
      console.log(err);
    }
  },
  async getResponder({ commit }) {
    try {
      const responders = await this.$axios.$get(
        "/incident-management/responder"
      );
      console.log(responders, "responders");
      commit("getResponder", responders);
    } catch (err) {
      console.log(err);
    }
  },
};

const mutations = {
  setResponder: (state, responder) => (state.responder = responder),
  getResponder: (state, responders) => (state.responders = responders),
};
export default {
  state,
  getters,
  actions,
  mutations,
};
