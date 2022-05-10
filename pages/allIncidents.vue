<template>
  <div class="table">
    <v-row justify="space-between">
      <div class="ml-8 mt-4">
        <v-btn
          :outlined="activeBtn === 'assignee'"
          color="indigo accent-2"
          elevation="2"
          :plain="activeBtn !== 'assignee'"
          @click="assignedToMe"
          :text="false"
          class="textBtu"
        >
          Assigned to me</v-btn
        >
        <v-btn
          :outlined="activeBtn === 'createdByMe'"
          color="indigo accent-2"
          elevation="2"
          :plain="activeBtn !== 'createdByMe'"
          @click="getIncidentCreatedByMe"
          class="textBtu"
        >
          Created by me</v-btn
        >
        <v-btn
          :outlined="activeBtn === 'reporter'"
          color="indigo accent-2"
          elevation="2"
          :plain="activeBtn !== 'reporter'"
          @click="incidentResponder"
          class="textBtu"
        >
          reporting on</v-btn
        >
      </div>

      <div justify="space-around" class="mr-8 mt-4">
        <v-btn
          :outlined="activeBtn === 'history'"
          color="indigo accent-2"
          elevation="2"
          :plain="activeBtn !== 'history'"
          @click="getHistory"
          class="textBtu"
        >
          Incident history</v-btn
        >
        <v-btn
          :outlined="activeBtn === 'activityLog'"
          color="indigo accent-2"
          elevation="2"
          :plain="activeBtn !== 'activityLog'"
          @click="goActivity"
          class="textBtu"
        >
          Activity log</v-btn
        >
      </div>
    </v-row>
    <v-progress-linear
      color="rgb(227 227 227)"
      value="100"
      height="2"
      class="mt-4"
    ></v-progress-linear>
    <div class="d-flex justify-space-between mx-8 my-2">
      <div class="d-flex flex-column">
        <div class="d-flex">
          <h4 class="header">OLA : {{ impactOperational() }}</h4>
          <span class="ml-2">Operational level Agreement Incident</span>
        </div>
        <div class="d-flex">
          <h4 class="header">SLA : {{ impactFinancial() }}</h4>
          <span class="ml-2">Service level Agreement Incident</span>
        </div>
      </div>
      <div class="create-btn">
        <v-btn
          @click.stop="showCreateForm = true"
          color="#272727"
          class="resetBtn"
        >
          + Create Incident</v-btn
        >

        <CreateIncident
          v-if="showCreateForm"
          :dialog.sync="showCreateForm"
          @getIncidents="getIncidents"
        />
      </div>
    </div>
    <v-progress-linear
      color="rgb(227 227 227)"
      value="100"
      height="2"
      class="mt-2"
    ></v-progress-linear>
    <!-- Filter -->

    <v-container class="contain">
      <v-toolbar elevation="20" class="main" shaped>
        <v-row>
          <v-col class="py-0 px-1 pt-3" cols="4">
            <SelectIssue
              @setIssueAndItem="filterImpactedIssue"
              :background="'rgb(240 240 240)'"
              :height="'48'"
            />
          </v-col>
          <v-col>
            <v-autocomplete
              cols="12"
              md="3"
              cache-items
              class="filterSearch"
              flat
              hide-no-data
              hide-details
              placeholder="Creator name"
              solo-inverted
              v-model="creatorId"
              :items="allUsers"
              item-value="id"
              item-text="name"
              @change="filterCreatorName()"
            >
            </v-autocomplete>
          </v-col>
          <v-col>
            <v-autocomplete
              cols="12"
              md="3"
              v-model="valueFilter"
              :items="priorityFilter"
              cache-items
              class="filterSearch"
              flat
              hide-no-data
              hide-details
              placeholder="Priority"
              solo-inverted
              @change="filterIncidents('priority', valueFilter)"
            >
            </v-autocomplete>
          </v-col>
          <v-col>
            <v-autocomplete
              cols="12"
              md="3"
              v-model="valueFilter"
              :items="stateFilter"
              cache-items
              class="filterSearch"
              flat
              hide-no-data
              hide-details
              placeholder="State"
              solo-inverted
              @change="filterIncidents('state', valueFilter)"
            >
            </v-autocomplete>
          </v-col>
          <v-col>
            <v-btn
              elevation="2"
              dense
              chips
              small-chips
              solo
              @click="clearFilter"
              background-color="rgb(240 240 240)"
              height="48"
              class="text-capitalize"
              >Clear filter</v-btn
            >
          </v-col>
        </v-row>
      </v-toolbar>
    </v-container>
    <!-- </div> -->

    <template>
      <div class="mx-8">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>

        <v-data-table
          :headers="headers"
          :items="showIncidents"
          :search="search"
        >
          <template v-slot:[`item.responderId`]="{ item }">
            <v-icon @click.stop="(incidentId = item.id), (dialogIcone = true)"
              >mdi-eye-outline
            </v-icon>
            <ShowUser
              v-if="incidentId == item.id && dialogIcone"
              :dialogIcone.sync="dialogIcone"
              :users="
                activeBtn === 'reporter' ? item.assignees : item.responders
              "
              :userDialogTitle="
                activeBtn === 'reporter' ? 'Assignees' : 'Reporters'
              "
              :activeBtn="activeBtn"
            />
          </template>
          <template #[`item.icon`]="{ item }">
            <Ellipsis
              :creatorIdProps="item.creatorId"
              :activeBtn="activeBtn"
              :incidentIdProps="item.id"
              :itemProps="item"
              @getIncidents="getIncidents"
            />
          </template>
          <template v-slot:[`item.subject`]="{ item }">
            <div>
              <a
                @click.stop="
                  (incidentId = item.id), (showDetailsIncident = true)
                "
              >
                {{ item.subject }}</a
              >
            </div>
            <IncidentDetails
              v-if="incidentId == item.id"
              :dialogDetails.sync="showDetailsIncident"
              :incidentId="item.id"
              :activeBtn="activeBtn"
            />
          </template>
          <template v-slot:[`item.creatorId`]="{ item }">
            <div v-if="activeBtn === 'createdByMe'">
              <v-icon
                @click.stop="(incidentId = item.id), (assigneeDialog = true)"
                >mdi-eye-outline
              </v-icon>
              <ShowUser
                v-if="incidentId == item.id && assigneeDialog"
                :dialogIcone.sync="assigneeDialog"
                :users="item.assignees"
                :userDialogTitle="'Assignees'"
                :activeBtn="activeBtn"
              />
            </div>

            <div v-if="activeBtn !== 'createdByMe'">
              {{ allUsersNameById[item.creatorId] }}
            </div>
          </template>

          <template v-slot:[`item.impactedIssues`]="{ item }">
            <div v-for="(impactedIssue, i) in item.ImpactedIssues" :key="i">
              {{ impactedIssue.name }}/
              {{ impactedIssue.IncidentImpactedIssue.item }}
            </div>
          </template>
          <template v-slot:[`item.deadline`]="{ item }">
            {{ item.deadline ? item.deadline.split("T")[0] : "" }} at
            {{ item.deadline ? item.deadline.split("T")[1].split(".")[0] : "" }}
          </template>
          <template v-slot:[`item.happeningTime`]="{ item }">
            {{ item.happeningTime ? item.happeningTime.split("T")[0] : "" }} at
            {{
              item.happeningTime
                ? item.happeningTime.split("T")[1].split(".")[0]
                : ""
            }}
          </template>
          <template v-slot:[`item.escalationPolicy`]="{ item }">
            {{ getEscalationPolicy(item.escalationPolicy) }}
          </template>
          <template v-slot:[`item.createdAt`]="{ item }">
            {{ item.createdAt ? item.createdAt.split("T")[0] : "" }} at
            {{
              item.createdAt ? item.createdAt.split("T")[1].split(".")[0] : ""
            }}
          </template>
        </v-data-table>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      buttonName: "",
      showDetailsIncident: false,
      search: "",
      headers: [],
      incidents: [],
      name: "Noof",
      activeBtn: "assignee",
      howShow: "assignee",
      showCreateForm: false,
      items: ["Update", "update escalation duration", "Add comment", "Delete"],
      value: "",
      creatorId: "",
      incidentSort: [],
      userId: null,
      showIncidents: [],
      priority: [],
      history: true,
      activity: true,
      showIncidentHistory: false,
      priorityFilter: ["High", "Medium", "Low"],
      valueFilter: "",
      stateFilter: [
        "On Hold",
        "Resolved (corrective)",
        "New",
        "Closed (preventive)",
      ],
      creatorFilter: [],
      creatorId: "",
      itemNames: [],
      selectedImpactedIssueId: null,
      itemList: [],
      itemName: null,
      filterBy: {},
      user: "",
      responders: {},
      iddd: null,
      issue: null,
      allUsersNameById: {},
      incidentId: null,
      dialogIcone: false,
      assigneeDialog: false,
      userDialogTitle: "",
    };
  },
  computed: {
    ...mapGetters([
      "allIncident",
      "allUsers",
      "incidentsCreatedByMe",
      "allIncidentsAssigneeToMe",
      "allImpactedIssues",
      "allInventories",
      "allFacilities",
      "allSuppliers",
      "incidentsResponder",
      "userData",
    ]),
  },

  async mounted() {
    this.userId = localStorage.getItem("userId");
    await this.getIncidents();
    await this.getIncidentByResponderToMe();
    this.showIncidents = await this.allIncidentsAssigneeToMe;
    this.getHeaders("Creator", "reporter");
    this.getAllImpactedIssues();

    await this.getUsers();
    this.creatorFilter = this.allUsers.map((user) => {
      return user.name;
    });
    this.getAllIncidents();
    this.getAllFacility();
    this.getAllSuppliers();
    this.userNameById();
  },
  methods: {
    ...mapActions([
      "getAllIncidents",
      "getUsers",
      "getIncidentsCreatedByMe",
      "getIncidentByAssigneeToMe",
      "getAllImpactedIssues",
      "getInventories",
      "getAllSuppliers",
      "getAllFacility",
      "getUsers",
      "getIncidentByResponderToMe",
    ]),
    getHeaders(creatorHeader, responderHeader) {
      this.headers = [
        {
          text: "Subject",
          align: "start",
          value: "subject",
        },
        { text: "Linked issue", value: "impactedIssues" },
        { text: creatorHeader, value: "creatorId" },
        { text: "Happening time", value: "happeningTime" },
        { text: "creation time", value: "createdAt" },
        { text: "priority", value: "priority" },
        { text: "state", value: "state" },
        { text: "Deadline", value: "deadline" },
        // { text: "category", value: "category" },
        { text: "Update duration", value: "escalationPolicy" },
        { text: responderHeader, value: "responderId" },
        { text: "", value: "icon" },
      ];
    },
    impactFinancial() {
      const result = this.allIncident.filter(
        (incident) => incident.impactFinancial
      );
      return result.length;
    },
    impactOperational() {
      const result = this.allIncident.filter(
        (incident) => incident.impactOperational
      );
      return result.length;
    },
    getIncidentCreatedByMe() {
      this.getHeaders("Assignee", "reporter");
      this.activeBtn = "createdByMe";
      this.showIncidents = this.incidentsCreatedByMe;
    },
    assignedToMe() {
      this.getHeaders("Creator", "reporter");
      this.activeBtn = "assignee";
      this.showIncidents = this.allIncidentsAssigneeToMe;
    },
    async getIncidents() {
      await this.getIncidentByAssigneeToMe();
      await this.getIncidentsCreatedByMe();
      this.showIncidents =
        this.activeBtn == "assignee"
          ? this.allIncidentsAssigneeToMe
          : this.incidentsCreatedByMe;
    },
    goActivity() {
      this.activeBtn = "activityLog";
    },
    getHistory() {
      this.activeBtn = "history";
      this.$router.push(`incidentHistory`);
    },
    incidentResponder() {
      this.getHeaders("Creator", "Assignee");
      console.log(
        this.incidentsResponder,
        "this.showIncidentsthis.showIncidentsthis.showIncidentsthis.showIncidents"
      );
      this.activeBtn = "reporter";
      this.showIncidents = this.incidentsResponder;
    },
    filterIncidents(key, value) {
      if ((key, value)) {
        this.filterBy[key] = value;
      }

      const incidents =
        this.activeBtn == "assignee"
          ? this.allIncidentsAssigneeToMe
          : this.incidentsCreatedByMe;
      Object.entries(this.filterBy).map(([key, value]) => {
        this.showIncidents = incidents.filter(
          (incident) => incident[key] == value
        );
      });
    },

    filterCreatorName(value) {
      this.filterIncidents("creatorId", +this.creatorId);
    },

    filterImpactedIssue(id, item) {
      console.log("id, item", id, item);
      const incidents =
        this.activeBtn == "assignee"
          ? this.allIncidentsAssigneeToMe
          : this.incidentsCreatedByMe;

      this.showIncidents = incidents.filter((incident) => {
        const hasIssue = incident.ImpactedIssues.filter(
          ({ IncidentImpactedIssue }) =>
            IncidentImpactedIssue.ImpactedIssueId == id &&
            IncidentImpactedIssue.item == item
        );
        return hasIssue.length > 0;
      });
    },
    clearFilter() {
      this.valueFilter = "";
      this.creatorId = "";
      this.filterBy = null;
      this.showIncidents =
        this.activeBtn == "assignee"
          ? this.allIncidentsAssigneeToMe
          : this.incidentsCreatedByMe;
    },
    getEscalationPolicy(escalationPolicy) {
      if (!escalationPolicy) {
        return "";
      }
      const arr = escalationPolicy.split(":");
      if (arr.length === 1) {
        return ` Update each ${arr[0]} m`;
      }

      const [hours, minutes] = arr;

      return `Update each ${hours} h and ${minutes} m`;
    },

    userNameById() {
      this.allUsers.forEach((user) => {
        this.allUsersNameById[user.id] = user.name;
      });
    },
  },
};
</script>

<style scoped>
.table {
  overflow-x: hidden;
  overflow-y: auto;
}
.textBtu {
  text-transform: none;
}
.mainFilter {
  padding: 16px 16px 0px 16px;
  height: 100px !important;
  background-color: #009688 !important;
}
h4.header {
  color: black;
}
</style>
