const state = {
  activityLog: [],
};
const getters = {
  activityLog(state) {
    return state.activityLog;
  },
};
const actions = {
  async getActivityLog({ commit }, incidentId) {
    try {
      const activityLog = await this.$axios.$get(
        `/incident-management/activityLog/${incidentId}`
      );
      commit("newActivityLog", activityLog);
    } catch (err) {
      console.log(err);
    }
  },
};
const mutations = {
  newActivityLog: (state, activityLog) => (state.activityLog = activityLog),
};
export default {
  state,
  getters,
  actions,
  mutations,
};
