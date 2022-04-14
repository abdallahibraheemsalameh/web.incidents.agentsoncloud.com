<template>
  <v-dialog
    v-model="dialog"
    width="800"
    light
    persistent
    overlay-color="#ffffff"
    overlay-opacity="0.90"
  >
    <v-container>
      <div class="create">Update Incident</div>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row justify="space-between">
          <v-col cols="9" sm="6" md="6">
            <h5 class="subjects">Subject</h5>
            <!-- <v-combobox
              v-model="subject"
              :items="[1, 2]"
              dense
              filled
              :rules="subjectRules"
              background-color="#ffffff"
            ></v-combobox> -->
            <v-text-field
              background="rgb(145 145 145)"
              name="input-7-1"
              v-model="subject"
              value=""
              class="inputDescription"
              :rules="subjectRules"
            ></v-text-field>

            <hr />
            <h5 class="subjects">Incident causes</h5>
            <div class="checkbox">
              <v-checkbox
                v-model="impactFinancial"
                :label="`impact financial(SLA)`"
                v-on:change="impactFinancialFun"
              ></v-checkbox>
            </div>
            <p class="descrition">
              description: please explain (who-why-what-where-how-when)
            </p>
            <v-text-field
              background="rgb(145 145 145)"
              name="input-7-1"
              v-model="description"
              value=""
              class="inputDescription"
              :rules="descriptionRules"
            ></v-text-field>
            <hr />
            <h5 class="subjects">Priority</h5>
            <div class="impact">
              <div class="d-flex flex-row mb-2">
                <h6>Impact description</h6>
                <template>
                  <v-chip
                    class="ma-1"
                    small
                    :color="impactLevel === 'Low' ? 'blue' : ''"
                    link
                    label
                    outlined
                    @click="handelImpact('Low')"
                  >
                    Low
                  </v-chip>
                  <v-chip
                    class="ma-1"
                    small
                    :color="impactLevel === 'Medium' ? 'blue' : ''"
                    link
                    label
                    outlined
                    @click="handelImpact('Medium')"
                  >
                    Medium
                  </v-chip>
                  <v-chip
                    class="ma-1"
                    small
                    :color="impactLevel === 'High' ? 'blue' : ''"
                    link
                    label
                    outlined
                    @click="handelImpact('High')"
                  >
                    High
                  </v-chip>
                </template>
              </div>
              <v-textarea
                background="rgb(145 145 145)"
                name="input-7-1"
                v-model="impactDescription"
                value=""
                class="inputImpact"
                rows="2"
                :rules="impactRules"
              ></v-textarea>
            </div>
            <div class="impact">
              <div class="d-flex flex-row mb-2">
                <h6>Severity description</h6>
                <template>
                  <v-chip
                    class="ma-1"
                    small
                    :color="severityLevel === 'Low' ? 'blue' : ''"
                    link
                    label
                    outlined
                    @click="handelSeverity('Low')"
                  >
                    Low
                  </v-chip>
                  <v-chip
                    class="ma-1"
                    small
                    :color="severityLevel === 'Medium' ? 'blue' : ''"
                    link
                    label
                    outlined
                    @click="handelSeverity('Medium')"
                  >
                    Medium
                  </v-chip>
                  <v-chip
                    class="ma-1"
                    small
                    :color="severityLevel === 'High' ? 'blue' : ''"
                    link
                    label
                    outlined
                    @click="handelSeverity('High')"
                  >
                    High
                  </v-chip>
                </template>
              </div>
              <v-textarea
                background="rgb(145 145 145)"
                name="input-7-1"
                v-model="severityDescription"
                value=""
                class="inputImpact"
                rows="2"
                :rules="severityRules"
              ></v-textarea>
            </div>
            <div class="d-flex flex-column mb-2">
              <h5 class="subjects">Linked issue</h5>

              <div
                v-for="(issue, id) in incidentDetails.ImpactedIssues"
                :key="id"
              >
                <SelectIssue
                  @setIssueAndItem="selectionImpactedIssue"
                  :issueId="issue.id"
                  :issueName="issue.name"
                  :itemName="issue.IncidentImpactedIssue.item"
                />
              </div>
            </div>
          </v-col>
          <v-col cols="9" sm="6" md="6">
            <h5 class="subjects">Incident type</h5>
            <v-autocomplete
              v-model="type"
              :items="types"
              filled
              label="Type"
              background-color="#ffffff"
            ></v-autocomplete>
            <h5 class="subjects">Reason for creation</h5>
            <div>
              <div class="text-center">
                <template>
                  <v-chip
                    class="ma-1"
                    small
                    :color="ReasonCreation === 'On-call' ? 'blue' : ''"
                    link
                    label
                    outlined
                    @click="ReasonForCreation('On-call')"
                  >
                    On-call
                  </v-chip>
                  <v-chip
                    class="ma-1"
                    small
                    :color="ReasonCreation === 'Requested' ? 'blue' : ''"
                    link
                    label
                    outlined
                    @click="ReasonForCreation('Requested')"
                  >
                    Requested
                  </v-chip>
                  <v-chip
                    class="ma-1"
                    small
                    :color="ReasonCreation === 'By me' ? 'blue' : ''"
                    link
                    label
                    outlined
                    @click="ReasonForCreation('By me')"
                  >
                    By me
                  </v-chip>
                </template>
              </div>
            </div>
            <h5 class="subjects">assignee</h5>
            <v-autocomplete
              v-model="assignee"
              :items="allUsers"
              multiple
              filled
              item-text="name"
              item-value="id"
              label="enter name ....."
              background-color="#ffffff"
              :rules="assigneeRules"
            ></v-autocomplete>
            <h5 class="subjects">responders</h5>
            <v-autocomplete
              v-model="responder"
              :items="allUsers"
              item-text="name"
              item-value="id"
              filled
              label="enter name ....."
              background-color="#ffffff"
            ></v-autocomplete>
            <!-- ////////////////////////////////////////////////////////////////////// -->
            <h5 class="subjects">Deadline</h5>
            <div>
              <div v-if="datePicker">
                <v-date-picker
                  v-model="date"
                  :min="new Date().toISOString().substr(0, 10)"
                ></v-date-picker>
                <div class="ml-16">
                  <v-btn
                    text
                    color="primary"
                    @click="(datePicker = false), (data = '')"
                  >
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="datePicker = false">
                    OK
                  </v-btn>
                </div>
              </div>
              <v-text-field
                v-model="date"
                label="Select date"
                prepend-icon="mdi-calendar"
                readonly
                @click="datePicker = true"
              ></v-text-field>
            </div>

            <div>
              <v-text-field
                v-model="time"
                label="Select time"
                prepend-icon="mdi-clock-time-four-outline"
                readonly
                @click="timePicker = true"
              ></v-text-field>
              <div v-if="timePicker">
                <v-time-picker
                  v-model="time"
                  ampm-in-title
                  format="ampm"
                ></v-time-picker>
                <div class="ml-16">
                  <v-btn
                    text
                    color="primary"
                    @click="(timePicker = false), (time = null)"
                  >
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="timePicker = false">
                    OK
                  </v-btn>
                </div>
              </div>
            </div>

            <h5>Escalation duration</h5>
            <v-text-field
              v-model="escalationPolicy"
              label="hh:mm"
              dense
              value=""
              solo
            ></v-text-field>
            <div class="attachments">
              <div class="addAttachments">add attachments</div>

              <div>
                <v-file-input
                  v-model="files"
                  full-width:true
                  small-chips
                  show-size
                  multiple
                  clearable
                  label="upload"
                  height="32"
                  class="file"
                  outlined
                  dense
                >
                </v-file-input>
              </div>
            </div>
            <div>
              <v-checkbox
                label="to be as a task sent to assignee"
                v-model="task"
                background-color="rgb(238 238 238)"
              ></v-checkbox>
            </div>
            <div class="buttons">
              <v-btn class="createButtons" @click.native="close">
                Cancel
              </v-btn>
              <v-btn
                @click="
                  validate();
                  updateIncident();
                "
                :disabled="!valid"
                class="createButtons"
                >Update</v-btn
              >
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["incidentId", "dialog"],

  data() {
    return {
      imgs: [],
      severityLevel: "",
      subjectsIncident: [],
      subject: "",
      // subjectd: this.getIncidentsDetails(this.incidentId),
      valid: true,
      files: [],
      impactFinancial: false,
      description: "",
      impactLevel: "",
      impactDescription: "",
      severityDescription: "",
      impactedIssuesNumber: [1],
      itemList: [],
      itemNames: [],
      type: "",
      types: ["Operational", "technical", "Business"],
      ReasonCreation: "",
      reasonForCreation: "",
      assignee: "",
      responder: [],
      deadline: "",
      task: true,
      state: "",
      impactOperational: true,
      selectedImpactedIssueId: null,
      subjectRules: [
        (v) => !!v || "Subject is required",
        // (v) => (v.length = 10 || "Name must be less than 10 characters"),
        (v) => v.length <= 40 || "Subject should be at most 40 characters",
      ],
      descriptionRules: [
        (v) => !!v || "Description is required",
        (v) =>
          v.length <= 400 ||
          "Description is required and  should be at most 400 character",
      ],
      assigneeRules: [(value) => !!value.length || "Assignee is required"],
      issueRules: [(value) => !!value || "Issue is required"],
      impactRules: [
        (value) =>
          value.length <= 300 ||
          "Impact description should be at most 300 characters",
      ],
      severityRules: [
        (value) =>
          value.length <= 300 ||
          "Severity description should be at most 300 characters",
      ],
      escalationPolicy: "",
      userId: null,
      time: null,
      timePicker: false,
      picker: null,
      date: new Date().toISOString().slice(0, 10),
      datePicker: false,
    };
  },

  computed: {
    ...mapGetters([
      "allInventories",
      "allImpactedIssues",
      "allFacilities",
      "allSuppliers",
      "allUsers",
      "incidentDetails",
      "updatedIncident",
    ]),
  },
  async mounted() {
    this.userId = localStorage.getItem("userId");
    await this.getIncidentsDetails(this.incidentId);
    console.log("incidentDetails", this.incidentDetails);
    console.log(this.incidentDetails.deadline, "dedddddddddddd");
    this.subject = this.incidentDetails.subject;
    this.impactFinancial = this.incidentDetails.impactFinancial;
    this.description = this.incidentDetails.description;
    this.impactLevel = this.incidentDetails.impactLevel;
    this.impactDescription = this.incidentDetails.impactDescription;
    this.severityLevel = this.incidentDetails.severityLevel;
    this.severityDescription = this.incidentDetails.severityDescription;
    this.ReasonCreation = this.incidentDetails.reasonForCreation;
    this.type = this.incidentDetails.type;
    this.assignee = this.assignee;
    this.responder = this.responder;
    this.time = this.incidentDetails.deadline.split("T")[1].split(".")[0];
    this.date = this.incidentDetails.deadline.split("T")[0];
    this.state = this.incidentDetails.state;
    this.impactOperational = this.incidentDetails.impactOperational;
    this.escalationPolicy = this.incidentDetails.escalationPolicy;
    this.userId = localStorage.getItem("userId");
    await this.$store.dispatch("getUsers");
    this.getAllImpactedIssues();
    // this.getAllIncidents();
    this.getAllFacility();
    this.getInventories();
    this.getAllSuppliers();
    this.getUsers();
  },

  methods: {
    handleImage(e) {
      const selectedImage = e; //e.target.files[0]; get first file
      this.createBase64Image(selectedImage);
    },
    createBase64Image(fileObject) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.image = e.target.result;
        this.uploadImage();
      };
      reader.readAsDataURL(fileObject);
    },
    uploadImage() {
      const { image } = this;
      this.data.img = image;
    },

    ...mapActions([
      "getInventories",
      "getAllSuppliers",
      "getAllFacility",
      "getAllImpactedIssues",
      "getUsers",
      "getIncidentsDetails",
      "updateIncidentById",
      "getIncidentByAssigneeToMe",
    ]),

    handelImpact(impactValue) {
      this.impactLevel = impactValue;
    },
    handelSeverity(severityValue) {
      this.severityLevel = severityValue;
    },

    updateIncident() {
      // console.log(
      //   "updateFun",
      //   this.itemName,
      //   this.selectedImpactedIssueId,
      //   "pppppppppppppppppppp"
      // );
      const data = {
        creatorId: localStorage.getItem("userId"),
        priority: this.getPriority(),
        subject: this.subject,
        description: this.description,
        severityLevel: this.severityLevel,
        severityDescription: this.severityDescription,
        impactLevel: this.impactLevel,
        impactDescription: this.impactDescription,
        state: this.state,
        // referenceId: this.referenceId,
        deadline: this.deadlineFun(),
        type: this.type,
        reasonForCreation: this.ReasonCreation,
        escalationPolicy: this.escalationPolicy,
        impactFinancial: this.impactFinancial,
        impactOperational: this.impactOperational,
        impactedIssues: this.selectedImpactedIssueId
          ? [{ id: this.selectedImpactedIssueId, item: this.itemName }]
          : [],
        assignee: this.assignee,
        // responder: this.responder,
      };
      console.log(data, "data");
      if (!this.$refs.form.validate()) {
        return;
      }
      this.updateIncidentById({ id: this.incidentId, body: data });

      if (this.files.length) {
        const formData = new FormData();
        for (let file of this.files) {
          formData.append("files", file, file.name);
        }
        formData.append("incidentId", response.id);
        this.createAttachment(formData);
      }
      this.getIncidentByAssigneeToMe(this.userId);
      this.$emit("update:dialog", false);
    },
    validate() {
      this.$refs.form.validate();
      console.log("validatevalidatevalidatevalidate", this.valid);
    },
    impactFinancialFun() {
      this.impactOperational = !this.impactFinancial;
    },
    addIssueList() {
      this.impactedIssuesNumber.push(1);
    },
    selectionImpactedIssue(id, item) {
      this.selectedImpactedIssueId = id;
      this.itemName = item;
    },
    ReasonForCreation(value) {
      this.ReasonCreation = value;
    },
    close() {
      this.$emit("update:dialog", false);
    },
    getPriority() {
      if (this.severityLevel === "High" || this.impactLevel === "High") {
        return "High";
      } else if (
        this.severityLevel === "Medium" ||
        this.impactLevel === "Medium"
      ) {
        return "Medium";
      } else {
        return "Low";
      }
    },
    setItemName(event) {
      this.itemName = event;
    },
    deadlineFun() {
      console.log(this.time, this.date, "hhhhhhhhhhhhhhhhhhhhhh");
      if (this.date == null || this.time == null) {
        return null;
      }
      return this.date + " " + this.time;
    },
  },
};
</script>
<style>
.v-input.v-input--is-label-active.v-input--is-dirty.theme--light.v-input--selection-controls.v-input--checkbox.primary--text {
  margin-top: 0px;
}
.buttons {
  display: flex;
  justify-content: space-between;
}
button.typeIncident.v-btn.v-btn--is-elevated.v-btn--has-bg.theme--light.v-size--default {
  width: 119%;
}
h5.subjects {
  color: snow;
  background-color: #9d9d9d;
  width: fit-content;
  padding: 0px 8px;
  margin: 5px 5px;
}

.create {
  background-color: #e0e0de;
  width: 100%;
  padding: 12px;
  margin-top: -9px;
}

.row.justify-space-between {
  margin: 0px 0px;
  width: 100%;
}
/* form.v-form {
  background-color: #fbfbfb;
} */

.v-input__slot {
}

.theme--light.v-btn.v-btn--has-bg {
  background-color: #f5f5f5;
}

input#input-85 {
  display: none;
}
.v-text-field.v-text-field--enclosed:not(.v-text-field--rounded)
  > .v-input__control
  > .v-input__slot,
.v-text-field.v-text-field--enclosed .v-text-field__details {
  padding: 0 12px;
}
.checkbox {
  display: flex;
  justify-content: flex-end;
  margin: -21px -3px;
}

.descrition {
  color: rgb(159 159 159);
}
h6 {
  color: rgb(118 118 118);
  margin: 2px 30px;
  font-size: 12px;
}
h5 {
  color: rgb(118 118 118);
}
.task {
}

.theme--light.v-input input,
.theme--light.v-input textarea {
  color: rgba(0, 0, 0, 0.87);
}
.inputDescription {
  border: solid 2px rgb(225 225 225);
}
button.impactedIssue.v-btn.v-btn--is-elevated.v-btn--has-bg.theme--light.v-size--default {
  text-transform: unset;
}
.v-input.inputImpact.v-textarea.theme--light.v-text-field.v-text-field--is-booted {
  width: 89%;

  margin-left: 8px;
}
.v-input.severity.v-textarea.theme--light.v-text-field.v-text-field--is-booted {
  width: 89%;

  margin-left: 8px;
}
textarea#input-114 {
  height: 12px;
}
textarea#input-108 {
  height: 12px;
}
textarea#input-102 {
  height: 90px;
}
.attachments {
  display: flex;
  justify-content: space-around;
}
.addAttachments {
  padding: 8px 0px;
}
.v-text-field__slot {
  width: 89px;
}
.issue {
  display: flex;
  justify-content: center;
}

p {
  font-size: 9px;
  margin-bottom: 0px;
}
</style>
