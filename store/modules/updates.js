// import axios from "axios";
const state = {
  update: {},
  updates: [],
  // updateUpdated: {},
};
const getters = {
  newUpdate(state) {
    return state.update;
  },
  incidentUpdates(state) {
    return state.updates;
  },
  // updateUpdated(state) {
  //   return state.updateUpdated;
  // },
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
      commit("setupdate", updateCreated);
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
  // async updateupdate({ commit }, { update, userId, incidentId }) {
  //   try {
  //     const update = await this.$axios.$put(
  //       `/incident-management/update/update/update/${incidentId}`,
  //       { update, userId }
  //     );

  //     commit("updateUpdate", update);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  // async deleteupdate({ commit }, { id, userId, incidentId }) {
  //   try {
  //     const update = await this.$axios.$delete(
  //       `/incident-management/update/${id}`,
  //       { userId, incidentId }
  //     );
  //     console.log("deleteddddddddddddd", update);
  //     commit("updateDelete", id);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
};
const mutations = {
  setupdate: (state, update) => (state.update = update),
  getUpdates: (state, updates) => (state.updates = updates),
  // updates: (state, updates) => (state.updates = updates),
  // updateUpdate: (state, updateUpdated) => (state.updateUpdated = updateUpdated),
  // updateDelete(state, id) {
  //   console.log(id, "iddddddddd");
  //   const index = state.updates.findIndex((update) => update.id == id);
  //   console.log(index, "indexindexindex");
  //   state.updates.splice(index, 1);
  // },
};
export default {
  state,
  getters,
  actions,
  mutations,
};
