<template #[`item.icon`]="">
  <div class="text-center">
    <!-- <h2>{{ creatorIdProps }}</h2> -->
    <v-menu top :offset-x="offset">
      <template v-slot:activator="{ on, attrs }">
        <v-icon v-bind="attrs" v-on="on">mdi-dots-vertical </v-icon>
      </template>

      <!-- Creator -->
      <v-list class="list" v-if="creatorIdProps === Number(creatorId)">
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
        <v-list-item @change="onHold" @click="$emit('edit')">
          <v-list-item-title>On hold</v-list-item-title>
        </v-list-item>
        <v-list-item @change="resolved">
          <v-list-item-title>Resolved (corrective)</v-list-item-title>
        </v-list-item>
        <v-list-item @change="closed">
          <v-list-item-title>Closed (preventive)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import updateIncident from "../pages/updateIncident.vue";
console.log("-----------------------------------------elepsape");
export default {
  components: { updateIncident },
  props: ["creatorIdProps", "incidentIdProps", "itemProps"],

  data() {
    return {
      offset: true,
      recordStatua: "",
      dialog: false,
      creatorId: 0,
      items: ["new", "onHold"],
      userId: localStorage.getItem("userId"),
      showCreateForm: false,
    };
  },
  computed: {
    ...mapGetters(["allIncident", "incidentState", "allIncidentsAssigneeToMe"]),
  },
  async mounted() {
    this.creatorId = localStorage.getItem("userId");
    await this.updateIncidentState({ id: this.itemProps.id });
  },
  methods: {
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
    async onHold() {
      await this.updateIncidentState({
        id: this.itemProps.id,
        state: "On Hold",
      });
    },
    resolved() {
      this.updateIncidentState({
        id: this.itemProps.id,
        state: "Resolved (corrective)",
      });
      this.$router.push("/allIncidents");
    },
    closed() {
      this.updateIncidentState({
        id: this.itemProps.id,
        state: "Closed (preventive)",
      });
    },
    updateEscalationDuration() {
      // this.itemProps.escalationPolicy = "";
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
