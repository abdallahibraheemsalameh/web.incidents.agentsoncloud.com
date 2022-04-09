<template>
  <div class="table">
    <v-row justify="space-between">
      <div class="ml-8 mt-4">
        <v-btn
          :outlined="showAssigneeToMe"
          color="indigo accent-2"
          elevation="2"
          :plain="!showAssigneeToMe"
          @click="assignedToMe"
          :text="false"
          class="textBtu"
        >
          Assigned to me</v-btn
        >
        <v-btn
          :outlined="!showAssigneeToMe"
          color="indigo accent-2"
          elevation="2"
          :plain="showAssigneeToMe"
          @click="getIncidentCreatedByMe"
          class="textBtu"
        >
          Created by me</v-btn
        >
      </div>

      <div justify="space-around" class="mr-8 mt-4">
        <v-btn
          :outlined="!history"
          color="indigo accent-2"
          elevation="2"
          :plain="history"
          @click="getHistory"
          class="textBtu"
        >
          Incident history</v-btn
        >
        <v-btn
          :outlined="!activity"
          color="indigo accent-2"
          elevation="2"
          :plain="activity"
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
          <h4>OLA : {{ impactOperational() }}</h4>
          <span class="ml-2">Operational level Agreement Incident</span>
        </div>
        <div class="d-flex">
          <h4>SLA : {{ impactFinancial() }}</h4>
          <span class="ml-2">Service level Agreement Incident</span>
        </div>
      </div>
      <div class="create-btn">
        <v-btn
          color="accent"
          @click.stop="showCreateForm = true"
          class="textBtu"
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
    <div class="mt-2 ml-8">
      <v-row class="my-0 mx-0">
        <v-col class="py-0 px-0" cols="1">Filter by:</v-col>
        <v-col class="py-0 px-1" cols="3">
          <v-row class="my-0 mx-0">
            <v-col class="py-0 px-1" cols="6">
              <v-select
                :items="allImpactedIssues"
                v-model="issue"
                item-text="name"
                return-object
                label="impacted issue"
                dense
                solo
                @change="selectionImpactedIssue()"
              ></v-select>
            </v-col>
            <v-col class="py-0 px-1" cols="6">
              <v-autocomplete
                :items="itemNames"
                dense
                solo
                label="Search"
                @change="filterImpactedIssue"
              ></v-autocomplete>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="py-0 px-1" cols="2">
          <v-autocomplete
            v-model="valueFilter"
            :items="priorityFilter"
            dense
            label="Priority"
            @change="filterIncidents('priority', valueFilter)"
            solo
          ></v-autocomplete>
        </v-col>
        <v-col class="py-0 px-1" cols="2">
          <v-autocomplete
            v-model="valueFilter"
            :items="stateFilter"
            dense
            label="State"
            solo
            @change="filterIncidents('state', valueFilter)"
          ></v-autocomplete>
        </v-col>
        <v-col class="py-0 px-1" cols="2">
          <v-autocomplete
            v-model="creatorId"
            :items="allUsers"
            dense
            label="creator name"
            item-value="id"
            item-text="name"
            solo
            @change="filterCreatorName()"
          >
          </v-autocomplete>
        </v-col>
        <v-col class="py-0 ml-8" cols="1">
          <v-btn elevation="2" dense chips small-chips solo @click="clearFilter"
            >Clear filter</v-btn
          >
        </v-col>
      </v-row>
    </div>

    <template>
      <div class="mx-8">
        <v-text-field
          class="mt-0 pt-0"
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </div>

      <v-data-table
        :headers="headers"
        :items="showIncidents"
        :search="search"
        show-expand
        single-expand
      >
        <!-- <template
          v-slot:[`item.responderId`]="{ item }"
          :responId="item.responderId"
        >
          {{ responders.name }}
        </template> -->
        <template #[`item.icon`]="{ item }">
          <Ellipsis
            :creatorIdProps="item.creatorId"
            :incidentIdProps="item.id"
            :itemProps="item"
            @getIncidents="getIncidents"
          />
        </template>
        <template v-slot:[`item.subject`]="{ value, item }">
          <nuxt-link
            :to="{
              path: '/incidentDetails?',
              query: { incidentId: item.id },
            }"
            >{{ value }}</nuxt-link
          >
        </template>
        <template v-slot:[`item.creatorId`]="{ item }">
          <div v-if="item.creatorId == userId">Assignee</div>
          <div v-else>{{ creator.name }}</div>
        </template>

        <template v-slot:[`item.impactedIssues`]="{ item }">
          <div
            v-for="impactedIssue in item.ImpactedIssues"
            :key="impactedIssue.id"
          >
            {{ impactedIssue.name }}/
            {{ impactedIssue.IncidentImpactedIssue.item }}
          </div>
        </template>
        <template v-slot:[`item.deadline`]="{ item }">
          {{ item.deadline ? item.deadline.split("T")[0] : "" }} at
          {{ item.deadline ? item.deadline.split("T")[1].split(".")[0] : "" }}
        </template>
        <template v-slot:[`item.escalationPolicy`]="{ item }">
          Update each
          {{ item.escalationPolicy ? item.escalationPolicy.split(":")[1] : "" }}
          m
        </template>
        <template v-slot:[`item.createdAt`]="{ item }">
          {{ item.createdAt ? item.createdAt.split("T")[0] : "" }} at
          {{ item.createdAt ? item.createdAt.split("T")[1].split(".")[0] : "" }}
        </template>
      </v-data-table>
      <!-- </v-card> -->
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  // props: {
  //   responId: {
  //     type: String,
  //     required: true,
  //   },
  // },
  data() {
    return {
      buttonName: "",
      search: "",
      headers: [],
      incidents: [],
      name: "Noof",

      showCreateForm: false,
      items: ["Update", "update escalation duration", "Add comment", "Delete"],
      value: "",
      creatorId: "",
      incidentSort: [],
      userId: null,
      showIncidents: [],
      priority: [],
      showAssigneeToMe: true,
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
      responderId: null,
      responders: {},
      iddd: null,
      issue: null,
    };
  },
  computed: {
    ...mapGetters([
      "allIncident",
      "allUsers",
      "creator",
      "incidentsCreatedByMe",
      "allIncidentsAssigneeToMe",
      "allImpactedIssues",
      "allInventories",
      "allFacilities",
      "allSuppliers",
      "allUsers",
      "responderData",
    ]),
  },

  async mounted() {
    this.userId = localStorage.getItem("userId");
    this.getCreatorById(this.userId);
    await this.getIncidents();
    this.showIncidents = await this.allIncidentsAssigneeToMe;
    this.getHeaders("Creator");
    await this.getUsers();
    this.getAllImpactedIssues();

    this.creatorFilter = this.allUsers.map((user) => {
      return user.name;
    });
    this.getAllIncidents();
    this.getAllFacility();
    this.getAllSuppliers();
    this.getUsers();
    // this.responders = this.incidentsCreatedByMe.map((elem) => {
    //   return elem.responderId;
    // });
    // console.log(this.responders, "jjjjjthis.responders");
    // await this.getResponderById(this.responId);
    this.responders = this.responderData;
  },
  methods: {
    ...mapActions([
      "getAllIncidents",
      "getUsers",
      "getCreatorById",
      "getIncidentsCreatedByMe",
      "getIncidentByAssigneeToMe",
      "getAllImpactedIssues",
      "getInventories",
      "getAllSuppliers",
      "getAllFacility",
      "getUsers",
      "getResponderById",
      "getResponderById",
    ]),
    getHeaders(creatorHeader) {
      this.headers = [
        {
          text: "Incident subject",
          align: "start",
          value: "subject",
        },
        { text: "Impacted issue", value: "impactedIssues" },
        { text: creatorHeader, value: "creatorId" },
        { text: "Date creation and time", value: "createdAt" },
        { text: "priority", value: "priority" },
        { text: "state", value: "state" },
        { text: "Deadline", value: "deadline" },
        // { text: "category", value: "category" },
        { text: "Escalation policy", value: "escalationPolicy" },
        { text: "responder", value: "responderId" },
        { text: "", value: "icon" },
      ];
    },
    // async getResponderName(id) {
    //   await this.getResponderById(id);
    //   console.log(this.responder, "this.responderssssssssssssss");
    //   return "llllll";
    // },
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
      this.getHeaders("Assignee");
      this.showAssigneeToMe = false;
      this.showIncidents = this.incidentsCreatedByMe;
    },
    assignedToMe() {
      this.getHeaders("Creator");
      this.showAssigneeToMe = true;
      this.showIncidents = this.allIncidentsAssigneeToMe;
      console.log(this.showIncidents, "assignedToMe");
    },
    async getIncidents() {
      await this.getIncidentByAssigneeToMe();
      await this.getIncidentsCreatedByMe();
      this.showIncidents = this.showAssigneeToMe
        ? this.allIncidentsAssigneeToMe
        : this.incidentsCreatedByMe;
    },
    goActivity() {
      this.showAssigneeToMe = false;
    },
    getHistory() {
      this.$router.push(`incidentHistory`);
    },
    filterIncidents(key, value) {
      if ((key, value)) {
        this.filterBy[key] = value;
      }

      const incidents = this.showAssigneeToMe
        ? this.allIncidentsAssigneeToMe
        : this.incidentsCreatedByMe;
      console.log("key, value", this.filterBy, incidents);
      Object.entries(this.filterBy).map(([key, value]) => {
        this.showIncidents = incidents.filter(
          (incident) => incident[key] == value
        );
      });
    },

    filterCreatorName(value) {
      this.filterIncidents("creatorId", +this.creatorId);
    },

    selectionImpactedIssue() {
      const { name, id } = this.issue;
      this.selectedImpactedIssueId = id;
      const itemsLists = {
        Facilities: this.allFacilities,
        Suppliers: this.allSuppliers,
        "Inventory item": this.allInventories,
        "Consumer profile": this.allUsers,
        Appointment: this.allSuppliers,
        "Users profiles": this.allUsers,
      };
      this.itemList = itemsLists[name];
      this.itemNames = this.itemList.map((item) => {
        return item.name;
      });
    },
    filterImpactedIssue(value) {
      const incidents = this.showAssigneeToMe
        ? this.allIncidentsAssigneeToMe
        : this.incidentsCreatedByMe;

      this.showIncidents = incidents.filter((incident) => {
        const hasIssue = incident.ImpactedIssues.filter(
          ({ IncidentImpactedIssue }) =>
            IncidentImpactedIssue.ImpactedIssueId ==
              this.selectedImpactedIssueId &&
            IncidentImpactedIssue.item == value
        );
        return hasIssue.length > 0;
      });
    },
    clearFilter() {
      this.valueFilter = "";
      this.creatorId = "";
      this.filterBy = null;
      this.showIncidents = this.showAssigneeToMe
        ? this.allIncidentsAssigneeToMe
        : this.incidentsCreatedByMe;
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
</style>
