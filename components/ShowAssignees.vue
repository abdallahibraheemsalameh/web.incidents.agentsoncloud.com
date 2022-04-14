<template>
  <span>
    <v-icon @click="assigneesByIncidentId(), (dialogIcone = true)"
      >mdi-eye-outline
    </v-icon>
    <v-dialog
      v-model="dialogIcone"
      width="500"
      persistent
      overlay-color="#ffffff"
      overlay-opacity="0.90"
      max-width="600px"
    >
      <v-card>
        <v-list-item-title>
          those are assignees in this incident
        </v-list-item-title>
        <div v-for="(user, i) in assigneeNames" :key="i">
          <v-list-item-subtitle>{{ user }}</v-list-item-subtitle>
        </div>

        <v-btn color="primary" text @click="dialogIcone = false"> close </v-btn>
      </v-card>
    </v-dialog>
  </span>
</template>

<script>
export default {
  props: {
    assignees: {
      type: Array,
      default: ["assignees"],
    },
  },
  data() {
    return {
      dialogIcone: false,
      assigneeNames: [],
    };
  },
  methods: {
    assigneesByIncidentId() {
      this.assigneeNames = this.assignees.map((assignee) => {
        return assignee.name;
      });

      console.log("-assigneeNames", this.assigneeNames);
    },
  },
};
</script>

<style></style>
