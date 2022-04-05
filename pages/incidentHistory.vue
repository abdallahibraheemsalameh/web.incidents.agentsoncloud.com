<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="incidentHistory"
      :search="search"
    ></v-data-table>
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
        // { text: "Impacted issue", value: "calories" },
        { text: "Creator", class: "crete", value: "creatorId" },
        { text: "Date creation and time", value: "createdAt" },
        { text: "priority", value: "priority" },
        { text: "state", value: "state" },
        { text: "Deadline", value: "deadline" },
        // { text: "category", value: "category" },
        { text: "Escalation policy", value: "escalationPolicy" },
        { text: "responders", value: "responderId" },
        { text: "", value: "icon" },
      ],
    };
  },
  computed: {
    ...mapGetters(["incidentHistory"]),
  },

  mounted() {
    this.getIncidentHistory();
  },
  methods: {
    ...mapActions(["getIncidentHistory"]),
  },
};
</script>
<style scoped></style>
