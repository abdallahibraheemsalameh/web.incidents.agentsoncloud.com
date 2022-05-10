const state = {
  stateIncident: {},
};
const getters = {
  stateIncident(state) {
    return state.stateIncident;
  },
};
const actions = {
  async addState({ commit }, { id, state, actionText }) {
    try {
      const newState = await this.$axios.$post(
        `/incident-management/state/${id}`,
        { state, actionText }
      );
      console.log(newState, "newStatenewState");
      commit("setState", newState);
    } catch (err) {
      console.log(err);
    }
  },
};
const mutations = {
  setState: (state, stateIncident) => (state.stateIncident = stateIncident),
};
export default {
  state,
  getters,
  actions,
  mutations,
};
