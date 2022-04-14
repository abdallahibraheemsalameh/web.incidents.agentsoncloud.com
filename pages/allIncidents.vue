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
    ></v-progress-linear>
    <div class="header">
      <div class="counters">
        <div class="OLA">
          <h3 class="headerOLA">OLA : {{ impactOperational() }}</h3>
          <p class="paraOLA">Operational level Agreement Incident</p>
        </div>
        <div class="SLA">
          <h3 class="headerSLA">SLA : {{ impactFinancial() }}</h3>
          <p class="paraSLA">Service level Agreement Incident</p>
        </div>
      </div>
      <div class="creatAndSearch">
        <div class="created">
          <v-btn
            color="accent"
            @click.stop="showCreateForm = true"
            class="textBtu"
          >
            + Create Incident</v-btn
          >
          <CreateIncident v-if="showCreateForm" :dialog.sync="showCreateForm" />
        </div>
      </div>
    </div>
    <div>
      <v-card>
        <v-container fluid>
          <v-row>
            <v-col cols="1"> filter by: </v-col>
            <v-col cols="3">
              <v-row>
                <v-col cols="6">
                  <v-menu>
                    <template v-slot:activator="{ attrs, on }">
                      <v-btn class="impactedIssue" v-bind="attrs" v-on="on"
                        >impacted issue</v-btn
                      >
                    </template>
                    <v-list>
                      <v-list-item
                        v-for="(impactedIssue, i) in allImpactedIssues"
                        :key="i"
                        link
                        @change="
                          selectionImpactedIssue(
                            impactedIssue.name,
                            impactedIssue.id
                          )
                        "
                      >
                        <v-list-item-title
                          v-text="impactedIssue.name"
                        ></v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-col>
                <v-col cols="6">
                  <v-autocomplete
                    :items="itemNames"
                    dense
                    chips
                    small-chips
                    solo
                    label="Search"
                    @change="filterImpactedIssue"
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="2">
              <v-autocomplete
                v-model="valueFilter"
                :items="priorityFilter"
                dense
                chips
                small-chips
                label="Priority"
                @change="filterIncidents('priority', valueFilter)"
                solo
              ></v-autocomplete>
            </v-col>
            <v-col cols="2">
              <v-autocomplete
                v-model="valueFilter"
                :items="stateFilter"
                dense
                chips
                small-chips
                label="State"
                solo
                @change="filterIncidents('state', valueFilter)"
              ></v-autocomplete>
            </v-col>
            <v-col cols="2">
              <v-autocomplete
                v-model="creatorId"
                :items="allUsers"
                dense
                chips
                small-chips
                label="creator name"
                item-value="id"
                item-text="name"
                solo
                @change="filterCreatorName()"
              >
                <!-- <template #label>
                  <v-icon large color="green darken-2"> mdi-minus </v-icon>
                </template> -->
              </v-autocomplete>
            </v-col>
            <v-col cols="2">
              <v-btn
                elevation="2"
                dense
                chips
                small-chips
                solo
                @click="clearFilter"
                >Clear filter</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </div>

    <template>
      <!-- <v-card>
        <v-card-title> -->
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <!-- </v-card-title> -->

      <v-data-table
        :headers="headers"
        :items="showIncidents"
        :search="search"
        show-expand
        single-expand
      >
        <template v-slot:[`item.responderId`]="{ item }">
          <div v-for="user in responder" :key="user.id">
            <div v-if="item.id == responder.id">{{}}</div>
          </div>
        </template>
        <template #[`item.icon`]="{ item }">
          <Ellipsis
            :creatorIdProps="item.creatorId"
            :incidentIdProps="item.id"
            :itemProps="item"
            @edit="updateData"
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
        <!-- <template v-slot:[`item.responderId`]>
            <div>{{ creator.name }}</div>

          </template> -->
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
import Ellipsis from "../components/IncidentsEllipsis.vue"
export default {
  components: {Ellipsis},
  data() {
    return {
      buttonName: "",
      search: "",
      responderId: "",
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
    };
  },
  computed: {
    ...mapGetters([
      "allIncident",
      "allUsers",
      "responder",
      "creator",
      "incidentsCreatedByMe",
      "allIncidentsAssigneeToMe",
      "allImpactedIssues",
      "allInventories",
      "allFacilities",
      "allSuppliers",
      "allUsers",
    ]),
  },

  async mounted() {
    this.userId = localStorage.getItem("userId");
    this.getCreatorById(this.userId);
    console.log(this.creator, "creator");
    this.getIncidentsCreatedByMe({ id: this.userId });
    await this.getIncidentByAssigneeToMe(this.userId);
    this.showIncidents = this.allIncidentsAssigneeToMe;
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
    // console.log(this.showIncidents[0].responderId, "iiiiiiiiiiiiiiiiiiiii");
    // await this.getResponderById(this.showIncidents[0].responderId);
    // console.log(this.responder, "this.responder");
    // this.priority = await this.showIncidents.map((incident) => {
    //   return incident.priority;
    // });
    // console.log(this.priority.sort(), "this.priority");
    // this.responders = await this.responders.filter((responder) => {
    //   return responder.responderName;
    // });

    // this.incidents = [this.allIncident];
  },
  methods: {
    ...mapActions([
      "getAllIncidents",
      "getUsers",
      "getResponder",
      "getCreatorById",
      "getIncidentsCreatedByMe",
      "getIncidentByAssigneeToMe",
      "getAllImpactedIssues",
      "getInventories",
      "getAllSuppliers",
      "getAllFacility",
      "getUsers",
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
    getIncidentCreatedByMe(incident) {
      // incident = this.incidentsCreatedByMe;
      this.getHeaders("Assignee");
      this.showAssigneeToMe = false;
      this.showIncidents = this.incidentsCreatedByMe;
      console.log(this.showIncidents, "this.showIncidents");
    },
    assignedToMe() {
      this.getHeaders("Creator");
      this.showAssigneeToMe = true;
      this.showIncidents = this.allIncidentsAssigneeToMe;
      console.log(this.showIncidents, "assignedToMe");
    },
    updateData() {
      console.log(this.showIncidents, "0000000000000000000000000000updaye");
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

    selectionImpactedIssue(name, id) {
      this.selectedImpactedIssueId = id;
      console.log(this.selectedImpactedIssueId, "this.selectedImpactedIssueId");
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
p.paraOLA {
  padding: 12px 18px;
}
h3.headerSLA {
  margin-top: -13px;
}
p.paraSLA {
  margin-right: 46px;
}
.textBtu {
  text-transform: none;
}
</style>
