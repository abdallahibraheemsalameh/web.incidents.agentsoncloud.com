<template #[`item.icon`]="">
  <div class="text-center">
    <v-menu top :offset-x="offset">
      <template v-slot:activator="{ on, attrs }">
        <v-icon v-bind="attrs" v-on="on">mdi-dots-vertical </v-icon>
      </template>

      <!-- Creator -->
      <v-list class="list" v-if="creatorIdProps === Number(userId)">
        <v-list-item>
          <v-list-item-title
            ><div @click.stop="showCreateForm = true">
              Update

              <update-incident
                v-if="showCreateForm"
                :dialog.sync="showCreateForm"
                :incidentId="incidentIdProps"
              />
            </div>
          </v-list-item-title>
        </v-list-item>
        <v-list-item @change="addComment">
          <v-list-item-title>Add comment</v-list-item-title>
        </v-list-item>
        <v-list-item @change="deleteIncidentFun">
          <v-list-item-title>Delete</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Reassign</v-list-item-title>
        </v-list-item>
      </v-list>

      <!-- Others -->
      <v-list class="list" v-else>
        <v-list-item @change="addComment">
          <v-list-item-title>Add comment</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>update escalation duration</v-list-item-title>
        </v-list-item>
        <v-list-item @change="stateValue('On Hold')">
          <v-list-item-title>On hold</v-list-item-title>
        </v-list-item>
        <v-list-item @change="stateValue('Resolved (corrective)')">
          <v-list-item-title>Resolved (corrective)</v-list-item-title>
        </v-list-item>
        <v-list-item @change="stateValue('Closed (preventive)')">
          <v-list-item-title>Closed (preventive)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import updateIncident from "../pages/updateIncident.vue";
export default {
  components: { updateIncident },
  props: ["creatorIdProps", "incidentIdProps", "itemProps"],

  data() {
    return {
      offset: true,
      recordStatua: "",
      dialog: false,
      userId: 0,
      userId: localStorage.getItem("userId"),
      showCreateForm: false,
    };
  },
  computed: {
    ...mapGetters(["allIncident", "incidentState", "allIncidentsAssigneeToMe"]),
  },
  async mounted() {
    this.userId = localStorage.getItem("userId");
    await this.updateIncidentState({ id: this.itemProps.id });
  },
  methods: {
    async stateValue(value) {
      await this.updateIncidentState({
        id: this.itemProps.id,
        state: value,
      });
      this.$emit("getIncidents");
    },
    ...mapActions([
      "incidentUpdated",
      "deleteIncident",
      "updateIncidentState",
      "getIncidentsCreatedByMe",
      "getIncidentByAssigneeToMe",
    ]),
    deleteIncidentFun() {
      this.deleteIncident(this.itemProps.id);
    },

    addComment() {
      this.$router.push(`/incidentDetails?incidentId=${this.incidentIdProps}`);
      console.log(this.itemProps, "cooooooo");
    },
  },
};
</script>

<style>
.poin {
  cursor: default;
}
.list {
  cursor: pointer;
}
</style>
