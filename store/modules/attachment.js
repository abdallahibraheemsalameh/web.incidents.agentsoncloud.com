// import axios from "axios";
const state = {
  attachment: {},
  attachments: [],
};
const getters = {
  newAttachment(state) {
    return state.attachment;
  },
  attachments(state) {
    return state.attachments;
  },
};
const actions = {
  async createAttachment({ commit }, formData) {
    console.log("{ incidentId, attachments }", formData);
    try {
      const attachmentCreated = await this.$axios.$post(
        "/incident-management/attachment/uploads",
        formData
      );
      console.log(attachmentCreated, "attachmentCreated");
      commit("setAttachment", attachmentCreated);
    } catch (err) {
      console.log(err);
    }
  },
  async getAttachments({ commit }, incidentId) {
    try {
      const attachments = await this.$axios.$get(
        `/incident-management/attachment/${incidentId}`
      );
      commit("allAttachments", attachments);
    } catch (err) {
      console.log(err);
    }
  },
};
const mutations = {
  setAttachment: (state, attachment) => (state.attachment = attachment),
  allAttachments: (state, attachments) => (state.attachments = attachments),
};
export default {
  state,
  getters,
  actions,
  mutations,
};
