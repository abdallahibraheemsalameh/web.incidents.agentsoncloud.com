<template>
  <v-dialog
    v-model="dialog"
    light
    persistent
    overlay-color="rgb(152 152 152)"
    overlay-opacity="0.90"
    max-width="800px"
  >
    <v-stepper v-model="step">
      <v-card-title>
        <span>Create Incident</span>
      </v-card-title>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-stepper-items>
          <v-stepper-content ref="step_1" step="1" class="stepContent">
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
                      :rules="impactRules"
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
                  <div
                    class="d-flex"
                    v-for="(issue, i) in linkedIssues"
                    :key="i"
                  >
                    <div class="pt-8">
                      <SelectIssue
                        @setIssueAndItem="selectionImpactedIssue"
                        :index="i"
                      />
                    </div>
                    <div class="pt-10 ml-4" v-if="i == 0">
                      <v-icon @click="addLikedIssue">mdi-plus-circle</v-icon>
                    </div>

                    <div class="pt-10 ml-4" v-else>
                      <v-icon @click="removeLikedIssue(i)"
                        >mdi-minus-circle</v-icon
                      >
                    </div>
                    <div class="pt-5">
                      <v-checkbox
                        :disabled="!impactedIssues[i]"
                        @change="impactedValue($event, i)"
                        label="Impacted"
                      ></v-checkbox>
                    </div>
                  </div>
                  <!-- <div v-if="showSelect" class="d-flex">
                    <div>
                      <SelectIssue @setIssueAndItem="selectionImpactedIssue" />
                    </div>
                    <div class="pt-2 ml-4">
                      <v-icon @click="showSelect = false"
                        >mdi-minus-circle</v-icon
                      >
                    </div>
                    <div class="">
                      <v-checkbox label="Impact"></v-checkbox>
                    </div>
                  </div> -->
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
                  <v-select
                    v-model="assignee"
                    :items="allUsers"
                    multiple
                    item-text="name"
                    item-value="id"
                    :rules="assigneeRules"
                    label="assignee"
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
                  </v-select>
                </v-col>
                <!-- </v-col> -->
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
                  <v-autocomplete
                    v-model="secondaryAssignee"
                    :items="allUsers"
                    item-text="name"
                    item-value="id"
                    label="Secondary assignee"
                    background-color="#ffffff"
                  ></v-autocomplete>

                  <v-select
                    v-model="responder"
                    :items="allUsers"
                    multiple
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
                  </v-select>
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
              <div class="d-flex justify-center">
                <v-btn class="pa-4 ma-4 text-capitalize">draft</v-btn>
                <v-btn class="pa-4 ma-4 text-capitalize" @click.native="close">
                  Cancel
                </v-btn>

                <v-btn
                  @click="create()"
                  :disabled="!valid"
                  class="pa-4 ma-4 text-capitalize"
                  color="primary"
                  >Create</v-btn
                >
              </div>
              <!-- </v-row> -->
            </v-card>
            <div class="d-flex justify-end mr-8">
              <v-btn
                color="primary"
                class="pa-4 ma-4 text-capitalize"
                @click="step = 1"
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
import "vue-datetime/dist/vue-datetime.css";
// Vue.use(Datetime);
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    dialog: {
      default: false,
    },
  },
  data() {
    return {
      step: 1,
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
      valid: false,
      userId: null,

      time: null,
      timePicker: false,
      picker: null,
      date: new Date().toISOString().slice(0, 10),
      datePicker: false,
      secondaryAssignee: null,
      happeningDate: null,
      happeningDatePicker: false,
      happeningTimePicker: false,
      incidentHappeningTime: null,
      timeRules: [(value) => !!value || "time is required"],
      dateRules: [(value) => !!value || "date is required"],
      linkedIssues: [1],
      impactedIssues: [],
      impacted: null,
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
    console.log("--------------------------create", this.impacted);

    this.userId = localStorage.getItem("userId");
    this.subjectsIncident = this.allIncident.map((incident) => {
      return incident.subject;
    });
    this.deadline = "css";
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
      console.log("updateFun", this.impactedIssues, "eeeeeeeeeeeeeeeeeee");
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
        impactedIssues: this.impactedIssues,
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
      this.step = 1;
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

    selectionImpactedIssue(id, item, index) {
      const issues = this.impactedIssues;
      issues[index] = { id, item };
      this.impactedIssues = [...issues];

      console.log(this.impactedIssues[index], "this.impactedIssues");
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
    addLikedIssue() {
      const length = this.linkedIssues.length;
      this.linkedIssues.push(length + 1);
    },
    removeLikedIssue(index) {
      this.linkedIssues.splice(index, 1);
      this.impactedIssues.splice(index, 1);
    },
    impactedValue(event, index) {
      const value = this.impactedIssues[index];
      value.impacted = event;
      // this.impactedIssues[index] = value;
      //   this.linkedIssues.splice(index, 1);
      //   this.impactedIssues.splice(index, 1);
    },
    next() {
      // if (!this.$refs.form.validate()) {
      //   console.log(" this.deadline this.deadline", this.deadline);
      //   return;
      // }
      // console.log(this.$refs.step_1, this.$refs.field.validate());
      // return;
      if (!this.$refs.form.validate()) {
        return;
      }

      this.step = 2;
    },
  },
};
</script>
<style>
p.descrition {
  font-size: 14px;
}
</style>
