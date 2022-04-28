const state = {
  incidents: [],
  incidentsCreatedByMe: [],
  incidentsAssigneeToMe: [],
  incident: {},
  users: [],
  incidentState: "",
  incidentHistory: [],
  updatedIncident: {},
  user: {},
  incidentsResponder: [],
};
const getters = {
  allIncident(state) {
    return state.incidents;
  },
  incidentHistory(state) {
    return state.incidentHistory;
  },
  incidentsCreatedByMe(state) {
    return state.incidentsCreatedByMe;
  },
  incidentsResponder(state) {
    return state.incidentsResponder;
  },
  allIncidentsAssigneeToMe(state) {
    return state.incidentsAssigneeToMe;
  },
  incidentDetails(state) {
    return state.incident;
  },
  allUsers(state) {
    return state.users;
  },
  incidentState(state) {
    return state.incidentState;
  },
  updatedIncident(state) {
    return state.updatedIncident;
  },
  userData(state) {
    return state.user;
  },
};
const actions = {
  async getIncidentByAssigneeToMe({ commit }) {
    const id = localStorage.getItem("userId");
    try {
      const incidents = await this.$axios.$get(
        `/incident-management/incident/assignee/${id}`
      );
      console.log(incidents, "AssigneeToMeAssigneeToMe");
      commit("setIncidentsAssigneeToMe", incidents);
    } catch (err) {
      console.log(err);
    }
  },
  async getIncidentByResponderToMe({ commit }) {
    const id = localStorage.getItem("userId");
    try {
      const incidents = await this.$axios.$get(
        `/incident-management/incident/responder/${id}`
      );
      console.log(incidents, "respondersIncident");
      commit("setIncidentsResponderToMe", incidents);
    } catch (err) {
      console.log(err);
    }
  },
  async getAllIncidents({ commit }) {
    try {
      const getIncidents = await this.$axios.$get(
        `/incident-management/incident`
      );
      commit("setIncidents", getIncidents);
    } catch (err) {
      console.log(err);
    }
  },
  async getIncidentsCreatedByMe({ commit }) {
    const id = localStorage.getItem("userId");
    try {
      const incidents = await this.$axios.$get(
        `/incident-management/incident/creator/${id}`
      );
      console.log("CreatedByMeCreatedByMe", incidents);
      commit("setIncidentsCreatedByMe", incidents);
    } catch (err) {
      console.log(err);
    }
  },

  async getIncidentsDetails({ commit }, incidentId) {
    try {
      const incident = await this.$axios.$get(
        `/incident-management/incident/details/${incidentId}`
      );
      commit("setIncidentDetails", incident);
    } catch (err) {
      console.log(err);
    }
  },
  async getUsers({ commit }) {
    try {
      const users = await this.$axios.$get("/incident-management/user");

      commit("setUsers", users);
    } catch (err) {
      console.log(err);
    }
  },
  async getUserById({ commit }, id) {
    try {
      const users = await this.$axios.$get(`/incident-management/user/${id}`);

      commit("setUser", users);
    } catch (err) {
      console.log(err);
    }
  },
  async deleteIncident({ commit }, id) {
    try {
      const incident = await this.$axios.$delete(
        `/incident-management/incident/${id}`
      );
      commit("deleteIncident", id);
    } catch (err) {
      console.log(err);
    }
  },
  async updateIncidentState({ commit }, { id, state, actionText }) {
    try {
      const stateUpdated = await this.$axios.$put(
        `/incident-management/incident/state/${id}`,

        { state, actionText }
      );
      commit("updateState", stateUpdated);
    } catch (err) {
      console.log(err);
    }
  },

  async getIncidentHistory({ commit }) {
    try {
      const incidentHistory = await this.$axios.$get(
        `/incident-management/incident/history`
      );
      commit("setIncidentHistory", incidentHistory);
    } catch (err) {
      console.log(err);
    }
  },
  async updateIncidentById({ commit }, { id, body }) {
    console.log("loggg", id, body);
    try {
      const incident = await this.$axios.$put(
        `/incident-management/incident/${id}`,

        body
      );
      console.log("updartetetdq@@@@@@@@@@@@@@@@@@@", incident);
      commit("changeIncident", incident);
    } catch (err) {
      console.log(err);
    }
  },
};
const mutations = {
  setIncidents: (state, incidents) => (state.incidents = incidents),
  newIncident: (state, incident) => state.incidents.push(incident),
  setIncidentDetails: (state, incident) => (state.incident = incident),
  setUsers: (state, users) => (state.users = users),
  setIncidentsAssigneeToMe: (state, incidents) =>
    (state.incidentsAssigneeToMe = incidents),
  setIncidentsCreatedByMe: (state, incidents) =>
    (state.incidentsCreatedByMe = incidents),
  deleteIncident(state, id) {
    const index = state.incidentsCreatedByMe.findIndex(
      (incident) => incident.id == id
    );
    console.log(index, "index deleted");
    state.incidentsCreatedByMe.splice(index, 1);
  },
  updateState: (state, incidentState) => (state.incidentState = incidentState),
  setIncidentHistory: (state, incidentHistory) =>
    (state.incidentHistory = incidentHistory),
  changeIncident: (state, incident) => (state.updatedIncident = incident),
  setUser: (state, user) => (state.user = user),
  setIncidentsResponderToMe: (state, incidentsResponder) =>
    (state.incidentsResponder = incidentsResponder),
};
export default {
  state,
  getters,
  actions,
  mutations,
};
