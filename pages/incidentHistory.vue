<template>
  <v-card>
    <div class="create">Incident History</div>

    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="incidentHistory" :search="search">
      <template v-slot:[`item.deadline`]="{ item }">
        {{ item.deadline ? item.deadline.split("T")[0] : "" }} at
        {{ item.deadline ? item.deadline.split("T")[1].split(".")[0] : "" }}
      </template>
      <template v-slot:[`item.escalationPolicy`]="{ item }">
        Update each
        {{ item.escalationPolicy ? item.escalationPolicy.split(":")[1] : "" }}
        m
      </template>
      <template v-slot:[`item.impactedIssues`]="{ item }">
        <div
          v-for="impactedIssue in item.ImpactedIssues"
          :key="impactedIssue.id"
        >
          {{ impactedIssue.name }}/
          {{ impactedIssue.IncidentImpactedIssue.item }}
        </div>
      </template>
      <template v-slot:[`item.creatorId`]>
        {{}}
      </template>
      <template v-slot:[`item.createdAt`]="{ item }">
        {{ item.createdAt ? item.createdAt.split("T")[0] : "" }} at
        {{ item.createdAt ? item.createdAt.split("T")[1].split(".")[0] : "" }}
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Incident subject",
          align: "start",
          value: "subject",
        },
        { text: "Impacted issue", value: "impactedIssues" },
        { text: "Creator", value: "creatorId" },
        // { text: "Assignee", value: "assignee" },
        { text: "Date creation and time", value: "createdAt" },
        { text: "priority", value: "priority" },
        { text: "state", value: "state" },
        { text: "Deadline", value: "deadline" },
        { text: "Escalation policy", value: "escalationPolicy" },
        { text: "responders", value: "responderId" },
        { text: "", value: "icon" },
      ],
      userId: null,
    };
  },
  computed: {
    ...mapGetters(["incidentHistory", "creator"]),
  },

  mounted() {
    this.getIncidentHistory();
    this.userId = localStorage.getItem("userId");
    this.getCreatorById(this.userId);
  },
  methods: {
    ...mapActions(["getIncidentHistory", "getCreatorById"]),
  },
};
</script>
<style scoped></style>
