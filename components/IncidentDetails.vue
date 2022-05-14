<template>
  <v-dialog
    v-model="dialogDetails"
    light
    persistent
    overlay-color="rgb(152 152 152)"
    overlay-opacity="0.90"
    width="90%"
  >
    <template>
      <v-card>
        <v-card-title>
          <div>Incident Full Details</div>
        </v-card-title>
        <div class="d-flex justify-space-around">
          <v-card width="350">
            <v-row class="d-flex justify-space-around pa-2">
              <div class="pa-4">
                <h5>Subject</h5>
              </div>
              <v-col col="9">{{ incidentDetails.subject }}</v-col>
            </v-row>

            <v-progress-linear
              height="1"
              value="100"
              color="rgb(117 117 117)"
              class="line"
            ></v-progress-linear>
            <v-row class="d-flex justify-space-around pa-2">
              <div class="pa-4">
                <h5>Type</h5>
              </div>
              <v-col>{{ incidentDetails.type }}</v-col>
            </v-row>
            <v-progress-linear
              height="1"
              value="200"
              color="rgb(117 117 117)"
              class="line"
            ></v-progress-linear>
            <v-row
              v-if="incidentDetails.happeningTime"
              class="d-flex justify-space-around pa-2"
            >
              <div class="pa-4"><h5>Incident Time</h5></div>
              <v-col>
                {{
                  incidentDetails.happeningTime
                    ? new Date(incidentDetails.happeningTime).toLocaleString()
                    : ""
                }}</v-col
              >
            </v-row>
            <v-progress-linear
              height="1"
              value="200"
              color="rgb(117 117 117)"
              class="line"
            ></v-progress-linear>

            <v-row class="d-flex justify-space-around pa-2">
              <v-row
                class="pa-3"
                v-if="activeBtn === 'reporter' || activeBtn === 'assignee'"
              >
                <div class="pa-4"><h5>Creator</h5></div>
                <v-col>{{ allUsersNameById[userId] }}</v-col>
              </v-row>

              <v-row class="pa-3" v-if="activeBtn === 'createdByMe'">
                <div class="pa-4"><h5>Assignee</h5></div>
                <div
                  v-if="
                    incidentDetails.assignees &&
                    incidentDetails.assignees.length == 1
                  "
                >
                  <v-col>
                    {{ incidentDetails.assignees[0].name }}
                  </v-col>
                </div>
                <div
                  v-if="
                    incidentDetails.assignees &&
                    incidentDetails.assignees.length > 1
                  "
                >
                  <v-col>
                    <v-icon
                      @click.stop="
                        (incidentId = incidentDetails.id),
                          (assigneeDialog = true)
                      "
                      >mdi-eye-outline
                    </v-icon>
                  </v-col>
                  <ShowUser
                    v-if="incidentId == incidentDetails.id && assigneeDialog"
                    :dialogIcone.sync="assigneeDialog"
                    :users="incidentDetails.assignees"
                    :userDialogTitle="'Assignees'"
                    :activeBtn="activeBtn"
                  />
                </div>
              </v-row>
            </v-row>
            <v-progress-linear
              height="1"
              value="200"
              color="rgb(117 117 117)"
              class="line"
            ></v-progress-linear>
            <div
              v-if="
                handleShowUsers(
                  incidentDetails.assignees,
                  incidentDetails.responders,
                  activeBtn
                ) !== 'Show icon'
              "
            >
              <v-row class="pa-2">
                <div class="pa-4">
                  <h5>
                    {{ activeBtn !== "reporter" ? "Reporter:" : "Assignee:" }}
                  </h5>
                </div>

                <v-col
                  >{{
                    handleShowUsers(
                      incidentDetails.assignees,
                      incidentDetails.responders,
                      activeBtn
                    )
                  }}
                </v-col>
              </v-row>
            </div>
            <v-row v-else class="pa-2">
              <div class="pa-4">
                <h5>
                  {{ activeBtn !== "reporter" ? "Reporter:" : "Assignee:" }}
                </h5>
              </div>
              <v-col>
                <v-icon
                  @click.stop="
                    (incidentId = incidentDetails.id), (dialogIcone = true)
                  "
                  >mdi-eye-outline
                </v-icon>
              </v-col>

              <ShowUser
                v-if="incidentId == incidentDetails.id && dialogIcone"
                :dialogIcone.sync="dialogIcone"
                :users="
                  activeBtn === 'reporter'
                    ? incidentDetails.assignees
                    : incidentDetails.responders
                "
                :userDialogTitle="
                  activeBtn === 'reporter' ? 'Assignees' : 'Reporters'
                "
                :activeBtn="activeBtn"
              />
            </v-row>

            <v-progress-linear
              height="1"
              value="100"
              color="rgb(117 117 117)"
              class="line"
            ></v-progress-linear>
            <v-row class="d-flex justify-space-around pa-2">
              <div class="pa-4"><h5>Creation Time</h5></div>
              <v-col>
                {{
                  incidentDetails.createdAt
                    ? new Date(incidentDetails.createdAt).toLocaleString()
                    : ""
                }}</v-col
              >
            </v-row>
            <v-progress-linear
              height="1"
              value="200"
              color="rgb(117 117 117)"
              class="line"
            ></v-progress-linear>
            <v-row class="d-flex justify-space-around pa-2">
              <div class="pa-4"><h5>Deadline</h5></div>
              <v-col>
                {{
                  incidentDetails.deadline
                    ? new Date(incidentDetails.deadline).toLocaleString()
                    : ""
                }}</v-col
              >
            </v-row>
            <v-progress-linear
              height="1"
              value="200"
              color="rgb(117 117 117)"
              class="line"
            ></v-progress-linear>
          </v-card>
          <v-card width="350">
            <v-row class="d-flex justify-space-around pa-2">
              <div class="pa-4"><h5>State</h5></div>
              <v-col>
                <!-- <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <div v-bind="attrs" v-on="on" @click="showText = !showText"> -->
                {{ incidentDetails.state }}
                <!-- </div>
                  </template>

                  <span>Show text state</span> -->
                <!-- </v-tooltip> -->
              </v-col>
            </v-row>

            <v-progress-linear
              height="1"
              value="200"
              color="rgb(117 117 117)"
              class="line"
            ></v-progress-linear>
            <v-row class="d-flex justify-space-between pa-2">
              <div class="pa-1"><h5>on hold reason</h5></div>
              <v-icon class="mr-5" @click="showReason = !showReason"
                >mdi-chevron-down</v-icon
              >
            </v-row>
            <v-row v-if="showReason">
              <v-col v-for="(state, i) in onHoldReason" :key="state.id">
                {{ i + 1 }} - {{ state.actionText }}
              </v-col>
            </v-row>

            <v-progress-linear
              height="1"
              value="200"
              color="rgb(117 117 117)"
              class="mr-12"
            ></v-progress-linear>
            <v-row class="d-flex justify-space-between pa-2">
              <div class="pa-1"><h5>Corrective action</h5></div>
              <v-icon class="mr-5" @click="showCorrective = !showCorrective"
                >mdi-chevron-down</v-icon
              >
            </v-row>
            <v-row class="pa-2" v-if="showCorrective">
              <v-col v-for="(state, i) in correctiveAction" :key="state.id">
                {{ i + 1 }} - {{ state.actionText }}
              </v-col>
            </v-row>

            <v-progress-linear
              height="1"
              value="200"
              color="rgb(117 117 117)"
              class="line"
            ></v-progress-linear>
            <v-row class="d-flex justify-space-between pa-2">
              <div class="pa-1"><h5>Preventive action</h5></div>
              <v-icon class="mr-5" @click="showReventive = !showReventive"
                >mdi-chevron-down</v-icon
              >
            </v-row>
            <!-- <v-row v-if="showReventive">
              <v-col v-for="(state, i) in preventiveAction" :key="state.id">
                {{ i + 1 }} - {{ state.actionText }}
              </v-col>
            </v-row> -->
            <v-progress-linear
              height="1"
              value="200"
              color="rgb(117 117 117)"
              class="line"
            ></v-progress-linear>

            <v-row class="d-flex justify-space-around pa-2">
              <div class="pa-4"><h5>Severity level</h5></div>
              <v-col>{{ incidentDetails.severityLevel }}</v-col>
            </v-row>
            <v-progress-linear
              height="1"
              value="100"
              color="rgb(117 117 117)"
              class="line"
            ></v-progress-linear>
            <v-row class="d-flex justify-space-around pa-2">
              <div class="pa-4"><h5>Impact level</h5></div>
              <v-col>{{ incidentDetails.severityLevel }}</v-col>
            </v-row>
            <v-progress-linear
              height="1"
              value="100"
              color="rgb(117 117 117)"
              class="line"
            ></v-progress-linear>

            <v-row class="d-flex justify-space-around pa-2">
              <div class="pa-4"><h5>Update duration</h5></div>
              <v-col>{{ incidentDetails.escalationPolicy }}</v-col>
            </v-row>
            <v-progress-linear
              height="1"
              value="200"
              color="rgb(117 117 117)"
              class="line"
            ></v-progress-linear>
          </v-card>

          <v-card width="350">
            <v-row class="d-flex pa-2">
              <div class="pa-4"><h5>Severity description</h5></div>
              <v-col
                v-if="
                  incidentDetails.severityDescription &&
                  incidentDetails.severityDescription.length <= 10
                "
                >{{ incidentDetails.severityDescription }}</v-col
              >
            </v-row>
            <v-row class="d-flex justify-space-around pa-2">
              <v-col
                class="ml-1 mt-0"
                v-if="
                  incidentDetails.severityDescription &&
                  incidentDetails.severityDescription.length > 10 &&
                  !showMoreSeverity
                "
              >
                {{ incidentDetails.severityDescription.substr(0, 10) }}...
              </v-col>
              <!-- <v-icon class="mr-5" @click="showMoreSeverity = !showMoreSeverity"
                >mdi-chevron-down</v-icon
              > -->
              <v-row class="d-flex justify-end pa-6">
                <v-icon @click="showMoreSeverity = !showMoreSeverity"
                  >mdi-chevron-down</v-icon
                >
              </v-row>
            </v-row>
            <v-col v-if="showMoreSeverity">
              {{ incidentDetails.impactDescription }} </v-col
            ><!--
            <v-progress-linear
              height="1"
              value="200"
              color="rgb(117 117 117)"
              class="line"
            ></v-progress-linear>
            <v-row class="d-flex justify-space-around pa-2">
              <div class="pa-4"><h5>Impact description</h5></div>
              <v-col
                v-if="
                  incidentDetails.impactDescription &&
                  incidentDetails.impactDescription.length <= 10
                "
                >{{ incidentDetails.impactDescription }}</v-col
              >
            </v-row>
            <v-row class="d-flex justify-space-around pa-2">
              <div class="pa-4"><h5>Impact description</h5></div>
              <v-col
                v-if="
                  incidentDetails.impactDescription &&
                  incidentDetails.impactDescription.length > 10
                "
              >
                {{ incidentDetails.impactDescription.substr(0, 10) }}...
              </v-col>
              <v-icon class="mr-5" @click="showMoreImpact = !showMoreImpact"
                >mdi-chevron-down</v-icon
              >
            </v-row>

            <v-col v-if="showMoreImpact">
              {{
                incidentDetails.impactDescription.replace(
                  incidentDetails.impactDescription.substr(0, 10),
                  ""
                )
              }}
            </v-col>
-->
            <!-- <v-progress-linear
              height="1"
              value="200"
              color="rgb(117 117 117)"
              class="line"
            ></v-progress-linear>

            <v-row
              class="d-flex justify-space-around pa-2"
              v-if="incidentDetails.description.length <= 4"
            >
              <div class="pa-4"><h5>Description</h5></div>
              <v-col>
                {{ incidentDetails.description }}
              </v-col>
            </v-row>

            <v-row
              class="d-flex pa-2"
              v-if="incidentDetails.description.length > 10"
            >
              <div class="pa-4"><h5>Description</h5></div>
              <div class="pl-4">
                {{ incidentDetails.description.substr(0, 10) }}...
                {{ incidentDetails.description }}
              </div>
              <v-row class="d-flex justify-end pa-2 mr-2 mb-2">
                <v-icon class="ml-15" @click="showMore = !showMore"
                  >mdi-chevron-down</v-icon
                >
              </v-row>
            </v-row>

            <v-col v-if="showMore">
              {{
                incidentDetails.description.replace(
                  incidentDetails.description.substr(0, 10),
                  ""
                )
              }}
            </v-col> -->

            <v-progress-linear
              height="1"
              value="200"
              color="rgb(117 117 117)"
              class="line"
            ></v-progress-linear>
          </v-card>
        </div>

        <v-progress-linear
          height="1"
          value="100"
          color="rgb(117 117 117)"
          class="progress-linear py-4"
        ></v-progress-linear>

        <div class="likedAndCheck">
          <div class="linked">
            <h3 class="ml-6">Linked issues</h3>
            <div class="dropIssue">
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <div
                    v-bind="attrs"
                    v-on="on"
                    class="d-flex justify-space-around"
                  >
                    <div>Issues</div>
                    <div><v-icon>mdi-chevron-down</v-icon></div>
                  </div>
                </template>
                <v-list
                  v-if="
                    incidentDetails.ImpactedIssues &&
                    incidentDetails.ImpactedIssues.length
                  "
                >
                  <v-list-item
                    v-for="(impactedIssue, i) in incidentDetails.ImpactedIssues"
                    :key="impactedIssue.id"
                  >
                    <v-list-item-title>
                      {{ i + 1 }} - {{ impactedIssue.name }} -
                      <a href="">
                        <!-- linled issue from anas -->
                        {{ impactedIssue.IncidentImpactedIssue.item }}</a
                      >
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
                <v-card v-else>
                  <v-card
                    height="50"
                    class="grey--text pt-3 d-flex justify-center"
                    >Nothing Data</v-card
                  >
                </v-card>
              </v-menu>
            </div>
          </div>
          <div class="task">
            <v-checkbox
              v-model="incidentDetails.sendToAssignee"
              background-color="#f9f9f9"
              label="to be as a task sent to assignee"
              disabled
            ></v-checkbox>
          </div>
        </div>
        <v-progress-linear
          height="1"
          value="100"
          color="rgb(117 117 117)"
          class="progress-linear pb-4 pt-1"
        ></v-progress-linear>

        <div class="buttons">
          <v-btn
            class="text-capitalize #eeeeee --text"
            :color="colorComment"
            @click="showPage('comments')"
          >
            Comments
          </v-btn>

          <v-btn
            @click="showPage('activityLog')"
            :color="colorActivityLog"
            class="text-capitalize #eeeeee--text"
          >
            activity Log</v-btn
          >

          <v-btn
            @click="showPage('updates')"
            class="text-capitalize LightGray--text"
            :color="colorUpdates"
          >
            Updates
          </v-btn>
          <v-btn
            @click="showPage('attachements')"
            class="text-capitalize LightGray--text"
            :color="colorUpdates"
          >
            Attachements
          </v-btn>
        </div>
        <div>
          <div v-if="buttonName == `comments`">
            <Comments
              :id="commentIncident"
              type="incident"
              :taskCreator="incidentDetails.creatorId"
              :userId="userId"
              userName="name"
            />
          </div>
          <div v-else-if="buttonName == `activityLog`">
            <ActivityLog
              :incidentId="incidentDetails.id"
              :userName="allUsersNameById[userId]"
            />
          </div>
          <!-- update comment -->
          <div v-else-if="buttonName == `attachements`">
            <div
              v-for="attachment in incidentDetails.Attachments"
              :key="attachment.id"
              class="pa-8"
            >
              <v-img
                v-bind:src="attachment.attachment"
                max-height="150"
                max-width="250"
              ></v-img>
            </div>
          </div>

          <div v-else-if="buttonName == `updates`">
            <!-- <div class="pa-4">
              <v-row>
                <v-col col="1"></v-col>
                <v-col col="6">
                  <v-text-field
                    v-model="updateText"
                    label="Update text"
                    dense
                    value=""
                    solo
                  ></v-text-field>
                </v-col>
                <v-col col="4">
                <v-btn @click="createNewUpdate" class="text-capitalize">
                  Update
                </v-btn>
                </v-col>
                <v-col class="d-flex mr-12">
                  <div>
                    <h5>Next update:</h5>
                  </div>
                  <div class="pl-4">after 12:90 M</div>
                </v-col>
              </v-row>
            </div> -->
            <div class="d-flex justify-space-around pa-4">
              <div class="textFieldUpdate d-flex">
                <v-text-field
                  v-model="updateText"
                  label="Update text"
                  dense
                  value=""
                  solo
                ></v-text-field>
                <v-btn @click="createNewUpdate" class="text-capitalize ml-4">
                  Update
                </v-btn>
              </div>
              <div class="d-flex mr-16">
                <div>
                  <h5>Next update:</h5>
                </div>
                <div class="pl-4">
                  {{ nextUpdate }}
                </div>
              </div>
            </div>
            <v-container>
              <v-card
                v-for="update in incidentUpdates"
                :key="update.id"
                class="mb-4 pa-4 mx-12"
              >
                <v-row>
                  <v-col>
                    <v-avatar>
                      <img
                        src="https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png"
                        alt="John"
                      />
                    </v-avatar>
                  </v-col>
                  <v-col>
                    {{ allUsersNameById[update.userId] }}
                  </v-col>
                  <v-col>
                    {{ update.updateText }}
                  </v-col>
                  <v-col class="Happened">
                    {{ new Date(update.createdAt).toLocaleString() }}
                  </v-col>
                  <v-col>
                    <v-icon @click="updateIncidentUpdateForm = true">
                      mdi-pencil</v-icon
                    >
                    <v-icon @click="deleteUpdateFun(update.id)">
                      mdi-delete
                    </v-icon>
                  </v-col>
                </v-row>
                <div v-if="updateIncidentUpdateForm === true">
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="text"
                        label="update"
                        dense
                        value=""
                        solo
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-btn
                        @click="updateIncidentUpdate(update.id)"
                        class="text-capitalize"
                      >
                        Update
                      </v-btn>
                    </v-col>
                  </v-row>
                </div>
              </v-card></v-container
            >
          </div>
        </div>
        <div class="d-flex justify-end mr-8">
          <v-btn class="pa-4 ma-4 text-capitalize" @click.native="close">
            Close
          </v-btn>
        </div>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import mixins from "../helpers/mixins.js";
export default {
  mixins: [mixins],
  props: {
    dialogDetails: {
      type: Boolean,
      default: false,
    },
    incidentId: {
      type: Number,
      default: 0,
    },
    activeBtn: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      search: "",
      creatorId: null,

      userId: +localStorage.getItem("userId"),
      name: "Noof",
      items: "",
      value: "",
      incident: [],
      comment: "",
      buttonName: "comments",
      showCommentForm: false,
      userName: "",
      userId: null,
      setComment: "",
      updatedComment: "",
      colorComment: "#2f9aef",
      colorActivityLog: "",
      colorUpdates: "",
      updateCommentForm: false,
      allUsersNameById: {},
      updateText: "",
      colorBtu: "",
      dialogIcone: false,
      title: "",
      commentIncident: "",
      text: "",
      updateIncidentUpdateForm: false,
      showMore: false,
      showMoreSeverity: false,
      showMoreImpact: false,
      assigneeDialog: false,
      reporterDialog: false,
      task: null,
      showText: false,
      nextUpdate: "",
      onHoldReason: [],
      correctiveAction: [],
      preventiveAction: [],
      showReason: false,
      showCorrective: false,
      showReventive: false,
    };
  },
  computed: {
    ...mapGetters([
      "incidentDetails",
      "newComment",
      "comments",
      "responders",
      "creator",
      "allUsers",
      "commentUpdated",
      "incidentUpdates",
      "incidentStateies",
    ]),
  },

  async mounted() {
    await this.getAllStateByIncidentId(this.incidentId);
    console.log("detailes----------------------");
    this.userId = +localStorage.getItem("userId");
    console.log("incidentId--detailest---", this.incidentId);
    await this.getUsers();
    this.userNameById();
    await this.$store.dispatch("getIncidentsDetails", this.incidentId);
    this.incident = [this.incidentDetails];
    await this.getComments({
      incidentId: this.incidentDetails.id,
    });

    this.comments;
    this.creatorId = localStorage.getItem("creatorId");

    this.getCreatorById(this.creatorId);
    await this.getIncidentUpdates({ incidentId: this.incidentDetails.id });
    this.activeBtn === "reporter"
      ? (this.title = "Assignee:")
      : (this.title = "Reporter:");
    // this.commentIncident = this.incidentDetails.id.toString();
    console.log(this.activeBtn, "activeBtnactiveBtn");
    const oneMin = 1000 * 60;
    this.nextUpdateFun();
    this.updateInterval = setInterval(() => {
      this.nextUpdateFun();
    }, oneMin);
    console.log(
      this.incidentStateies,
      "this.incidentUpdatesthis.incidentUpdates"
    );
    this.onHoldReason = this.incidentStateies.filter((update) => {
      return update.state == "On Hold";
    });
    this.correctiveAction = this.incidentStateies.filter((update) => {
      return update.state == "Resolved";
    });
    this.preventiveAction = this.incidentStateies.filter((update) => {
      return update.state == "Closed";
    });
    console.log(
      // this.onHoldReason,
      // this.correctiveAction,
      this.preventiveAction,
      "this.onHoldReason"
    );
  },
  methods: {
    ...mapActions([
      "getIncidentsDetails",
      // "createComment",
      "getComments",
      "getResponder",
      "getCreatorById",
      "getUsers",
      "updateComment",
      "getResponderById",
      "createUpdate",
      "getIncidentUpdates",
      "deleteComment",
      "deleteUpdate",
      "updateTextComment",
      "updateTextUpdate",
      "getAllStateByIncidentId",
    ]),
    // async addComment() {
    //   console.log("-------------------------create----------------");
    //   this.showCommentForm = true;
    //   if (this.comment == "") {
    //     return;
    //   }
    //   // await this.createComment({
    //   //   incidentId: this.incidentDetails.id,
    //   //   comment: this.comment,
    //   //   userId: localStorage.getItem("userId"),
    //   // });
    //   this.comment = "";
    //   this.getComments({
    //     incidentId: this.incidentDetails.id,
    //   });
    // },

    async updateCommentFun() {
      await this.updateComment({
        comment: this.updatedComment,
        userId: this.userId,
        incidentId: this.incidentDetails.id,
      });
      this.updatedComment = "";
      this.updateCommentForm = false;
      this.getComments({
        incidentId: this.incidentDetails.id,
      });
    },
    showPage(value) {
      this.buttonName = value;
      if (value == "activityLog") {
        this.colorComment = "rgb(230 230 230)";
        this.colorUpdates = "rgb(230 230 230)";
        this.colorActivityLog = "#2f9aef";
      }
      if (value == "comments") {
        this.colorComment = "#2f9aef";
        this.colorUpdates = "rgb(230 230 230)";
        this.colorActivityLog = "rgb(230 230 230)";
      }
      if (value == "updates") {
        this.colorComment = "rgb(230 230 230)";
        this.colorUpdates = "#2f9aef";
        this.colorActivityLog = "rgb(230 230 230)";
      }
    },
    userNameById() {
      this.allUsers.forEach((user) => {
        this.allUsersNameById[user.id] = user.name;
      });
      console.log("this.allUsersNameById", this.allUsersNameById);
    },
    createNewUpdate() {
      this.createUpdate({
        incidentId: this.incidentDetails.id,
        updateText: this.updateText,
        userId: this.userId,
      });
      this.updateText = "";
      this.getIncidentUpdates({ incidentId: this.incidentDetails.id });
    },
    close() {
      this.$emit("update:dialogDetails", false);
      console.log("this.updateInterval", this.updateInterval);
      clearInterval(this.updateInterval);
    },
    deleteUpdateFun(id) {
      this.deleteUpdate(id);
      this.getIncidentUpdates({ incidentId: this.incidentDetails.id });
    },
    async updateIncidentUpdate(id) {
      console.log(this.text, "this.textthis.text");
      await this.updateTextUpdate({
        id: id,
        updateText: this.text,
        userId: this.userId,
      });
      this.text = "";
      this.updateIncidentUpdateForm = false;
      this.getIncidentUpdates({
        incidentId: this.incidentDetails.id,
      });
    },
    nextUpdateFun() {
      const { escalationPolicy } = this.incidentDetails;
      if (!escalationPolicy) {
        this.nextUpdate = "No escalation";
      }
      if (this.incidentUpdates.length == 0) {
        return;
      }
      console.log(this.incidentUpdates, "createdAtcreatedAt");
      const { createdAt } = this.incidentUpdates[0];
      const [hours, minuets] = escalationPolicy.split(":");
      const totalMin = Number(hours) * 60 + Number(minuets);
      const now = new Date().getTime() / 1000;
      const createTime = new Date(createdAt).getTime() / 1000;

      const diff = now - createTime;
      const min = Math.round(diff / 60);

      const nextUpdateTime = totalMin - min;

      if (nextUpdateTime > 0 && nextUpdateTime < 60) {
        this.nextUpdate = `After ${nextUpdateTime} minutes`;
      } else if (nextUpdateTime > 60) {
        this.nextUpdate = `After ${Math.floor(nextUpdateTime / 60)} hours and ${
          nextUpdateTime % 60
        } minutes`;
      } else if (nextUpdateTime === 0) {
        this.nextUpdate = "Now";
      }
      this.nextUpdate = `Before ${Math.abs(nextUpdateTime)}`;
    },
  },
};
</script>

<style>
.line {
  width: 90%;
  margin-left: 12px;
}
.line2 {
  width: 90%;
  /* margin-left: 12px; */
  padding: 12px 12px;
}
.showMore {
  background-color: white;
}
.likedAndCheck {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-top: 6px;
}
.linked {
  width: 50%;
  display: flex;
}

.dropIssue {
  padding-top: 7px;
  width: 71%;
  border: solid 2px rgb(117 117 117);
  border-radius: 4px;
  height: 42px;
  text-align: center;
  margin: -4px 7px;
}
.task {
  padding-right: 109px;
}
.buttons {
  padding: 14px 107px;
}
.progress-linear {
  width: 95%;
  margin: 0 auto;
}
.v-input.theme--light.v-input--selection-controls.v-input--checkbox {
  margin: 0;
}
h5 {
  color: rgb(24 103 192);
}
.textFieldUpdate {
  width: 50%;
}
</style>
