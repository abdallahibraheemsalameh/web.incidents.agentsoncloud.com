<template>
  <span>
    <v-icon @click="respondersByIncidentId(), (dialogIcone = true)"
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
      <v-card v-if="!massage">
        <v-list-item-title class="ml-4">
          those are assignees in this incident
        </v-list-item-title>

        <div v-for="(user, i) in responderNames" :key="i">
          <v-list-item-subtitle>{{ user }}</v-list-item-subtitle>
        </div>

        <v-btn color="primary" text @click="dialogIcone = false"> close </v-btn>
      </v-card>
      <div v-else>
        <div>
          {{ massage }}
        </div>
        <div class="buttonClose">
          <v-btn color="primary" text @click="dialogIcone = false" class="mr-5">
            close
          </v-btn>
        </div>
      </div>
    </v-dialog>
  </span>
</template>

<script>
export default {
  props: {
    responders: {
      type: Array,
      default: ["responders"],
    },
    // massage: {
    //   type: String,
    //   default: "",
    // },
  },
  data() {
    return {
      dialogIcone: false,
      responderNames: [],
      massage: "",
    };
  },
  methods: {
    respondersByIncidentId() {
      if (!this.responders.length) {
        this.massage = "There is no assignee at this incident";
      }
      console.log(this.responders, "arrayarrayarrayarray");
      this.responderNames = this.responders.map((responder) => {
        return responder.name;
      });

      console.log("-assigneeNames", this.responderNames);
    },
  },
};
</script>

<style>
.buttonClose {
  display: flex;
  justify-content: end;
}
</style>
