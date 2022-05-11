const state = {
  incidentState: {},
  incidentStateies: [],
  stateResolved: [],
};
const getters = {
  stateIncident(state) {
    return state.incidentState;
  },
  incidentStateies(state) {
    return state.incidentStateies;
  },
  stateResolved(state) {
    return state.stateResolved;
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
  async getAllState({ commit }, id) {
    try {
      const allState = await this.$axios.$get(
        `/incident-management/state/allState/${id}`
      );
      console.log(allState, "newStatenewState");
      commit("setIncidentStateies", allState);
    } catch (err) {
      console.log(err);
    }
  },
  async getStateResolved({ commit }, id) {
    try {
      const stateResolved = await this.$axios.$get(
        `/incident-management/state/stateResolved/${id}`
      );
      console.log(stateResolved, "newStatenewState");
      commit("setStateResolved", stateResolved);
    } catch (err) {
      console.log(err);
    }
  },
};
const mutations = {
  setState: (state, incidentState) => (state.incidentState = incidentState),
  setIncidentStateies: (state, incidentStateies) =>
    (state.incidentStateies = incidentStateies),
  setStateResolved: (state, stateResolved) =>
    (state.stateResolved = stateResolved),
};
export default {
  state,
  getters,
  actions,
  mutations,
};
