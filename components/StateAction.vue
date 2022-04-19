<template>
  <span>
    <v-dialog
      v-model="dialogState"
      width="500"
      persistent
      overlay-color="#8c8c8c"
      overlay-opacity="0.90"
      max-width="600px"
    >
      <v-card>
        <v-list-item-title class="pa-4">
          why do you want to update state to {{ state }}
        </v-list-item-title>

        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            label="Reason"
            background-color="#ffffff"
            name="input-7-1"
            v-model="actionText"
            :rules="textRules"
            value=""
            height="35"
            required
            class="pa-4"
          ></v-text-field>
        </v-form>

        <v-btn color="primary" text @click="updateState()"> submit </v-btn>
        <v-btn color="primary" text @click="cancel"> cancel </v-btn>
      </v-card>
    </v-dialog>
  </span>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    dialogState: {
      type: Boolean,
      default: false,
    },
    state: {
      type: String,
      default: "",
    },
    incidentId: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      actionText: "",
      textRules: [(value) => !!value || "Text is required"],
      valid: false,
    };
  },
  methods: {
    ...mapActions(["updateIncidentState"]),
    async updateState() {
      console.log(this.$refs.form.validate());
      if (!this.actionText) {
        return;
      }
      console.log(this.state, this.actionText, this.incidentId);
      await this.updateIncidentState({
        id: this.incidentId,
        state: this.state,
        actionText: this.actionText,
      });
      this.$emit("update:dialogState", false);
      this.$emit("getIncidents");
      // this.$refs.form.validate();
    },
    cancel() {
      this.$emit("update:dialogState", false);
    },
    //   async stateValue(value) {

    //   this.$emit("getIncidents");
    // },
  },
};
</script>

<style></style>
