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
        <div>
          <v-row class="ma-1 pa-4">
            <v-col col="4"> Subject: {{ incidentDetails.subject }}</v-col>
            <v-col col="4">Type: {{ incidentDetails.type }}</v-col>

            <v-col col="4">Creator: {{ allUsersNameById[userId] }}</v-col>
          </v-row>
          <v-divider></v-divider>

          <v-row class="ma-1 pa-4">
            <v-col col="4">
              Reason for creation:
              {{ incidentDetails.reasonForCreation }}</v-col
            >
            <v-col col="4">Impact level: {{ incidentDetails.subject }}</v-col>
            <v-col col="4">
              Severity level: {{ incidentDetails.subject }}</v-col
            >
          </v-row>
          <v-divider></v-divider>

          <v-row class="ma-1 pa-4">
            <v-col col="4">Creation time: {{ incidentDetails.subject }}</v-col>

            <v-col col="4"> Deadline: {{ incidentDetails.subject }}</v-col>
            <v-col col="4"
              >Escalation policy: {{ incidentDetails.subject }}</v-col
            >
          </v-row>
          <v-divider></v-divider>

          <v-row class="ma-1 pa-4">
            <v-col col="4">Hppening time: {{ incidentDetails.subject }}</v-col>
            <v-col col="4"
              >Impact description: {{ incidentDetails.subject }}</v-col
            >
            <v-col col="4"
              >Severity description: {{ incidentDetails.subject }}</v-col
            >
          </v-row>
          <v-divider></v-divider>
          <v-row class="ma-1 pa-4">
            <v-col col="4">
              <div>
                {{ title }}
                <v-icon
                  @click.stop="
                    (incidentId = incidentDetails.id), (dialogIcone = true)
                  "
                  >mdi-eye-outline
                </v-icon>
                <ShowUser
                  v-if="incidentId == incidentDetails.id"
                  :dialogIcone.sync="dialogIcone"
                  :users="
                    activeBtn === 'responder'
                      ? incidentDetails.assignees
                      : incidentDetails.responders
                  "
                  :activeBtn="activeBtn"
                />
              </div>
            </v-col>
            <v-col col="4">Escalation status:</v-col>
            <v-col col="4">
              Escalation time:
              {{ incidentDetails.escalationPolicy }}
              m
            </v-col>
          </v-row>
          <v-divider></v-divider>

          <div class="ma-1 pt-4 px-4">
            <div>Linked issues:</div>
            <div
              class="d-flex mx-4 pt-2"
              v-for="(impactedIssue, i) in incidentDetails.ImpactedIssues"
              :key="impactedIssue.id"
            >
              {{ i + 1 }} - {{ impactedIssue.name }} -
              {{ impactedIssue.IncidentImpactedIssue.item }}
            </div>
          </div>
          <v-divider></v-divider>

          <v-row class="ma-1 pa-4">
            <v-col col="12">
              Description: {{ incidentDetails.description }}
            </v-col>
          </v-row>

          <div>
            <div>
              <div class="d-flex justify-space-around">
                <div class="task">
                  <v-checkbox
                    background-color="#f9f9f9"
                    label="to be as a task sent to assignee"
                  ></v-checkbox>
                </div>
              </div>
            </div>

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
                <div>
                  <div class="pa-4">
                    <v-row>
                      <v-col col="1"></v-col>
                      <v-col col="6">
                        <div v-if="showCommentForm === true">
                          <v-text-field
                            v-model="comment"
                            label="add comment"
                            dense
                            value=""
                            solo
                            class="ml-12"
                          ></v-text-field>
                        </div>
                      </v-col>
                      <v-col col="4">
                        <v-btn class="comment" @click="addComment">
                          + Add Comments
                        </v-btn>
                      </v-col>
                      <v-col col="1"></v-col>
                    </v-row>
                  </div>
                  <br />

                  <v-container>
                    <v-card
                      v-for="comment in comments"
                      :key="comment.id"
                      class="mb-4 pa-4 mx-16"
                    >
                      <v-row>
                        <v-col cols="2">
                          <v-avatar>
                            <img
                              src="https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png"
                              alt="John"
                            />
                          </v-avatar>
                        </v-col>
                        <v-col cols="2">
                          {{ allUsersNameById[comment.userId] }}
                        </v-col>
                        <v-col cols="4">
                          {{ comment.comment }}
                        </v-col>
                        <v-col cols="2" class="Happened">
                          {{
                            comment.createdAt.replace("T", " ").split(".")[0]
                          }}
                        </v-col>
                        <v-col cols="2">
                          <v-icon @click="updateCommentForm = true">
                            mdi-pencil</v-icon
                          >
                          <v-icon @click="deleteComment(comment.id)">
                            mdi-delete
                          </v-icon>
                        </v-col>
                      </v-row>
                      <div v-if="updateCommentForm === true">
                        <v-row>
                          <v-col>
                            <v-text-field
                              v-model="updatedComment"
                              label="update comment"
                              dense
                              value=""
                              solo
                            ></v-text-field>
                          </v-col>
                          <v-col>
                            <v-btn
                              @click="updateCommentFun"
                              class="text-capitalize"
                            >
                              Update
                            </v-btn>
                          </v-col>
                        </v-row>
                      </div>
                    </v-card>
                  </v-container>
                </div>
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
                <div class="pa-4">
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
                    <v-col col="1"></v-col>
                  </v-row>
                </div>
                <v-container>
                  <v-card
                    v-for="update in incidentUpdates"
                    :key="update.id"
                    class="mb-4 pa-4 mx-12"
                  >
                    <v-row>
                      <v-col cols="3">
                        <v-avatar>
                          <img
                            src="https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png"
                            alt="John"
                          />
                        </v-avatar>
                      </v-col>
                      <v-col cols="3">
                        {{ allUsersNameById[update.userId] }}
                      </v-col>
                      <v-col cols="3">
                        {{ update.updateText }}
                      </v-col>
                      <v-col cols="3" class="Happened">
                        {{ update.createdAt.replace("T", " ").split(".")[0] }}
                      </v-col>
                      <v-col>
                        <!-- <v-icon @click="updateCommentForm = true"> mdi-pencil</v-icon>
                <v-icon @click="deleteComment(comment.id)"> mdi-delete </v-icon> -->
                      </v-col>
                    </v-row>
                  </v-card></v-container
                >
              </div>
            </div>
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
export default {
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
      headers: [
        {
          text: "Incident subject",
          align: "start",
          value: "subject",
        },
        // { text: "Impacted issue", value: "calories" },
        { text: "Creator", value: "creatorId" },
        { text: "Happening time", value: "happeningTime" },
        { text: "Date creation and time", value: "createdAt" },
        // { text: "priority", value: "priority(item)" },
        { text: "Severity Level", value: "severityLevel" },
        { text: "Impact Level", value: "impactLevel" },
        { text: "state", value: "state" },
        { text: "Deadline", value: "deadline" },
        // { text: "category", value: "category" },
        { text: "Escalation policy", value: "escalationPolicy" },
        { text: "responder", value: "responderId" },
      ],
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
    ]),
  },

  async mounted() {
    this.userId = localStorage.getItem("userId");
    console.log("incidentId-----", this.incidentId);
    await this.getUsers();
    this.userNameById();
    await this.$store.dispatch("getIncidentsDetails", this.incidentId);
    this.incident = [this.incidentDetails];
    await this.getComments({
      incidentId: this.incidentDetails.id,
    });
    console.log(this.incidentDetails, "++++++++++++++++++++++++++++++++++++");
    // this.getResponderById(this.incidentDetails.responderId);
    // this.comments.filter((com) => {
    //   com.userId == this.userId ? (this.setComment = com.comment) : "";
    // });
    this.comments;
    this.creatorId = localStorage.getItem("creatorId");

    this.getCreatorById(this.creatorId);
    await this.getIncidentUpdates({ incidentId: this.incidentDetails.id });
    this.activeBtn === "responder"
      ? (this.title = "Assignee:")
      : (this.title = "Reporter:");
  },
  methods: {
    ...mapActions([
      "getIncidentsDetails",
      "createComment",
      "getComments",
      "getResponder",
      "getCreatorById",
      "getUsers",
      "updateComment",
      "getResponderById",
      "createUpdate",
      "getIncidentUpdates",
      "deleteComment",
    ]),
    async addComment() {
      console.log("-------------------------create----------------");
      this.showCommentForm = true;
      if (this.comment == "") {
        return;
      }
      await this.createComment({
        incidentId: this.incidentDetails.id,
        comment: this.comment,
        userId: localStorage.getItem("userId"),
      });
      this.comment = "";
      this.getComments({
        incidentId: this.incidentDetails.id,
      });
    },

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
    // deleteCommentById(id) {
    //   console.log("sss", id, this.incidentDetails.id, this.userId);
    //   this.deleteComment({
    //     id: id,
    //     userId: this.userId,
    //     incidentId: this.incidentDetails.id,
    //   });
    // },
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
    },
  },
};
</script>

<style>
.header {
  display: flex;
  justify-content: space-between;
}
.OLA {
  display: flex;
  justify-content: space-between;
}
.SLA {
  display: flex;
  justify-content: space-between;
}
.para {
  margin-top: 2px;
}

a.createIncident.v-btn.v-btn--is-elevated.v-btn--has-bg.v-btn--router.theme--light.v-size--default {
  color: snow;
  background-color: #5d8bf4;
  text-transform: unset !important;
  margin: 8px;
}
.v-select__slot {
  position: relative;
  align-items: center;
  display: flex;
  max-width: 100%;
  min-width: 0;
  width: 100%;
}
.search {
  width: 100%;
  margin-right: 53px;
}

.v-dialog:not(.v-dialog--fullscreen) {
  max-height: 90%;
  width: 900px;
}

button.creatIncident.v-btn.v-btn--is-elevated.v-btn--has-bg.theme--light.v-size--default {
  height: 36px;
  min-width: 64px;
  padding: 0 16px;
  color: snow;
  background-color: #4992db;
  text-transform: unset !important;
  margin: 15px;
}
h3 {
  padding: 10px;
}

.v-input__slot {
  background-color: white;
}
input#input-16 {
  background-color: white;
}
.attach {
  display: flex;
  justify-content: flex-end;
}
.contain {
  display: flex;
  justify-content: space-between;
  background-color: #f9f9f9;
  width: 100%;
  max-height: 400px;
}

button.update.v-btn.v-btn--is-elevated.v-btn--has-bg.theme--light.v-size--default {
  background-color: #e6e6e6;
  color: #929292;
}
button.comment.v-btn.v-btn--is-elevated.v-btn--has-bg.theme--light.v-size--default {
  color: snow;
  background-color: #2f9aef;
  text-transform: none;
}

.activityLog {
  text-transform: unset !important;
}
.update {
  text-transform: none;
  color: snow;
}
.leftDetails {
  padding: 23px;
  width: 45%;
  /* overflow: auto !important; */
  max-height: 400px;
}

h6 {
  color: rgb(118 118 118);

  font-size: 14px;
}

.buttons {
  display: flex;
  justify-content: space-around;
  padding: 14px 107px;
}
/* .addComment {
  display: flex;
  justify-content: center;
} */
/* .task {
  width: 100%;
  display: flex;
} */

p.paraDes {
  background-color: #ffffff;
  width: 100%;
  height: 100%;
}
p.paraImpacted {
  background-color: #ffffff;
  width: 100%;
  height: 20%;
}
.updatedomment {
  color: #2f9aef;
}
.styleUpdateText {
  display: flex;
  justify-content: center;
}
</style>
