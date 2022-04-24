<template>
  <v-dialog
    v-model="dialogIcone"
    width="500"
    persistent
    overlay-color="#ffffff"
    overlay-opacity="0.90"
  >
    <v-card class="pa-4">
      <div class="ml-4" v-if="!users || users.length === 0">
        {{ message }}
      </div>
      <h5 v-else>{{ title }}:</h5>
      <div v-for="(user, i) in userNames" :key="i">
        <div>{{ user }}</div>
      </div>
      <div class="d-flex justify-end">
        <v-btn @click="close"> close </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    users: {
      type: Array,
      default: [],
    },
    dialogIcone: {
      default: false,
    },
    activeBtn: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      userNames: [],
      message: "",
      title: "Responders",
    };
  },
  mounted() {
    this.usersByIncidentId();
  },
  methods: {
    usersByIncidentId() {
      if (!this.users.length) {
        this.message = `There is no ${
          this.activeBtn === "responder" ? "assignees" : "responders"
        } for this incident`;
        this.title =
          this.activeBtn === "responder" ? "Assignees" : "Responders";
      }
      console.log(
        "moooooo",
        this.activeBtn,
        this.users,
        this.activeBtn === "responder"
      );
      this.userNames = this.users.map((user) => {
        return user.name;
      });

      console.log("-assigneeNames", this.userNames);
    },
    close() {
      this.$emit("update:dialogIcone", false);
    },
  },
};
</script>

<style></style>
