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
          <v-card width="320">
            <v-row class="d-flex justify-space-around pa-2">
              <v-col><h4>Subject</h4></v-col>
              <v-col>{{ incidentDetails.subject }}</v-col>
            </v-row>

            <v-progress-linear
              height="1"
              value="100"
              color="rgb(117 117 117)"
              class="line"
            ></v-progress-linear>
            <v-row class="d-flex justify-space-around pa-2">
              <v-col><h4>Type</h4></v-col>
              <v-col>{{ incidentDetails.type }}</v-col>
            </v-row>
            <v-progress-linear
              height="1"
              value="200"
              color="rgb(117 117 117)"
              class="line"
            ></v-progress-linear>
            <v-row class="d-flex justify-space-around pa-2">
              <v-col><h4>Incident Time</h4></v-col>
              <v-col>
                {{
                  incidentDetails.happeningTime
                    ? incidentDetails.happeningTime.split("T")[0]
                    : ""
                }}
                at
                {{
                  incidentDetails.happeningTime
                    ? incidentDetails.happeningTime.split("T")[1].split(".")[0]
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
              <!-- {{ activeBtn }} -->
              <v-row
                class="pa-3"
                v-if="activeBtn === 'reporter' || activeBtn === 'assignee'"
              >
                <v-col><h4>Creator</h4></v-col>
                <v-col>{{ allUsersNameById[userId] }}</v-col>
              </v-row>
              <v-row class="pa-3" v-if="activeBtn === 'createdByMe'">
                <v-col><h4>Assignee</h4></v-col>
                <v-col>
                  <v-icon
                    @click.stop="
                      (incidentId = incidentDetails.id), (dialogIcone = true)
                    "
                    >mdi-eye-outline
                  </v-icon></v-col
                >

                <ShowUser
                  v-if="incidentId == incidentDetails.id"
                  :dialogIcone.sync="dialogIcone"
                  :users="incidentDetails.assignees"
                  :activeBtn="activeBtn"
                />
              </v-row>
            </v-row>
            <v-progress-linear
              height="1"
              value="200"
              color="rgb(117 117 117)"
              class="line"
            ></v-progress-linear>
            <v-row class="d-flex justify-space-around pa-2">
              <v-col><h4>Reporter</h4></v-col>
              <v-col>{{ incidentDetails.subject }}</v-col>
            </v-row>

            <v-progress-linear
              height="1"
              value="100"
              color="rgb(117 117 117)"
              class="line"
            ></v-progress-linear>
          </v-card>
          <v-card width="320">
            <v-row class="d-flex justify-space-around pa-2">
              <v-col><h4>Creation Time</h4></v-col>
              <v-col>
                {{
                  incidentDetails.createdAt
                    ? incidentDetails.createdAt.split("T")[0]
                    : ""
                }}
                at
                {{
                  incidentDetails.createdAt
                    ? incidentDetails.createdAt.split("T")[1].split(".")[0]
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
              <v-col><h4>Deadline</h4></v-col>
              <v-col>
                {{
                  incidentDetails.deadline
                    ? incidentDetails.deadline.split("T")[0]
                    : ""
                }}
                at
                {{
                  incidentDetails.deadline
                    ? incidentDetails.deadline.split("T")[1].split(".")[0]
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
              <v-col><h4>Severity level</h4></v-col>
              <v-col>{{ incidentDetails.severityLevel }}</v-col>
            </v-row>
            <v-progress-linear
              height="1"
              value="100"
              color="rgb(117 117 117)"
              class="line"
            ></v-progress-linear>
            <v-row class="d-flex justify-space-around pa-2">
              <v-col><h4>Impact level</h4></v-col>
              <v-col>{{ incidentDetails.severityLevel }}</v-col>
            </v-row>
            <v-progress-linear
              height="1"
              value="100"
              color="rgb(117 117 117)"
              class="line"
            ></v-progress-linear>
            <v-row class="d-flex justify-space-around pa-2">
              <v-col><h4>Severity description</h4></v-col>
              <v-col>{{ incidentDetails.severityDescription }}</v-col>
            </v-row>
            <v-progress-linear
              height="1"
              value="100"
              color="rgb(117 117 117)"
              class="line"
            ></v-progress-linear>
          </v-card>
          <v-card width="320">
            <v-row class="d-flex justify-space-around pa-2">
              <v-col><h4>Impact description</h4></v-col>
              <v-col>{{ incidentDetails.impactDescription }}</v-col>
            </v-row>
            <v-progress-linear
              height="1"
              value="200"
              color="rgb(117 117 117)"
              class="line"
            ></v-progress-linear>
            <v-row class="d-flex justify-space-around pa-2">
              <v-col><h4>Escalation policy</h4></v-col>
              <v-col>{{ incidentDetails.escalationPolicy }}</v-col>
            </v-row>
            <v-progress-linear
              height="1"
              value="200"
              color="rgb(117 117 117)"
              class="line"
            ></v-progress-linear>

            <v-row class="d-flex justify-space-around pa-2">
              <v-col><h4>Escalation time</h4></v-col>
              <v-col>{{ incidentDetails.escalationPolicy }}</v-col>
            </v-row>
            <v-progress-linear
              height="1"
              value="200"
              color="rgb(117 117 117)"
              class="line"
            ></v-progress-linear>
            <v-row class="d-flex justify-space-around pa-2">
              <v-col><h4>Escalation status</h4></v-col>
              <v-col>{{ incidentDetails.escalationPolicy }}</v-col>
            </v-row>
            <v-progress-linear
              height="1"
              value="200"
              color="rgb(117 117 117)"
              class="line"
            ></v-progress-linear>
            <v-row
              class="d-flex justify-space-around pa-2"
              v-if="
                incidentDetails.description &&
                incidentDetails.description.length <= 4
              "
            >
              <!-- <div > -->
              <v-col><h4>Description</h4></v-col>
              <v-col>
                {{ incidentDetails.description }}
              </v-col>
            </v-row>
            <!-- </div> -->
            <v-row
              class="d-flex justify-space-around pa-2"
              v-if="
                incidentDetails.description &&
                incidentDetails.description.length > 4
              "
            >
              <v-col><h4>Description</h4></v-col>
              <v-col>
                {{ incidentDetails.description.substr(0, 4) }}
              </v-col>
              <v-icon class="mr-5" @click="showMore = !showMore"
                >mdi-chevron-down</v-icon
              >
            </v-row>

            <v-card v-if="showMore">
              {{ incidentDetails.description }}
            </v-card>

            <v-progress-linear
              height="1"
              value="200"
              color="rgb(117 117 117)"
              class="line"
            ></v-progress-linear>
          </v-card>
        </div>

        <div class="likedAndCheck">
          <div class="linked">
            <h3 class="ml-6">Linked issues</h3>

            <div class="dropIssue">
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <div v-bind="attrs" v-on="on">Issues</div>
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
                      {{
                        impactedIssue.IncidentImpactedIssue.item
                      }}</v-list-item-title
                    >
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
              background-color="#f9f9f9"
              label="to be as a task sent to assignee"
            ></v-checkbox>
          </div>
        </div>
        <div class="d-flex justify-end mr-8">
          <v-btn class="pa-4 ma-4 text-capitalize" @click.native="close">
            Close
          </v-btn>
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
            <Comments
              :id="commentIncident"
              type="incident"
              :taskCreator="incidentDetails.creatorId"
              :userId="idUser"
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
                    {{ update.createdAt.replace("T", " ").split(".")[0] }}
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
      idUser: 1,
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
    this.userId = +localStorage.getItem("userId");
    console.log("incidentId-----", this.incidentId);
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
    this.commentIncident = this.incidentDetails.id.toString();
    console.log(this.activeBtn, "activeBtnactiveBtn");
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
      "deleteUpdate",
      "updateTextComment",
      "updateTextUpdate",
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
  },
};
</script>

<style>
.line {
  width: 90%;
  margin-left: 12px;
}
.showMore {
  background-color: white;
}
.likedAndCheck {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-top: 22px;
}
.linked {
  width: 50%;
  display: flex;
}

.dropIssue {
  padding-top: 13px;
  width: 71%;
  border: solid 2px rgb(117 117 117);
  border-radius: 8px;
  height: 50px;
  text-align: center;
}
.task {
  padding-right: 109px;
}
.buttons {
  padding: 14px 107px;
}
</style>
