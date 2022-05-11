// import axios from "axios";

const state = {
  impactedIssues: [],
  impactedIssue: {},
  facilities: [],
  suppliers: [],
  inventories: [],
};

const getters = {
  allImpactedIssues(state) {
    return state.impactedIssues;
  },
  impactedIssue(state) {
    return state.impactedIssue;
  },
  allFacilities(state) {
    return state.facilities;
  },
  allSuppliers(state) {
    return state.suppliers;
  },
  allInventories(state) {
    return state.inventories;
  },
};

const actions = {
  async getAllImpactedIssues({ commit }) {
    try {
      const impactedIssues = await this.$axios.$get(
        "/incident-management/impactedIssues"
      );
      commit("setImpactedIssues", impactedIssues);
    } catch (err) {
      console.log(err);
    }
  },
  async createImpactedIssue({ commit }, impactedIssueName) {
    try {
      const impactedIssue = await this.$axios.$post(
        "/incident-management/impactedIssues"
      );
      console.log(impactedIssue, "pooostimpactedIssue");
      commit("newImpactedIssue", impactedIssue);
    } catch (err) {
      console.log(err);
    }
  },
  async getImpactedIssueById({ commit }, id) {
    try {
      const impactedIssue = await this.$axios.$get(
        `/incident-management/impactedIssues/${id}`
      );
      commit("impactedIssue", impactedIssue);
    } catch (err) {
      console.log(err);
    }
  },

  async getAllSuppliers({ commit }) {
    try {
      const suppliers = await this.$axios.$get(
        "/suppliers-management/Suppliers"
      );
      commit("setSuppliers", suppliers);
    } catch (err) {
      console.log(err);
    }
  },
  async getInventories({ commit }) {
    try {
      const inventory = await this.$axios.$get(
        "/inventory-management/Inventory"
      );
      commit("setInventories", inventory);
    } catch (err) {
      console.log(err);
    }
  },
};

const mutations = {
  setImpactedIssues: (state, impactedIssues) => {
    state.impactedIssues = impactedIssues;
  },
  setFacilities: (state, facility) => (state.facilities = facility),
  setSuppliers: (state, supplier) => (state.suppliers = supplier),
  setInventories: (state, inventory) => (state.inventories = inventory),
  impactedIssue: (state, impactedIssue) =>
    (state.impactedIssue = impactedIssue),
  newImpactedIssue: (state, impactedIssue) =>
    (state.impactedIssues = impactedIssue),
};

export default {
  state,
  mutations,
  actions,
  getters,
};
