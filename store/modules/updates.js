const state = {
  update: {},
  updates: [],
  incidentUpdated: {},
};
const getters = {
  newUpdate(state) {
    return state.update;
  },
  incidentUpdates(state) {
    return state.updates;
  },
  incidentUpdated(state) {
    return state.incidentUpdated;
  },
};
const actions = {
  async createUpdate({ commit }, { incidentId, updateText, userId }) {
    try {
      const updateCreated = await this.$axios.$post(
        "/incident-management/updates",
        {
          incidentId,
          updateText,
          userId,
        }
      );
      commit("setText", updateCreated);
    } catch (err) {
      console.log(err);
    }
  },
  async getIncidentUpdates({ commit }, { incidentId }) {
    const updates = await this.$axios.$get(
      `/incident-management/updates/${incidentId}`
    );
    try {
      commit("getUpdates", updates);
    } catch (err) {
      console.log(err.message);
    }
  },
  async updateTextUpdate({ commit }, { id, updateText, userId }) {
    try {
      const textUpdated = await this.$axios.$put(
        `/incident-management/updates/update/${id}`,
        { updateText, userId }
      );
      console.log();
      commit("setIncidentUpdate", textUpdated);
    } catch (err) {
      console.log(err);
    }
  },
  async deleteUpdate({ commit, state }, id) {
    try {
      const userId = localStorage.getItem("userId");
      const deletedId = await this.$axios.$delete(
        `/incident-management/updates/${id}`,
        { data: { userId: userId } }
      );
      const { updates } = state;
      const restUpdates = updates.filter((update) => deletedId != update.id);
      console.log(restUpdates, "restUpdatesrestUpdatesrestUpdates");
      commit("comments", restUpdates);
    } catch (err) {
      console.log(err);
    }
  },
};
const mutations = {
  setText: (state, update) => (state.update = update),
  getUpdates: (state, updates) => (state.updates = updates),
  setIncidentUpdate: (state, incidentUpdated) =>
    (state.incidentUpdated = incidentUpdated),
};
export default {
  state,
  getters,
  actions,
  mutations,
};
