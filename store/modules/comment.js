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
  async createComment({ commit }, { incidentId, comment, userId }) {
    try {
      const commentCreated = await this.$axios.$post(
        "/incident-management/comment",
        {
          incidentId,
          comment,
          userId,
        }
      );
      commit("setComment", commentCreated);
    } catch (err) {
      console.log(err);
    }
  },
  async getComments({ commit }, incidentId) {
    try {
      const comments = await this.$axios.$get(
        `/incident-management/comment/${incidentId}`
      );
      commit("comments", comments);
    } catch (err) {
      console.log(err);
    }
  },
  async updateComment({ commit }, { id, body }) {
    try {
      const comments = await this.$axios.$put(
        `/incident-management/comment/${id}`,
        { body }
      );
      console.log(comments, "ccoooooooooooooooooooo");
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
