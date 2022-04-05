import Vuex from "vuex";
import Vue from "vue";
// import { Datetime } from "vue-datetime";
// import "vue-datetime/dist/vue-datetime.css";
import incident from "./modules/incident";
import impactedIssue from "./modules/impactedIsssue";
import attachment from "./modules/attachment";
import responder from "./modules/responder";
import comment from "./modules/comment";
import creator from "./modules/creator";
import activityLog from "./modules/activityLog";
Vue.use(Vuex);
export default () =>
  new Vuex.Store({
    modules: {
      incident,
      impactedIssue,
      attachment,
      responder,
      comment,
      creator,
      activityLog,
    },
  });
