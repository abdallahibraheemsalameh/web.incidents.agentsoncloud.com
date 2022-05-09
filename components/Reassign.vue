<template>
  <v-dialog
    v-model="dialogReassign"
    width="500"
    persistent
    overlay-color="#ffffff"
    overlay-opacity="0.90"
  >
    <v-card>
      <v-card-title>
        <div>
          Reassign
          <!-- {{ incident }} -->
        </div>
      </v-card-title>
      <v-row class="ml-1">
        <v-col>
          <v-select
            v-model="assignee"
            :items="allUsers"
            item-text="name"
            item-value="id"
            label="Add assignee"
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
                  v-text="String(data.item.name).slice(0, 1).toUpperCase()"
                ></v-avatar>
                {{ data.item.name }}
              </v-chip>
            </template>
          </v-select>
        </v-col>
        <v-col class="pa-7">
          <v-checkbox
            v-model="checkSecondaryAssignee"
            :label="`Assign the secondary assignee ${incident.secondaryAssignee}`"
          ></v-checkbox>
        </v-col>
      </v-row>
      <v-row class="ml-4">
        <div>You want update the deadline or not?</div>
      </v-row>
      <div class="ml-4">
        <div>
          <div v-if="datePicker">
            <v-date-picker
              v-model="updateDate"
              :min="new Date().toISOString().substr(0, 10)"
            ></v-date-picker>
            <div class="ml-16">
              <v-btn
                text
                color="primary"
                @click="(datePicker = false), (updateDate = null)"
              >
                Cancel
              </v-btn>
              <v-btn text color="primary" @click="datePicker = false">
                OK
              </v-btn>
            </div>
          </div>
          <v-text-field
            v-model="updateDate"
            label="Select date"
            prepend-icon="mdi-calendar"
            readonly
            @click="datePicker = true"
          ></v-text-field>
        </div>
        <div>
          <v-text-field
            v-model="updateTime"
            label="Select time"
            prepend-icon="mdi-clock-time-four-outline"
            readonly
            @click="timePicker = true"
          ></v-text-field>
          <div v-if="timePicker">
            <v-time-picker
              v-model="updateTime"
              ampm-in-title
              format="ampm"
            ></v-time-picker>
            <div class="ml-16">
              <v-btn
                text
                color="primary"
                @click="(timePicker = false), (updateTime = null)"
              >
                Cancel
              </v-btn>
              <v-btn text color="primary" @click="timePicker = false">
                OK
              </v-btn>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-end">
        <v-btn
          color="primary"
          class="text-capitalize"
          text
          @click="reassignFunction"
        >
          submit
        </v-btn>
        <v-btn
          color="primary"
          class="text-capitalize"
          text
          @click.native="cancel"
        >
          cancel
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: {
    dialogReassign: {
      type: Boolean,
      default: false,
    },
    incident: {
      type: Object,
      // default: 0,
    },
  },
  data() {
    return {
      checkSecondaryAssignee: false,
      updateTime: null,
      timePicker: false,
      updateDate: null,
      datePicker: false,
      assignee: [],
    };
  },
  computed: {
    ...mapGetters(["allUsers"]),
  },
  mounted() {
    this.assigneeIds();
    this.updateTime = this.incident.deadline
      ? this.incident.deadline.split("T")[1].split(".")[0]
      : null;
    this.updateDate = this.incident.deadline
      ? this.incident.deadline.split("T")[0]
      : null;
  },
  methods: {
    ...mapActions(["updateIncidentById"]),
    cancel() {
      this.$emit("update:dialogReassign", false);
    },
    reassignFunction() {
      if (this.checkSecondaryAssignee && this.incident.secondaryAssignee) {
        this.assignee.push(this.incident.secondaryAssignee);
      }
      const data = {
        deadline: this.deadlineFun(),
        assignee: this.assignee,
      };
      this.updateIncidentById({ id: this.incident.id, body: data });
    },
    deadlineFun() {
      if (this.updateDate == null || this.updateTime == null) {
        return null;
      }
      console.log(
        this.updateDate + " " + this.updateTime,
        ".................... "
      );
      return this.updateDate + " " + this.updateTime;
    },
    assigneeIds() {
      this.assignee = this.incident.assignees.map((assignee) => {
        return assignee.id;
      });
    },
  },
};
</script>

<style></style>
