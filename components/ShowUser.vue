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
        {{ message }}{{ howShow }}
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
    howShow: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      userNames: [],
      message: "",
      title: "Reporters",
    };
  },
  mounted() {
    this.usersByIncidentId();
  },
  methods: {
    usersByIncidentId() {
      console.log(
        this.users,
        "kk",
        this.howShow,
        "this.usersthis.usersthis.userswwwwwwwwwwwwwwww"
      );
      if (!this.users.length) {
        this.message = `There is no ${
          this.activeBtn === "createdByMe" && this.howShow == "assignee"
            ? "assignees"
            : "Reporters"
        } for this incident`;
        this.message = `There is no ${
          this.activeBtn === "reporter" ? "assignees" : "Reporters"
        } for this incident`;
      }

      this.title = this.activeBtn === "reporter" ? "Assignees" : "Reporters";

      console.log(
        "moooooo",
        this.activeBtn,
        this.users,
        this.activeBtn === "reporter"
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
