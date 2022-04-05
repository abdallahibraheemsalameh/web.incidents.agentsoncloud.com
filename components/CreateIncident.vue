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
      <div class="create">Create Incident</div>

      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row justify="space-between">
          <v-col cols="9" sm="6" md="6">
            <h5 class="subjects">Subject</h5>

            <!-- <v-combobox
              v-model="subject"
              :items="subjectsIncident"
              dense
              filled
              label="Subject"
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
                class="d-flex flex-row mb-2"
                v-for="(elment, i) in impactedIssuesNumber"
                :key="i"
              >
                <v-menu>
                  <template v-slot:activator="{ attrs, on }">
                    <v-btn class="impactedIssue" v-bind="attrs" v-on="on"
                      >Issue name ...</v-btn
                    >
                  </template>
                  <v-list>
                    <v-list-item
                      v-for="(impactedIssue, i) in allImpactedIssues"
                      :key="i"
                      link
                      @change="
                        selectionImpactedIssue(
                          impactedIssue.name,
                          impactedIssue.id
                        )
                      "
                    >
                      <v-list-item-title
                        v-text="impactedIssue.name"
                      ></v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>

                <template>
                  <div>
                    <v-autocomplete
                      :items="itemNames"
                      dense
                      filled
                      label="Search"
                      :rules="issueRules"
                      @change="setItemName($event, i)"
                    ></v-autocomplete>
                  </div>
                </template>
                <v-icon v-if="i === 0" @click="addIssueList"> mdi-plus</v-icon>
              </div>
            </div>
          </v-col>
          <v-col cols="9" sm="6" md="6">
            <!-- class="rightDiv" -->

            <div class="issue">
              <!-- Impacted issue -->
              <!-- <v-autocomplete
                v-for="impactedIssue in impactedIssuesNumber"
                :key="impactedIssue.id"
                :items="impactedIssue.name"
                dense
                filled
                label="Search"
                :rules="issueRules"
                @change="
                  selectionImpactedIssue(impactedIssue.name, impactedIssue.id)
                "
              ></v-autocomplete> -->
            </div>
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
              :rules="assigneeRules"
              label="enter name ....."
              background-color="#ffffff"
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

            <h5 class="subjects">Deadline</h5>

            <div>
              select date and time
              <datetime
                v-model="deadline"
                title="Deadline"
                auto
                type="datetime"
              >
              </datetime>
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
                  @change="inputChanged"
                  label="upload"
                  height="32"
                  class="file"
                  outlined
                  dense
                >
                  <!-- <template v-slot:selection="{ text, index }">
                   addfile
                  <v-chip
                    small
                    text-color="white"
                    color="#295671"
                    close
                    @click:close="remove(index)"
                  >
                    {{ text }}
                  </v-chip>
                </template> -->
                </v-file-input>
              </div>
            </div>
            <div class="task">
              <v-checkbox
                label="to be as a task sent to assignee"
                v-model="task"
                background-color="rgb(238 238 238)"
              ></v-checkbox>
            </div>
            <div class="buttons">
              <v-btn class="cancel">draft</v-btn>
              <v-btn class="cancel" @click.native="close"> Cancel </v-btn>

              <v-btn
                @click="
                  validate();
                  create();
                "
                :disabled="!valid"
                class="createBut"
                >Create</v-btn
              >
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </v-dialog>
</template>

<script>
import Vue from "vue";
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
      responderId: null,
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
      valid: true,
      userId: null,
      responder: {},
    };
  },

  computed: {
    ...mapGetters([
      "allInventories",
      "allImpactedIssues",
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
    await this.$store.dispatch("getUsers");
    this.getAllImpactedIssues();
    this.getAllIncidents();
    this.getAllFacility();
    this.getAllSuppliers();
    this.getInventories();
    this.subjectsIncident = this.allIncident.map((incident) => {
      return incident.subject;
    });
  },
  watch: {},
  methods: {
    ...mapActions([
      "getAllIncidents",
      "getInventories",
      "getAllSuppliers",
      "getAllFacility",
      "getAllImpactedIssues",
      "createNewIncident",
      "createAttachment",
      "createResponder",
      "getCreatorById",
      "getUsers",
      "createIncidentAssignee",
      "getIncidentsCreatedByMe",
      "getIncidentByAssigneeToMe",
    ]),
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
        responderId: this.responder,
        deadline: this.deadline,
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
      };
      await this.$axios
        .$post(`/incident-management/incident`, data)

        .then((response) => {
          if (
            !data.subject ||
            !data.subject.length ||
            !data.description.length ||
            !data.description ||
            !data.impactedIssues ||
            !data.impactedIssues.length ||
            !data.assignee ||
            !data.assignee.length
          ) {
            return;
          }
          console.log(response, "-----------------response");
          // Upload fiels
          if (this.files.length) {
            const formData = new FormData();
            for (let file of this.files) {
              formData.append("files", file, file.name);
            }
            formData.append("incidentId", response.id);
            this.createAttachment(formData);
          }

          this.$emit("update:dialog", false);
          this.getCreatorById(response.creatorId);
          console.log(this.creator, "ghghghghg");
        })
        .catch((err) => {
          console.log(err);
        });
      this.getIncidentByAssigneeToMe({ id: this.userId });
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

    selectionImpactedIssue(name, id) {
      this.selectedImpactedIssueId = id;
      const itemsLists = {
        Facilities: this.allFacilities,
        Suppliers: this.allSuppliers,
        "Inventory item": this.allInventories,
        "Consumer profile": this.allUsers,
        Appointment: this.allSuppliers,
        "Users profiles": this.allUsers,
      };
      this.itemList = itemsLists[name];
      this.itemNames = this.itemList.map((item) => {
        return item.name;
      });
    },
    setItemName(event, i) {
      this.itemName = event;
    },
    addIssueList() {
      this.impactedIssuesNumber.push(1);
    },
    validate() {
      this.$refs.form.validate();
    },
  },
};
</script>

/*
<style>
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
.container {
  /* background-color: snow; */
  border: solid 5px #f2f2f2;
  /* width: 77%; */
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
form.v-form {
  background-color: #fbfbfb;
}
.rightDiv.col-md-4.col-12 {
  margin-right: 90px;
}
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
  margin: -38px 21px;
}

.descrition {
  color: rgb(159 159 159);
  padding-top: 22px;
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
  width: 116%;
}
button.createBut.v-btn.v-btn--is-elevated.v-btn--has-bg.theme--light.v-size--default {
  background-color: #4992db;
  text-transform: unset;
  color: snow;
}
button.cancel.v-btn.v-btn--is-elevated.v-btn--has-bg.theme--light.v-size--default {
  background-color: #e7e7e7;
  color: #c2c2c2;
  text-transform: unset;
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
.rightDiv.col-md-4.col-12 {
  margin-right: 100px;
}
</style>
