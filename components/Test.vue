<template>
  <v-dialog v-model="dialog" persistent>
    <v-container>
      <div class="create">
        Createssssssssssssssssssssssssssssssssssssss Incident
      </div>

      <!-- lllllllllllllllllllllllllllllllllllllllllllllllllllllllllll -->

      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row justify="space-between">
          <!-- lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll -->

          <v-col cols="12" md="4">
            <h5 class="subjects">Subject</h5>
            <!-- <div class="search"> -->
            <!-- <v-text-field
              disabled:false
              v-model="subject"
              :items="subjectsIncident"
              dense
              filled
              label="Subjeddddddddct"
              :rules="nameRules"
              :counter="10"
            ></v-text-field> -->
            <v-combobox
              v-model="subject"
              :items="subjectsIncident"
              dense
              filled
              label="Subject"
              :rules="subjectRules"
            ></v-combobox>
            <!-- <v-select
              v-model="subject"
              :items="subjectsIncident"
              :rules="[(v) => !!v || 'Item is required']"
              label="subject"
              required
            ></v-select> -->

            <!-- </div> -->
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
          </v-col>
          <v-col cols="12" md="4" class="rightDiv">
            <h5 class="subjects">Impacted issue</h5>
            <div class="issue">
              <!-- Impacted issue -->
              <div class="d-flex flex-column mb-2">
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
                  <v-icon v-if="i === 0" @click="addIssueList">
                    mdi-plus</v-icon
                  >
                </div>
              </div>
            </div>
            <h5 class="subjects">Incident type</h5>

            <v-menu>
              <template v-slot:activator="{ attrs, on }">
                <v-btn class="typeIncident" v-bind="attrs" v-on="on">
                  .....
                </v-btn>
              </template>

              <v-list>
                <v-list-item
                  v-for="item in types"
                  :key="item"
                  link
                  @change="getType(item)"
                >
                  <v-list-item-title v-text="item"></v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

            <h5 class="subjects">Reason for creation</h5>
            <div>
              <div class="text-center">
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
                    On-call
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
                    Requested
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
                    By me
                  </v-chip>
                </template>
                <!-- <v-chip class="ma-2" @click="handelReason('on-call')">
                  On-call
                </v-chip>
                <v-chip class="ma-2" @click="handelReason('requested')">
                  Requested
                </v-chip>
                <v-chip class="ma-2" @click="handelReason('by me')">
                  By me
                </v-chip> -->
              </div>
            </div>
            <h5 class="subjects">assignee</h5>
            <v-autocomplete
              v-model="assignee"
              :items="assignees"
              filled
              :rules="assigneeRules"
              label="enter name ....."
              @click="saveAssignee()"
            ></v-autocomplete>

            <h5 class="subjects">responders</h5>
            <v-autocomplete
              v-model="responder"
              :items="responders"
              filled
              label="enter name ....."
            ></v-autocomplete>

            <h5 class="subjects">Deadline</h5>

            <div>
              select date and time
              <datetime v-model="deadline" title="Deadline" auto type="datetime"
                >llll
              </datetime>
            </div>

            <!-- <h5>Escalation date</h5> -->
            <!-- <v-text-field
              v-model="escalationPolicy"
              label="Escalation date"
            ></v-text-field> -->
            <!-- <h5>Escalation date</h5>
          <v-text-field v-model="model" label="Escalation date"></v-text-field> -->

            <!-- <div>{{ newAttachment }};;;;;;;</div> -->
            <div class="attachments">
              <div class="addAttachments">add attachments</div>

              <div>
                <v-file-input
                  v-model="files"
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
            <!-- Tasks -->
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
              <v-btn
                ref="button"
                block
                color="primary"
                @click="$vuetify.goTo(target, options)"
              >
                scroll
              </v-btn>
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
      inputRule: [
        (value) =>
          value.length >= 10 || "Subject should be at most 10 characters",
      ],
      descriptionRules: [
        (v) => !!v || "Description is required",
        (v) =>
          (!!v && v.length <= 4) ||
          "Description is required and  should be at most 400 character",
        // (value) => !!value || "Issue is required",
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
      assigneeRules: [(value) => !!value || "Assignee is required"],
      impactLevel: "Medium",
      files: [],
      creatorId: "",
      assigneeId: "",
      responderId: "",
      subject: "",
      subjectRules: [
        (v) => !!v || "Subject is required",
        // (v) => (v.length = 10 || "Name must be less than 10 characters"),
        // (value) =>
        //   value.length >= 10 || "Subject should be at most 4 characters",
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
      assignees: [],
      itemList: [],
      itemNames: [],
      responders: [],
      assignee: "",
      file: "",
      responder: "",
      issues: [],
      issue: "",
      impactedIssuesNumber: [1],
      selectedImpactedIssueId: null,
      itemName: null,
      valid: true,
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
      "newResponder",
      "creator",
      "allUsers",
      "newAttachment",
    ]),
  },
  async mounted() {
    this.$store.dispatch("getAllIncidents");
    // this.$store.dispatch("getAllImpactedIssues");
    await this.$store.dispatch("getUsers");
    this.getAllImpactedIssues();
    // this.getUsers();
    this.getAllIncidents();
    this.getAllFacility();
    this.getAllSuppliers();
    this.getInventories();
    this.subjectsIncident = this.allIncident.map((incident) => {
      return incident.subject;
    });
    this.responders = this.allUsers.map((user) => {
      return user.name;
    });
    this.assignees = this.allUsers.map((user) => {
      return user.name;
    });
  },

  methods: {
    ...mapActions([
      "getAllIncidents",
      "getInventories",
      "getAllSuppliers",
      "getAllFacility",
      "getAllImpactedIssues",
      "createNewIncident",
      "createAttachment",
      "createAssignee",
      "createResponder",
      "getCreatorById",
      "getUsers",
    ]),
    close() {
      this.$emit("update:dialog", false);
    },
    // inputRule(value) {
    //   if (value.length === 40) {
    //     // this.disabled = true;
    //     return "What are you trying to do here?";
    //   } else {
    //     return true;
    //   }
    // },

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
        creatorId: localStorage.getItem("creatorId"),
        priority: this.getPriority(),
        subject: this.subject,
        description: this.description,
        severityLevel: this.severityLevel,
        severityDescription: this.severityDescription,
        impactLevel: this.impactLevel,
        impactDescription: this.impactDescription,
        state: this.state,
        referenceId: this.referenceId,
        deadline: this.deadline,
        type: this.type,
        reasonForCreation: this.reasonForCreation,
        category: this.category,
        escalationPolic: this.escalationPolic,
        impactFinancial: this.impactFinancial,
        impactOperational: this.impactOperational,
        recordStatus: this.record_status,
        impactedIssues: this.selectedImpactedIssueId
          ? [{ id: this.selectedImpactedIssueId, item: this.itemName }]
          : [],
      };
      await this.$axios
        .$post(`/incident-management/incident`, data)
        .then((response) => {
          console.log(response, "-----------------response");
          // Upload fiels
          if (this.files.length) {
            const formData = new FormData();
            for (let file of this.files) {
              formData.append("files", file, file.name);
            }
            formData.append("incidentId", response.id);
            this.createAttachment(formData);
            console.log(
              this.newAttachment,
              "newAttachmentnewAttachmentnewAttachment"
            );
          }
          if (
            !this.subject ||
            !this.description ||
            !this.impactedIssues ||
            !this.assignee
          ) {
            return;
          }
          this.createAssignee({
            incidentId: response.id,
            assigneeName: this.assignee,
          });
          this.createResponder({
            incidentId: response.id,
            responderName: this.responder,
          });
          this.$emit("update:dialog", false);
          this.getCreatorById({
            id: response.creatorId,
          });
          console.log(this.creator, "ghghghghg");
        })
        .catch((err) => {
          console.log(err, "llllll");
        });
      this.$router.push("/allIncidents");
    },

    getSubject(e) {
      this.subject = e;
    },
    getType(e) {
      this.type = e;
    },
    impactFinancialFun() {
      this.impactOperational = !this.impactFinancial;
    },
    subjectLength(e) {
      console.log(this.value, e.target);
    },
    impactLevelFun(e) {
      this.impactLevel = e;
    },
    handelImpact(impactValue) {
      this.impactLevel = impactValue;
    },
    handelSeverity(severityValue) {
      this.severityLevel = severityValue;
    },
    handelReason(reason) {
      this.reasonForCreation = reason;
    },
    saveAssignee(e) {
      this.assignee = e;
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
      console.log("validatevalidatevalidatevalidate", this.valid);
    },
  },
};
</script>
