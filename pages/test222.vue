<template>
  <v-dialog
    v-model="dialogDetails"
    light
    persistent
    overlay-color="rgb(152 152 152)"
    overlay-opacity="0.90"
    width="70%"
  >
    <template>
      <v-card>
        <v-card-title>
          <div>
            <div>Incident Full Details</div>
            <div>
              <h5>
                Incident type:{{ incidentDetails.type }} /
                {{ incidentDetails.reasonForCreation }}
              </h5>
            </div>
          </div>
        </v-card-title>
        <div>
          <v-row
            >{{ incidentDetails }}
            <v-col>
              <v-col>
                <div>Subject: {{ incidentDetails.subject }}</div>
                <div>Creator: {{ incidentDetails.creatorId }}</div>
                <div>Linked issues: {{ incidentDetails.subject }}</div>
                <div>Impact level: {{ incidentDetails.subject }}</div>
                <div>Severity level: {{ incidentDetails.subject }}</div>
                <div>Date creation and time: {{ incidentDetails.subject }}</div>
                <div>Deadline: {{ incidentDetails.subject }}</div>
                <div>Escalation policy: {{ incidentDetails.subject }}</div>
                <div>Hppening time: {{ incidentDetails.subject }}</div>
                <!-- <div>Reporter: {{ incidentDetails }}</div> -->
                <div>Description: {{ incidentDetails.subject }}</div>
                <div>Impact description: {{ incidentDetails.subject }}</div>
                <div>Severity description: {{ incidentDetails.subject }}</div>
              </v-col>
              <v-col></v-col>
            </v-col>
            <v-col> </v-col>
          </v-row>
        </div>

        <!-- <v-data-table
          :headers="headers"
          :items="incident"
          :search="search"
          hide-default-footer
          :header-props="{ sortIcon: null }"
          single-expand
          item-key="id"
        >
          <template v-slot:[`item.responderId`]="{ item }">
            <div>
              <ShowAssignees :assignees="item.assignees" />
            </div>
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
            Update each
            {{
              item.escalationPolicy ? item.escalationPolicy.split(":")[1] : ""
            }}
            m
          </template>
          <template v-slot:[`item.deadline`]="{ item }">
            {{ item.deadline ? item.deadline.split("T")[0] : "" }} at
            {{ item.deadline ? item.deadline.split("T")[1].split(".")[0] : "" }}
          </template>

        </v-data-table> -->
      </v-card>
      <div class="contain">
        <div class="leftDetails">
          <div class="attach">
            <a @click="$vuetify.goTo('#attachment')" class="attachements"
              >attachements</a
            >
            <a @click="$vuetify.goTo('#impactedIssues')" class="attachements"
              >Impacted issues</a
            >
          </div>
          <h5>Incident description</h5>
          <div class="task">
            <v-checkbox
              background-color="#f9f9f9"
              label="to be as a task sent to assignee"
            ></v-checkbox>
          </div>
          <div class="incidentDes">
            <div>
              <p class="paraDes">
                {{ incidentDetails.description }}
              </p>
            </div>
          </div>
          <h6>Impact description</h6>

          <p class="paraImpacted">
            {{ incidentDetails.impactDescription }}
          </p>

          <h6>Severity description</h6>

          <p class="paraImpacted">
            {{ incidentDetails.severityDescription }}
          </p>
          <div id="impactedIssues">
            <h5>Impacted issues</h5>
            <div
              v-for="impactedIssue in incidentDetails.ImpactedIssues"
              :key="impactedIssue.id"
            >
              {{ impactedIssue.name }} -
              {{ impactedIssue.IncidentImpactedIssue.item }}
            </div>
          </div>

          <!-- ////////// -->
          <div id="attachment">
            <h5>Attachments</h5>
            <div
              v-for="attachment in incidentDetails.Attachments"
              :key="attachment.id"
            >
              <v-img
                v-bind:src="attachment.attachment"
                max-height="150"
                max-width="250"
              ></v-img>
              <!-- <v-img
                src="../assets/uploads/"
              ></v-img> -->
            </div>
          </div>
        </div>

        <div class="rightDetails">
          <div class="activity">
            <div>Activity:</div>
            <div>
              <div>Escalation status:</div>
              <div>
                Escalation time:
                {{ incidentDetails.escalationPolicy }}
                m
              </div>
            </div>
          </div>

          <div class="buttons">
            <v-btn
              class="createButtons"
              :color="colorComment"
              @click="showPage('comments')"
            >
              <!-- class="red--text"  change text -->
              Comments
            </v-btn>

            <v-btn
              @click="showPage('activityLog')"
              :color="colorActivityLog"
              class="createButtons"
            >
              activity Log</v-btn
            >

            <v-btn
              @click="showPage('updates')"
              class="update"
              :color="colorUpdates"
            >
              Updates
            </v-btn>
          </div>

          <div v-if="buttonName == `comments`">
            <div>
              <div class="addComment">
                <v-row justify="space-around">
                  <v-col cols="8">
                    <div v-if="showCommentForm === true">
                      <v-text-field
                        v-model="comment"
                        label="add comment"
                        dense
                        value=""
                        solo
                      ></v-text-field>
                    </div>
                  </v-col>
                  <v-col cols="4">
                    <v-btn class="comment" @click="addComment">
                      + Add Comments
                    </v-btn>
                  </v-col>
                </v-row>
              </div>
              <br />

              <v-container>
                <v-card
                  v-for="comment in comments"
                  :key="comment.id"
                  class="mb-4 pa-4"
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
                      {{ allUsersNameById[comment.userId] }}
                    </v-col>
                    <v-col cols="3">
                      {{ comment.comment }}
                    </v-col>
                    <v-col cols="3">
                      {{ comment.createdAt.replace("T", " ").split(".")[0] }}
                    </v-col>
                    <v-col>
                      <v-icon @click="updateCommentForm = true">
                        mdi-pencil</v-icon
                      >
                      <v-icon @click="deleteComment(comment.id)">
                        mdi-delete
                      </v-icon>
                    </v-col>
                  </v-row>
                </v-card>
              </v-container>
            </div>
          </div>
          <div v-else-if="buttonName == `activityLog`">
            <activity-log />
          </div>
          <!-- update comment -->
          <div v-else-if="buttonName == `updates`">
            <v-row justify="space-around">
              <v-col cols="8">
                <v-text-field
                  v-model="updateText"
                  label="Update text"
                  dense
                  value=""
                  solo
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-btn @click="createNewUpdate" class="update"> Update </v-btn>
              </v-col>
            </v-row>
            <v-container>
              <v-card
                v-for="update in incidentUpdates"
                :key="update.id"
                class="mb-4 pa-4"
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
                  <v-col cols="3">
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

          <div v-if="updateCommentForm === true">
            <v-row justify="space-around">
              <v-col cols="8">
                <v-text-field
                  v-model="updatedComment"
                  label="update comment"
                  dense
                  value=""
                  solo
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-btn @click="updateCommentFun" class="update"> Update </v-btn>
              </v-col>
            </v-row>
          </div>
        </div>
      </div>
      <v-btn class="pa-4 ma-4 text-capitalize" @click.native="close">
        Cancel
      </v-btn>
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
    // this.incidentId = await this.$route.query.incidentId;
    await this.getUsers();
    this.userNameById();
    await this.$store.dispatch("getIncidentsDetails", this.incidentId);
    this.incident = [this.incidentDetails];
    await this.getComments({
      incidentId: this.incidentDetails.id,
      // userId: this.userId,
    });

    // this.getResponderById(this.incidentDetails.responderId);
    // this.comments.filter((com) => {
    //   com.userId == this.userId ? (this.setComment = com.comment) : "";
    // });
    this.comments;
    this.creatorId = localStorage.getItem("creatorId");

    this.getCreatorById(this.creatorId);
    await this.getIncidentUpdates({ incidentId: this.incidentDetails.id });
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
/* .row.justify-space-between {
  background-color: #eeeeee;
  width: 96%;
} */
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

/* .rightDetails {
  width: 60%;
  overflow: auto !important;
} */
.activity {
  display: flex;
  justify-content: space-between;
  padding: 11px 54px;
}
a.attachements {
  padding: 0px 17px;
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
.addComment {
  display: flex;
  justify-content: center;
}
.task {
  width: 100%;
  display: flex;
}

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
</style>
