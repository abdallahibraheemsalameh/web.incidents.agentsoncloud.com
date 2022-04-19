<template>
  <v-stepper>
    <v-stepper-items>
      <v-dialog
        v-model="dialog"
        light
        persistent
        overlay-color="#868686"
        overlay-opacity="0.90"
        max-width="800px"
      >
        <v-card>
          <v-container>
            <v-card-title>
              <span>Create Incident</span>
            </v-card-title>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row justify="space-between">
                <v-col cols="9" sm="6" md="6">
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
                    description: please explain (who-why-what-where-how-when)
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
                    name="input-7-1"
                    v-model="description"
                    :rules="descriptionRules"
                    height="110"
                    background-color="#ffffff"
                    lable="Description"
                    required
                  ></v-text-field>
                  <v-progress-linear
                    color="rgb(227 227 227)"
                    value="100"
                    height="1"
                  ></v-progress-linear>
                  <div class="impact">
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
                    <v-text-field
                      background="rgb(145 145 145)"
                      name="input-7-1"
                      v-model="impactDescription"
                      value=""
                      class="inputImpact"
                      rows="2"
                      :rules="impactRules"
                      label="Impact description"
                    ></v-text-field>
                  </div>
                  <div class="impact">
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
                  </div>
                  <div class="d-flex flex-column mb-2">
                    <div>
                      <SelectIssue @setIssueAndItem="selectionImpactedIssue" />
                    </div>
                  </div>
                </v-col>
                <v-col cols="9" sm="6" md="6">
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
                  <v-autocomplete
                    v-model="assignee"
                    :items="allUsers"
                    multiple
                    item-text="name"
                    item-value="id"
                    :rules="assigneeRules"
                    label="enter name ....."
                    background-color="#ffffff"
                  ></v-autocomplete>
                  <v-autocomplete
                    v-model="secondaryAssignee"
                    :items="allUsers"
                    item-text="name"
                    item-value="id"
                    label="Secondary assignee"
                    background-color="#ffffff"
                  ></v-autocomplete>

                  <v-autocomplete
                    v-model="responder"
                    :items="allUsers"
                    multiple
                    item-text="name"
                    item-value="id"
                    label="responder"
                    background-color="#ffffff"
                  ></v-autocomplete>

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
                  mmmm
                  <div>
                    <v-checkbox
                      label="to be as a task sent to assignee"
                      v-model="task"
                    ></v-checkbox>
                  </div>
                  <div class="buttons">
                    <v-btn class="createButtons" width="15">draft</v-btn>
                    <v-btn
                      class="createButtons"
                      @click.native="close"
                      width="15"
                    >
                      Cancel
                    </v-btn>

                    <v-btn
                      @click="create()"
                      :disabled="!valid"
                      class="createButtons"
                      width="15"
                      >Create</v-btn
                    >
                  </div>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card>
      </v-dialog>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import { Datetime } from "vue-datetime";

import "vue-datetime/dist/vue-datetime.css";
// Vue.use(Datetime);
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    datetime: Datetime,
  },
  props: {
    dialog: {
      default: false,
    },
  },
  data() {
    return {
      imgs: [],
      image: "",
      // message: "",
      valueRequired: true,

      descriptionRules: [
        (v) => !!v || "Description is required",
        (v) =>
          v.length <= 400 ||
          "Description is required and  should be at most 400 character",
      ],
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
      issueRules: [(value) => !!value || "Issue is required"],
      assigneeRules: [(value) => !!value.length || "Assignee is required"],
      dateRules: [(value) => !!value || "date is required"],
      timeRules: [(value) => !!value || "time is required"],
      impactLevel: "Medium",
      ReasonCreation: "",
      files: [],
      creatorId: "",
      assigneeId: "",
      responder: [],
      subject: "",
      subjectRules: [
        (v) => !!v || "Subject is required",
        // (v) => (v.length = 10 || "Name must be less than 10 characters"),
        (value) =>
          value.length <= 40 || "Subject should be at most 40 characters",
      ],
      description: "",
      severityLevel: "Medium",
      severityDescription: "",
      impactDescription: "",
      state: "New",
      referenceId: "",
      deadline: "",
      type: "",
      reasonForCreation: "",
      category: "",
      escalationPolicy: "",
      impactFinancial: false,
      impactOperational: true,
      loading: false,
      value: "",
      record_status: "islatest",
      search: null,
      select: null,

      types: ["Operational", "technical", "Business"],
      task: true,
      subjectsIncident: [],
      sheet: false,
      itemList: [],
      itemNames: [],
      assignee: [],
      file: "",
      issues: [],
      issue: "",
      impactedIssuesNumber: [1],
      selectedImpactedIssueId: null,
      itemName: null,
      valid: false,
      userId: null,

      time: null,
      timePicker: false,
      picker: null,
      date: new Date().toISOString().slice(0, 10),
      datePicker: false,
      secondaryAssignee: "",
      happeningDate: null,
      happeningDatePicker: false,
      happeningTimePicker: false,
      incidentHappeningTime: null,
    };
  },

  computed: {
    ...mapGetters([
      "allIncident",
      "allFacilities",
      "allSuppliers",
      "newAttachment",
      "newAssignee",
      "creator",
      "allUsers",
      "newAttachment",
    ]),
  },
  async mounted() {
    console.log("--------------------------create");

    this.userId = localStorage.getItem("userId");
    this.subjectsIncident = this.allIncident.map((incident) => {
      return incident.subject;
    });
  },
  watch: {},
  methods: {
    handleImage(e) {
      console.log("imgs =>", e);
      const selectedImage = e; //e.target.files[0]; get first file

      e.forEach((img) => {
        this.createBase64Image(img);
      });
    },
    createBase64Image(fileObject) {
      console.log("fileObject", fileObject);
      const reader = new FileReader();
      reader.onload = (e) => {
        this.image = e.target.result;
        this.uploadImage();
      };
      reader.readAsDataURL(fileObject);
    },
    uploadImage() {
      const { image } = this;
      this.imgs.push(image);
      console.log("this.imgs", this.imgs);
    },

    ...mapActions(["createNewIncident", "createAttachment"]),
    close() {
      this.$emit("update:dialog", false);
    },

    remove(index) {
      this.files.splice(index, 1);
    },
    inputChanged() {},
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
    async create() {
      console.log(
        "updateFun",
        this.itemName,
        this.selectedImpactedIssueId,
        "eeeeeeeeeeeeeeeeeee"
      );
      if (!this.$refs.form.validate()) {
        return;
      }

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
        referenceId: this.referenceId,
        responder: this.responder,
        deadline: this.deadlineFun(),
        type: this.type,
        reasonForCreation: this.ReasonCreation,
        category: this.category,
        escalationPolicy: this.escalationPolicy,
        impactFinancial: this.impactFinancial,
        impactOperational: this.impactOperational,
        recordStatus: this.record_status,
        impactedIssues: this.selectedImpactedIssueId
          ? [{ id: this.selectedImpactedIssueId, item: this.itemName }]
          : [],
        assignee: this.assignee,
        secondaryAssignee: this.secondaryAssignee,
        happeningTime: this.handelIncidentHappeningTime(),
      };
      const response = await this.$axios.$post(
        `/incident-management/incident`,
        data
      );
      console.log(response, "response");
      // Upload fiels
      // if (this.files.length) {
      //   const formData = new FormData();
      //   for (let file of this.files) {
      //     formData.append("files", file, file.name);
      //   }
      //   formData.append("incidentId", response.id);
      //   console.log("=================>formData", formData, response.id);
      //   this.createAttachment(formData);
      // }
      if (this.files.length) {
        const fromData = { id: response.id, files: this.imgs };
        this.createAttachment(fromData);
      }
      this.$emit("update:dialog", false);
      this.$emit("getIncidents");
    },

    impactFinancialFun() {
      this.impactOperational = !this.impactFinancial;
    },

    handelImpact(impactValue) {
      this.impactLevel = impactValue;
    },
    handelSeverity(severityValue) {
      this.severityLevel = severityValue;
    },
    ReasonForCreation(value) {
      this.ReasonCreation = value;
    },

    selectionImpactedIssue(id, item) {
      this.selectedImpactedIssueId = id;
      this.itemName = item;
    },
    setItemName(event) {
      this.itemName = event;
    },
    addIssueList() {
      this.impactedIssuesNumber.push(1);
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
  },
};
</script>

<style>
.buttons {
  /* display: flex; */
  /* justify-content: space-between; */
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
.row.justify-space-between {
  margin: 0px 0px;
  width: 100%;
}
.rightDiv.col-md-4.col-12 {
  margin-right: 90px;
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
/* .v-text-field.v-text-field--enclosed .v-text-field__details {
  padding: 0 12px;
} */
.checkbox {
  /* display: flex; */
  /* justify-content: flex-end; */
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
h5 {
  color: rgb(118 118 118);
}

.theme--light.v-input input,
.theme--light.v-input textarea {
  color: rgba(0, 0, 0, 0.87);
}
p.descrip {
  font-size: 9px;
  margin-bottom: 0px;
}
p.addAttachments {
  padding: 10px 13px;
  font-size: 18px;
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
  /* display: flex; */
  /* justify-content: space-around; */
}
/* .addAttachments {
  padding: 8px 0px;
} */
.v-text-field__slot {
  width: 89px;
}
.issue {
  /* display: flex; */
  /* justify-content: center; */
}
.rightDiv.col-md-4.col-12 {
  margin-right: 100px;
}
.createButtons {
  text-transform: none;
}
.v-menu__content.theme--light.v-menu__content--fixed.menuable__content__active {
  background-color: #ffffff;
}
.v-messages.theme--light {
  display: none;
}
</style>
