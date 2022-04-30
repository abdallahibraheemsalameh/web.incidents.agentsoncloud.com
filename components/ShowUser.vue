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
        There is no {{ userDialogTitle.toLowerCase() }} for this incident.
      </div>
      <h5 v-else class="text-center">{{ userDialogTitle }}</h5>
      <div class="pa-4" v-for="(user, i) in userNames" :key="i">
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
    userDialogTitle: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      userNames: [],
      title: "Reporters",
    };
  },
  mounted() {
    this.usersByIncidentId();
  },
  methods: {
    usersByIncidentId() {
      this.userNames = this.users.map((user) => {
        return user.name;
      });
    },
    close() {
      this.$emit("update:dialogIcone", false);
    },
  },
};
</script>

<style></style>
