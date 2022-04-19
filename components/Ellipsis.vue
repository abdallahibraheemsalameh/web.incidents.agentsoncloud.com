<template #[`item.icon`]="">
  <div class="text-center">
    <v-menu top :offset-x="offset">
      <template v-slot:activator="{ on, attrs }">
        <v-icon v-bind="attrs" v-on="on">mdi-dots-vertical </v-icon>
      </template>

      <!-- Creator -->
      <v-list class="list" v-if="activeBtn === 'createdByMe'">
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
        <v-list-item>
          <v-list-item-title
            @click.stop="(showText = true), (state = 'On Hold')"
            >On hold</v-list-item-title
          >
          <StateAction
            v-if="showText"
            :dialogState.sync="showText"
            :state="state"
            :incidentId="itemProps.id"
            @getIncidents="getIncidents"
          />
        </v-list-item>
        <v-list-item>
          <v-list-item-title
            @click.stop="(showText = true), (state = 'Resolved (corrective)')"
            >Resolved (corrective)</v-list-item-title
          >
        </v-list-item>
        <v-list-item>
          <v-list-item-title
            @click.stop="(showText = true), (state = 'Closed (preventive)')"
            >Closed (preventive)</v-list-item-title
          >
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Testing from "../pages/testing.vue";
import updateIncident from "../pages/updateIncident.vue";
import StateAction from "./StateAction.vue";
export default {
  components: { updateIncident, Testing, StateAction },
  props: ["creatorIdProps", "incidentIdProps", "itemProps", "activeBtn"],

  data() {
    return {
      offset: true,
      recordStatua: "",
      dialog: false,
      userId: 0,
      userId: localStorage.getItem("userId"),
      showCreateForm: false,
      showText: false,
    };
  },
  computed: {
    ...mapGetters(["allIncident", "incidentState", "allIncidentsAssigneeToMe"]),
  },
  async mounted() {
    this.userId = localStorage.getItem("userId");
  },
  methods: {
    async getIncidents(value) {
      this.$emit("getIncidents");
    },
    ...mapActions(["incidentUpdated", "deleteIncident", "updateIncidentState"]),
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
