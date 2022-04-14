<template>
  <v-container>
    <div>
      <v-data-table
        :headers="headers"
        :items="activityLog"
        :search="search"
        show-expand
        single-expand
      >
        <template v-slot:[`item.oldValue`]="{ item }">
          <div
            v-for="(value, index) in Object.entries(item.oldValue)"
            :key="index"
          >
            {{ value[1] }}
          </div>
        </template>
        <template v-slot:[`item.record`]="{ item }">
          <div
            v-for="(value, index) in Object.entries(item.oldValue)"
            :key="index"
          >
            {{ value[0] }}
          </div>
        </template>
        <template v-slot:[`item.newValue`]="{ item }">
          <div
            v-for="(value, index) in Object.entries(item.newValue)"
            :key="index"
          >
            {{ value[1] }}
          </div>
        </template>
      </v-data-table>
      <!-- {{ activityLog }} -->
      <v-icon x-large color="rgb(148 148 148)" size="400">
        mdi-arrow-right</v-icon
      >
    </div>
  </v-container>
</template>
<script>

import { mapGetters, mapActions } from "vuex";
export default {
  props: ["dialog"],
  data() {
    return {
      incidentId: null,
      change: "",
      beforeChange: "",
      incidentBeforeUpdate: {},
      incidentAfterUpdate: {},
      headers: [
        {
          text: "record",
          align: "start",
          value: "record",
        },
        { text: "old value", value: "oldValue" },
        { text: "new value", value: "newValue" },
        { text: "user name", value: "userId" },
      ],
      search: "",
    };
  },
  computed: {
    ...mapGetters(["activityLog"]),
  },
  async mounted() {
    this.incidentId = await this.$route.query.incidentId;

    await this.getActivityLog(this.incidentId);
  },

  methods: {
    ...mapActions(["getActivityLog"]),
    close() {
      this.$emit("update:dialog", false);
    },
  },
};
</script>

<style scoped></style>
