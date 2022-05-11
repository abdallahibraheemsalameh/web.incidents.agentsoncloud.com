const Activity = {
  namespace: true,
  // j
  state: {
    activityLog: [],
  },

  mutations: {
    newActivityLog: (state, activityLog) => (state.activityLog = activityLog),
  },
  actions: {
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
  },

  getters: {
    activityLog(state) {
      return state.activityLog;
    },
  },
};

export default Activity;
