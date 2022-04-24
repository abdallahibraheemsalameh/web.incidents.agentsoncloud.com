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
  async getComments({ commit }, { incidentId }) {
    const comments = await this.$axios.$get(
      `/incident-management/comment/${incidentId}`
    );
    try {
      commit("comments", comments);
    } catch (err) {
      console.log(err.message);
    }
  },
  async updateComment({ commit }, { comment, userId, incidentId }) {
    try {
      const commentUpdated = await this.$axios.$put(
        `/incident-management/comment/update/comment/${incidentId}`,
        { comment, userId }
      );

      commit("commentUpdate", commentUpdated);
    } catch (err) {
      console.log(err);
    }
  },
  async deleteComment({ commit, state }, id) {
    try {
      const userId = localStorage.getItem("userId");
      const deletedId = await this.$axios.$delete(
        `/incident-management/comment/${id}`,
        { data: { userId: userId } }
      );
      const { comments } = state;
      const restComments = comments.filter(
        (comment) => deletedId != comment.id
      );
      commit("comments", restComments);
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
