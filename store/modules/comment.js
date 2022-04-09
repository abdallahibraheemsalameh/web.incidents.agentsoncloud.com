// import axios from "axios";
const state = {
  comment: {},
  comments: [],
  commentUpdated: {},
};
const getters = {
  newComment(state) {
    return state.comment;
  },
  comments(state) {
    return state.comments;
  },
  commentUpdated(state) {
    return state.commentUpdated;
  },
};
const actions = {
  async createComment({ commit }, { incidentId, comment, userId, updated }) {
    try {
      const commentCreated = await this.$axios.$post(
        "/incident-management/comment",
        {
          incidentId,
          comment,
          userId,
          updated,
        }
      );
      commit("setComment", commentCreated);
    } catch (err) {
      console.log(err);
    }
  },
  async getComments({ commit }, { userId, incidentId }) {
    const comments = await this.$axios.$post(
      `/incident-management/comment/${incidentId}`
      // { userId }
    );
    try {
      commit("comments", comments);
    } catch (err) {
      console.log(err.message);
    }
  },
  async updateComment({ commit }, { comment, userId, incidentId, updated }) {
    try {
      const comments = await this.$axios.$post(
        `/incident-management/comment/update/comment`,
        { comment, userId, incidentId, updated }
      );
      commit("commentUpdate", comments);
    } catch (err) {
      console.log(err);
    }
  },
};
const mutations = {
  setComment: (state, comment) => (state.comment = comment),
  comments: (state, comments) => (state.comments = comments),
  commentUpdate: (state, commentUpdated) =>
    (state.commentUpdated = commentUpdated),
};
export default {
  state,
  getters,
  actions,
  mutations,
};
