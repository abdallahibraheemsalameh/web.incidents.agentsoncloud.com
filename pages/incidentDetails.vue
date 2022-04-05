<template>
  <div class="contentDetails">
    <h2>Incident Full Details</h2>
    <div>
      <h5>
        Incident type:{{ incidentDetails.type }} /
        {{ incidentDetails.reasonForCreation }}
      </h5>
    </div>
    <template>
      <v-card>
        <v-card-title>
          <!-- <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          class="searchIssue"
        ></v-text-field> -->
        </v-card-title>

        <v-data-table
          :headers="headers"
          :items="incident"
          :search="search"
          hide-default-footer
          :header-props="{ sortIcon: null }"
          single-expand
          item-key="id"
        >
          <template v-slot:[`item.responderId`]="{ item }">
            <div v-for="responder in responders" :key="responder.id">
              <div v-if="item.id == responder.id">
                {{ responder.responderName }}
              </div>
            </div>
          </template>
          <template v-slot:[`item.creatorId`]>
            {{ creator.name }}
          </template>
        </v-data-table>
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
            <h5>Attachment{{ attachments }}</h5>
            <h5>Attachment</h5>
            <div v-for="attachment in attachments" :key="attachment.id">
              <v-img
                v-bind:src="'../assets/uploads/' + attachment.attachment"
              ></v-img>
            </div>
          </div>
        </div>
        <!-- ///////// -->
        <div class="rightDetails">
          <div class="activity">
            <div>Activity:</div>
            <div>Escalation status:</div>
          </div>
          <div class="buttons">
            <v-btn class="comment" @click="showPage('comments')">
              Comments
            </v-btn>

            <v-btn @click="showPage('activityLog')"> activity Log</v-btn>

            <v-btn @click="showPage('updates')" class="update"> Updates </v-btn>
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
                      {{ userName }}
                    </v-col>
                    <v-col cols="3">
                      {{ comment.comment }}
                    </v-col>
                    <v-col cols="3">
                      {{ comment.createdAt.replace("T", " ").split(".")[0] }}
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
            <div v-for="comment in comments" :key="comment.id">
              <!-- <div v-if="comment.userId == userId">

              </div> -->
              <!-- <v-row justify="space-around" v-if="comment.userId == userId">
                <v-col cols="8">
                  <v-text-field
                    v-model="update"
                    label="update comment"
                    dense
                    value=""
                    solo
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-btn @click="updateComment(comment.id, update)">
                    Update comment</v-btn
                  >
                </v-col>
              </v-row> -->
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import activityLog from "./activityLog.vue";
export default {
  components: { activityLog },
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
        { text: "Date creation and time", value: "createdAt" },
        // { text: "priority", value: "priority(item)" },
        { text: "Severity Level", value: "severityLevel" },
        { text: "Impact Level", value: "impactLevel" },
        { text: "state", value: "state" },
        { text: "Deadline", value: "deadline" },
        // { text: "category", value: "category" },
        // { text: "Escalati  on policy", value: "escalationPolicy" },
        { text: "responders", value: "responderId" },
      ],
      name: "Noof",
      dialog: false,
      items: "",
      value: "",
      incident: [],
      comment: "",
      buttonName: "",
      showCommentForm: false,
      userName: "",
      userId: null,
      setComment: "",
      update: "",
    };
  },
  computed: {
    ...mapGetters([
      "incidentDetails",
      "newComment",
      "comments",
      "attachments",
      "responders",
      "creator",
      "allUsers",
      "commentUpdated",
    ]),
  },

  async mounted() {
    this.userId = localStorage.getItem("userId");
    this.incidentId = await this.$route.query.incidentId;
    await this.$store.dispatch("getIncidentsDetails", this.incidentId);
    this.incident = [this.incidentDetails];
    await this.getComments(this.incidentDetails.id);
    this.getAttachments(this.incidentDetails.id);
    this.getResponder();
    await this.getUsers();
    console.log(this.comments, "this.comments");
    // this.comments.filter((com) => {
    //   com.userId == this.userId ? (this.setComment = com.comment) : "";
    // });
    this.comments;
    console.log(this.setComment, "this.setComment");
    this.creatorId = localStorage.getItem("creatorId");

    this.getCreatorById(this.creatorId);
    this.allUsers.filter((user) =>
      user.id == this.userId ? (this.userName = user.name) : ""
    );
  },
  methods: {
    ...mapActions([
      "getIncidentsDetails",
      "createComment",
      "getComments",
      "getAttachments",
      "getResponder",
      "getCreatorById",
      "getUsers",
      "updateComment",
    ]),
    async addComment() {
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
      this.getComments(this.incidentDetails.id);
    },

    async updateComment(id, value) {
      await this.updateComment({ id: id, body: value });
    },
    showPage(value) {
      this.buttonName = value;
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
/* p.para {
  color: #a5a596;
} */
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
/* .incidentDes {
  display: flex;
} */

.rightDetails {
  width: 60%;
  overflow: auto !important;
}
.activity {
  display: flex;
  justify-content: space-between;
  padding: 11px 54px;
}
a.attachements {
  padding: 0px 17px;
}
/* button.activityLog.v-btn.v-btn--is-elevated.v-btn--has-bg.theme--light.v-size--default {
  background-color: #e6e6e6;
  color: #929292;
} */
button.update.v-btn.v-btn--is-elevated.v-btn--has-bg.theme--light.v-size--default {
  background-color: #e6e6e6;
  color: #929292;
}
button.comment.v-btn.v-btn--is-elevated.v-btn--has-bg.theme--light.v-size--default {
  color: snow;
  background-color: #2f9aef;
}
.comment {
  text-transform: unset !important;
  /* color: #2f9aef; */
  background-color: #2f9aef;
}
.activityLog {
  text-transform: unset !important;
}
.update {
  text-transform: unset !important;
}
.leftDetails {
  padding: 23px;
  width: 45%;
  /* overflow: auto !important; */
  max-height: 400px;
}
/* h5 {
  font-size: 16px;
  color: #4f4f4f;
} */

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
  /* justify-content: end; */
}
/* .v-card.v-sheet.theme--light.rounded-0 {
  border: solid 2px #ededed;
} */
/* html {
  overflow: hidden;
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
</style>
