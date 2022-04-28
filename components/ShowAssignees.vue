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
    >
      <v-card class="pa-4">
        <div>Assignees:</div>
        <div v-for="(user, i) in assigneeNames" :key="i">
          <div>{{ user }}</div>
        </div>

        <div class="d-flex justify-end">
          <v-btn @click="dialogIcone = false"> close </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </span>
</template>

<script>
export default {
  props: {
    assignees: {
      type: Array,
      default: ["", ""],
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
      console.log(this.assignees, "this.assigneesthis.assignees");
      this.assigneeNames = this.assignees.map((assignee) => {
        return assignee.name;
      });

      console.log("-assigneeNames", this.assigneeNames);
    },
  },
};
</script>

<style></style>
