<template>
  <v-dialog
    v-model="dialog"
    light
    persistent
    overlay-color="rgb(152 152 152)"
    overlay-opacity="0.90"
    max-width="800px"
  >
    <v-stepper v-model="elem">
      <v-card-title>
        <span>Update Incident</span>
      </v-card-title>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-stepper-items>
          <v-stepper-content step="1" class="stepContent">
            <v-card class="mb-2">
              <v-row justify="space-between">
                <v-col cols="9" sm="" md="">
                  <v-text-field
                    background-color="#ffffff"
                    name="input-7-1"
                    v-model="subject"
                    value=""
                    :rules="subjectRules"
                    height="35"
                    label="Subject*"
                    required
                  ></v-text-field>

                  <div class="checkbox">
                    <v-checkbox
                      v-model="impactFinancial"
                      :label="`impact financial(SLA)`"
                      v-on:change="impactFinancialFun"
                    ></v-checkbox>
                  </div>

                  <p class="descrition">
                    description: please explain (who-why-what-where-how)
                  </p>

                  <!-- this is whennnnn -->
                  <div>When</div>
                  <div>
                    <div v-if="happeningDatePicker">
                      <v-date-picker
                        v-model="happeningDate"
                        :min="new Date().toISOString().substr(0, 10)"
                      ></v-date-picker>
                      <div class="ml-16">
                        <v-btn
                          text
                          color="primary"
                          @click="
                            (happeningDatePicker = false), (happeningDate = '')
                          "
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="happeningDatePicker = false"
                        >
                          OK
                        </v-btn>
                      </div>
                    </div>
                    <v-text-field
                      v-model="happeningDate"
                      label="Select date"
                      prepend-icon="mdi-calendar"
                      readonly
                      @click="happeningDatePicker = true"
                    ></v-text-field>
                  </div>
                  <div>
                    <v-text-field
                      v-model="incidentHappeningTime"
                      label="Select time"
                      prepend-icon="mdi-clock-time-four-outline"
                      readonly
                      @click="happeningTimePicker = true"
                    ></v-text-field>
                    <div v-if="happeningTimePicker">
                      <v-time-picker
                        v-model="incidentHappeningTime"
                        ampm-in-title
                        format="ampm"
                      ></v-time-picker>
                      <div class="ml-16">
                        <v-btn
                          text
                          color="primary"
                          @click="
                            (happeningTimePicker = false),
                              (incidentHappeningTime = null)
                          "
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="happeningTimePicker = false"
                        >
                          OK
                        </v-btn>
                      </div>
                    </div>
                  </div>
                  <v-text-field
                    v-model="description"
                    name="input-7-1"
                    :rules="descriptionRules"
                    height="70"
                    background-color="#ffffff"
                    label="Description"
                    required
                  ></v-text-field>
                  <div class="impact">
                    <v-text-field
                      background="rgb(145 145 145)"
                      name="input-7-1"
                      v-model="impactDescription"
                      value=""
                      class="inputImpact"
                      rows="2"
                      :rules="impactDesRules"
                      label="Impact description"
                    ></v-text-field>
                    <div class="d-flex flex-row mb-2">
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
                  </div>
                </v-col>
                <v-col cols="9" sm="6" md="6">
                  <div class="impact">
                    <v-text-field
                      background="rgb(145 145 145)"
                      name="input-7-1"
                      v-model="severityDescription"
                      value=""
                      class="inputImpact"
                      rows="2"
                      :rules="severityRules"
                      label="Severity description"
                    ></v-text-field>
                    <div class="d-flex flex-row mb-2">
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
                  </div>
                  <div class="d-flex flex-column mb-2">
                    <div
                      class="pt-8"
                      v-if="
                        incidentDetails.ImpactedIssues &&
                        incidentDetails.ImpactedIssues.length > 0
                      "
                    >
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

                    <div class="pt-8" v-else>
                      <SelectIssue @setIssueAndItem="selectionImpactedIssue" />
                    </div>
                  </div>
                  <v-autocomplete
                    v-model="type"
                    :items="types"
                    label="Type"
                    background-color="#ffffff"
                  ></v-autocomplete>
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

                  <v-select
                    v-model="assignee"
                    :items="allUsers"
                    item-text="name"
                    item-value="id"
                    :rules="assigneeRules"
                    background-color="#ffffff"
                    label="assignee"
                    multiple
                    chips
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        :key="JSON.stringify(data.item)"
                        v-bind="data.attrs"
                        :input-value="data.selected"
                        :disabled="data.disabled"
                        @click:close="data.parent.selectItem(data.item)"
                      >
                        <v-avatar
                          class="accent white--text"
                          left
                          v-text="
                            String(data.item.name).slice(0, 1).toUpperCase()
                          "
                        ></v-avatar>
                        {{ data.item.name }}
                      </v-chip>
                    </template>
                  </v-select>
                  <v-select
                    v-model="secondaryAssignee"
                    :items="allUsers"
                    item-text="name"
                    item-value="id"
                    label="Secondary assignee"
                    background-color="#ffffff"
                  ></v-select>

                  <v-combobox
                    v-model="responder"
                    :items="allUsers"
                    multiple
                    chips
                    item-text="name"
                    item-value="id"
                    label="responder"
                    background-color="#ffffff"
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        :key="JSON.stringify(data.item)"
                        v-bind="data.attrs"
                        :input-value="data.selected"
                        :disabled="data.disabled"
                        @click:close="data.parent.selectItem(data.item)"
                      >
                        <v-avatar
                          class="accent white--text"
                          left
                          v-text="
                            String(data.item.name).slice(0, 1).toUpperCase()
                          "
                        ></v-avatar>
                        {{ data.item.name }}
                      </v-chip>
                    </template>
                  </v-combobox>
                </v-col>
              </v-row>
            </v-card>
            <div class="d-flex justify-end mr-8">
              <v-btn class="pa-4 ma-4 text-capitalize" @click.native="close">
                Close
              </v-btn>
              <v-btn
                color="primary"
                class="pa-4 ma-4 text-capitalize"
                @click="next"
              >
                Next</v-btn
              >
            </div>
          </v-stepper-content>

          <v-stepper-content step="2" class="stepContent">
            <v-card class="mb-2">
              <v-row>
                <v-col>
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
                      :rules="dateRules"
                      label="Select date"
                      prepend-icon="mdi-calendar"
                      readonly
                      @click="datePicker = true"
                    ></v-text-field>
                  </div>
                  <div>
                    <v-text-field
                      v-model="time"
                      :rules="timeRules"
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
                </v-col>

                <v-col>
                  <v-text-field
                    v-model="escalationPolicy"
                    label=" Escalation duration   hh:mm"
                    dense
                    value=""
                  ></v-text-field>
                  <div class="attachments">
                    <p class="addAttachments">add attachments</p>
                    <div>
                      <v-file-input
                        v-model="files"
                        full-width:true
                        small-chips
                        show-size
                        multiple
                        clearable
                        @change="handleImage"
                        label="upload"
                        height="32"
                        class="file"
                        dense
                      >
                      </v-file-input>
                    </div>
                  </div>
                  <div>
                    <v-checkbox
                      label="to be as a task sent to assignee"
                      v-model="task"
                    ></v-checkbox>
                  </div>
                </v-col>
              </v-row>
              <!-- Buttons -->
              <!-- <v-row> -->

              <div class="d-flex justify-end pa-8">
                <v-btn @click.native="close" class="pa-4 ma-4 text-capitalize">
                  Cancel
                </v-btn>
                <v-btn
                  @click="updateIncident()"
                  class="pa-4 ma-4 text-capitalize"
                  :disabled="!valid"
                  color="primary"
                  >Update</v-btn
                >
              </div>
              <!-- </v-row> -->
            </v-card>
            <div class="d-flex justify-end mr-8">
              <v-btn
                color="primary"
                class="pa-4 ma-4 text-capitalize"
                @click="elem = 1"
              >
                Back
              </v-btn>
            </div>
          </v-stepper-content>
        </v-stepper-items>
      </v-form>
    </v-stepper>
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
      valid: false,
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
      assignee: [],
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
      impactDesRules: [
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
      timeRules: [(value) => !!value || "time is required"],
      dateRules: [(value) => !!value || "date is required"],
      secondaryAssignee: null,
      happeningDatePicker: false,
      happeningTimePicker: false,
      incidentHappeningTime: null,
      happeningDate: null,
      elem: 1,
      // assigneeName: [],
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
    this.getUsers();
    this.assigneeIds();
    this.responderIds();

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
    this.time = this.incidentDetails.deadline
      ? this.incidentDetails.deadline.split("T")[1].split(".")[0]
      : null;
    this.date = this.incidentDetails.deadline
      ? this.incidentDetails.deadline.split("T")[0]
      : null;
    // ?????
    this.incidentHappeningTime = this.incidentDetails.happeningTime
      ? this.incidentDetails.happeningTime.split("T")[1].split(".")[0]
      : null;
    this.happeningDate = this.incidentDetails.happeningTime
      ? this.incidentDetails.happeningTime.split("T")[0]
      : null;
    this.state = this.incidentDetails.state;
    this.impactOperational = this.incidentDetails.impactOperational;
    this.escalationPolicy = this.incidentDetails.escalationPolicy;
    this.secondaryAssignee = this.incidentDetails.secondaryAssignee;
    this.userId = localStorage.getItem("userId");
    await this.$store.dispatch("getUsers");
    this.getAllImpactedIssues();
    // this.getAllIncidents();
    this.getAllFacility();
    this.getInventories();
    this.getAllSuppliers();
  },

  methods: {
    next() {
      if (!this.$refs.form.validate()) {
        return;
      }
      this.elem += 1;
    },
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
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
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
      "getIncidentsCreatedByMe",
      "updateAttachment",
    ]),

    handelImpact(impactValue) {
      this.impactLevel = impactValue;
    },
    handelSeverity(severityValue) {
      this.severityLevel = severityValue;
    },

    updateIncident() {
      if (!this.$refs.form.validate()) {
        return;
      }
      const data = {
        creatorId: +localStorage.getItem("userId"),
        priority: this.getPriority(),
        subject: this.subject,
        description: this.description,
        severityLevel: this.severityLevel,
        severityDescription: this.severityDescription,
        impactLevel: this.impactLevel,
        impactDescription: this.impactDescription,
        state: this.state,
        deadline: this.deadlineFun(),
        secondaryAssignee: this.secondaryAssignee,
        happeningTime: this.handelIncidentHappeningTime(),
        type: this.type,
        reasonForCreation: this.ReasonCreation,
        escalationPolicy: this.escalationPolicy,
        impactFinancial: this.impactFinancial,
        impactOperational: this.impactOperational,
        impactedIssues: this.selectedImpactedIssueId
          ? [{ id: this.selectedImpactedIssueId, item: this.itemName }]
          : [],
        assignee: this.assignee,
      };
      console.log(data, "data");

      this.updateIncidentById({ id: this.incidentId, body: data });

      if (this.files.length) {
        const formData = new FormData();
        console.log(file, file.name, "llllllllllllllllllllllllll");
        for (let file of this.files) {
          formData.append("files", file, file.name);
        }
        formData.append("incidentId", response.id);
        this.updateAttachment(1, formData);
      }
      this.getIncidentByAssigneeToMe(this.userId);
      this.$emit("update:dialog", false);
      this.$emit("getIncidents");
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
      if (this.date == null || this.time == null) {
        return null;
      }
      return this.date + " " + this.time;
    },
    handelIncidentHappeningTime() {
      if (this.happeningDate == null || this.incidentHappeningTime == null) {
        return null;
      }

      return this.happeningDate + " " + this.incidentHappeningTime;
    },
    assigneeIds() {
      this.assignee = this.incidentDetails.assignees.map((assignee) => {
        return assignee.id;
      });

      console.log("--------------assigneeNames", this.assignee);
    },
    responderIds() {
      this.responder = this.incidentDetails.responders.map((responder) => {
        return responder.id;
      });

      console.log("--------------responderNames", this.responder);
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
  /* margin: -21px -3px; */
}

.descrition {
  color: rgb(159 159 159);
}
h6 {
  color: rgb(118 118 118);
  margin: 2px 30px;
  font-size: 12px;
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
