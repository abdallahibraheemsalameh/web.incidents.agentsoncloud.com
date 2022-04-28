<template>
  <div>
    <v-menu
      offset-y
      close-on-click
      :close-on-content-click="false"
      max-width="700"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-row justify="space-around">
          <v-icon v-bind="attrs" v-on="on" large class="mt-8"
            >mdi-alert
          </v-icon>
        </v-row>
      </template>
      <v-container class="contain">
        <v-toolbar elevation="20" class="main" shaped>
          <v-row>
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
              <v-autocomplete
                cols="12"
                md="3"
                v-model="valueFilter"
                :items="subjectsIncident"
                cache-items
                class="filterSearch"
                flat
                hide-no-data
                hide-details
                placeholder="Subject"
                solo-inverted
                @change="filterIncidents('subject', valueFilter)"
              >
              </v-autocomplete>
            </v-col>

            <v-col>
              <v-btn class="btn-reset" @click="clearFilter">Clear</v-btn>
            </v-col>
          </v-row>
        </v-toolbar>
        <v-icon large @click="goToIncidentPage"> mdi-open-in-new </v-icon>
      </v-container>
      <div>
        <CreateIncident
          v-if="showCreateForm"
          :dialog.sync="showCreateForm"
          @getIncidents="getIncidents"
        />
      </div>

      <div>
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
              @click="getIncidentResponder"
              class="textBtu"
            >
              reporting on</v-btn
            >
            <v-btn
              color="#272727"
              class="pa-4 ml-16 text-capitalize white--text"
              @click.stop="showCreateForm = true"
            >
              Create</v-btn
            >
          </div>
        </v-row>
      </div>

      <div v-if="!showIncidents.length">
        <v-card height="50" class="grey--text pt-3 d-flex justify-center"
          >Nothing Data</v-card
        >
      </div>
      <div v-else>
        <v-list v-for="(incident, index) in showIncidents" :key="index">
          <v-list-item>
            <v-card elevation="2" width="800" height="120">
              <div class="rowCards">
                <v-row>
                  <v-col cols="6" style="height: 25px">
                    <v-card-text style="height: 25px">
                      <!-- <div v-if="activeBtn === 'assignee'">
                        Creator :{{ allUsersNameById[incident.creatorId] }}
                      </div> -->
                      <div v-if="activeBtn === 'createdByMe'">
                        Assignee :<ShowAssignees
                          :assignees="incident.assignees"
                        />
                      </div>
                      <div v-else>
                        Creator :{{ allUsersNameById[incident.creatorId] }}
                      </div>

                      <!-- <div v-if="activeBtn === 'reporter'">
                        Reporter :
                        <v-icon
                          @click.stop="
                            (incidentId = incident.id), (dialogIcone = true)
                          "
                          >mdi-eye-outline
                        </v-icon>
                        <ShowUser
                          v-if="incidentId == incident.id"
                          :dialogIcone.sync="dialogIcone"
                          :users="incident.responders"
                          :activeBtn="activeBtn"
                        />
                      </div> -->
                    </v-card-text>

                    <v-card-text style="height: 25px">
                      <div>
                        <a
                          @click.stop="
                            (incidentId = incident.id),
                              (showDetailsIncident = true)
                          "
                        >
                          {{ incident.subject }}</a
                        >
                      </div>
                      <IncidentDetails
                        v-if="incidentId == incident.id"
                        :dialogDetails.sync="showDetailsIncident"
                        :incidentId="incident.id"
                        :activeBtn="activeBtn"
                      />
                    </v-card-text>

                    <v-card-text style="height: 25px">
                      {{
                        incident.createdAt
                          ? incident.createdAt.split("T")[0]
                          : ""
                      }}
                      at
                      {{
                        incident.createdAt
                          ? incident.createdAt.split("T")[1].split(".")[0]
                          : ""
                      }}
                    </v-card-text>
                  </v-col>
                  <v-col cols="5">
                    <!-- <v-card-text style="height: 25px">
                  Activity status :
                </v-card-text> -->
                    <v-card-text style="height: 25px"
                      >State :{{ incident.state }}
                    </v-card-text>

                    <v-card-text style="height: 25px"
                      >Priority :{{ incident.priority }}
                    </v-card-text>

                    <v-card-text style="height: 25px">
                      Deadline :{{
                        incident.deadline ? incident.deadline.split("T")[0] : ""
                      }}
                      at
                      {{
                        incident.deadline
                          ? incident.deadline.split("T")[1].split(".")[0]
                          : ""
                      }}</v-card-text
                    >
                  </v-col>
                  <v-col cols="1">
                    <Ellipsis
                      v-if="showEllipsis"
                      :creatorIdProps="incident.creatorId"
                      :activeBtn="activeBtn"
                      :itemProps="incident"
                      :incidentIdProps="incident.id"
                      @getIncidents="getIncidents"
                    />
                  </v-col>
                </v-row>
              </div>
            </v-card>
          </v-list-item>
        </v-list>
      </div>
    </v-menu>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Test from "../components/Test.vue";
import Test222 from "./test222.vue";
export default {
  components: { Test, Test222 },
  data() {
    return {
      showDetailsIncident: false,
      incidentId: null,
      valueFilter: "",
      priorityFilter: ["High", "Medium", "Low"],
      showIncidents: [],
      allUsersNameById: {},
      showAssigneeToMe: true,
      activeBtn: "assignee",
      showEllipsis: true,
      showcard: false,
      filterBy: {},
      stateFilter: [
        "On Hold",
        "Resolved (corrective)",
        "New",
        "Closed (preventive)",
      ],
      userId: null,
      creatorFilter: [],
      creatorId: "",
      itemNames: [],
      selectedImpactedIssueId: null,
      itemList: [],
      itemName: null,
      filterBy: {},
      user: "",
      assigneeNames: [],
      issue: null,
      showCreateForm: false,
      subjectsIncident: [],
      dialogIcone: false,
      message: "",
    };
  },
  computed: {
    ...mapGetters([
      "allUsers",
      "creator",
      "incidentsCreatedByMe",
      "allIncidentsAssigneeToMe",
      "allImpactedIssues",
      "responderData",
      "userData",
      "incidentsResponder",
      "allIncident",
    ]),
  },
  async mounted() {
    this.userId = localStorage.getItem("userId");
    this.getUserById(this.userId);
    await this.getIncidents();
    await this.getIncidentByResponderToMe();
    this.getAllIncidents();
    this.getUserById(this.userId);
    this.showIncidents = await this.allIncidentsAssigneeToMe;
    console.log(
      this.showIncidents,
      "this.showIncidentsthis.showIncidentsthis.showIncidents"
    );
    await this.getUsers();
    this.userNameById();
    this.creatorFilter = this.allUsers.map((user) => {
      return user.name;
    });
    this.subjectsIncident = this.allIncident.map((incident) => {
      return incident.subject;
    });

    // this.responders = this.responderData;
  },
  methods: {
    ...mapActions([
      "getAllIncidents",
      "getUsers",
      "getIncidentsCreatedByMe",
      "getIncidentByAssigneeToMe",
      "getAllImpactedIssues",
      "getUserById",
      "getUsers",
      "getIncidentByResponderToMe",
    ]),
    userNameById() {
      this.allUsers.forEach((user) => {
        this.allUsersNameById[user.id] = user.name;
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
    filterIncidents(key, value) {
      console.log(key, value, "key, value");
      if ((key, value)) {
        this.filterBy[key] = value;
      }

      const incidents = this.showAssigneeToMe
        ? this.allIncidentsAssigneeToMe
        : this.incidentsCreatedByMe;
      Object.entries(this.filterBy).map(([key, value]) => {
        this.showIncidents = incidents.filter(
          (incident) => incident[key] == value
        );
      });
    },
    async getIncidents() {
      await this.getIncidentByAssigneeToMe();
      await this.getIncidentsCreatedByMe();

      this.showIncidents = this.showAssigneeToMe
        ? this.allIncidentsAssigneeToMe
        : this.incidentsCreatedByMe;
    },
    filterCreatorName(value) {
      this.filterIncidents("creatorId", +this.creatorId);
      if (!this.filterIncidents) {
        this.message = "Nothing data";
      }
      console.log(this.message, "this.messagethis.message");
    },
    getIncidentCreatedByMe() {
      this.showAssigneeToMe = false;
      this.activeBtn = "createdByMe";
      this.showIncidents = this.incidentsCreatedByMe;
    },
    assignedToMe() {
      this.activeBtn = "assignee";
      this.showAssigneeToMe = true;
      this.showIncidents = this.allIncidentsAssigneeToMe;
    },
    getIncidentResponder() {
      this.activeBtn = "reporter";
      this.showIncidents = this.incidentsResponder;
    },

    goToIncidentPage() {
      this.$router.push("allIncidents");
    },
  },
};
</script>

<style>
.main {
  padding: 16px;
  height: 100px !important;
  background-color: #009688 !important;
}
.main .filterSearch {
  background-color: #fff;
}
.btn-reset {
  color: gray !important;
}
.btn-result {
  background-color: #000 !important;
  color: #fff !important;
}
.btn-result,
.btn-reset {
  padding: 23px !important;
}
.resetBtn {
  color: #fff !important;
  text-transform: none;
  margin-left: 33px;
}
.contain {
  display: flex;
  justify-content: space-between;
}
.rowCards {
  border: solid 2px #3daea3;
  height: 100%;
}
</style>
