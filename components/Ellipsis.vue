<template #[`item.icon`]="">
  <div class="text-center">
    <v-menu top :offset-x="offset" ref="menu">
      <template v-slot:activator="{ on, attrs }">
        <v-icon v-bind="attrs" v-on="on" color="#3daea3"
          >mdi-dots-vertical
        </v-icon>
        <!-- <v-icon v-bind="attrs" v-on="on" color="#3daea3">mdi-dots-vertical </v-icon> -->
      </template>
      <!-- Creator -->
      <v-list class="list" v-if="activeBtn === 'createdByMe'">
        <v-list-item>
          <v-list-item-title
            ><div
              @click.stop="
                (showCreateForm = true), ($refs.menu.isActive = false)
              "
            >
              Update

              <update-incident
                v-if="showCreateForm"
                :dialog.sync="showCreateForm"
                :incidentId="incidentIdProps"
                @getIncidents="getIncidents"
              />
            </div>
          </v-list-item-title>
        </v-list-item>
        <v-list-item
          @click.stop="
            (incidentId = incidentIdProps),
              (showDialogComment = true),
              ($refs.menu.isActive = false)
          "
        >
          <v-list-item-title>Add comment</v-list-item-title>
        </v-list-item>
        <v-list-item @change="deleteIncidentFun">
          <v-list-item-title>Delete</v-list-item-title>
        </v-list-item>
        <v-list-item
          @click.stop="
            (showDialogReassin = true), ($refs.menu.isActive = false)
          "
        >
          <v-list-item-title>Reassign</v-list-item-title>
        </v-list-item>
      </v-list>
      <IncidentDetails
        v-if="incidentId == incidentIdProps"
        :dialogDetails.sync="showDetailsIncident"
        :incidentId="incidentIdProps"
        :activeBtn="activeBtn"
      />

      <Reassign
        v-if="itemProps.id == incidentIdProps && showDialogReassin"
        :dialogReassign.sync="showDialogReassin"
        :incident="itemProps"
        @getIncidents="getIncidents"
      />
      <v-dialog
        v-model="showDialogComment"
        light
        persistent
        overlay-color="rgb(255 255 255)"
        overlay-opacity="0.90"
        width="70%"
      >
        <Comments
          v-if="showDialogComment"
          :id="incidentIdProps.toString()"
          type="incident"
          :taskCreator="itemProps.creatorId"
          :userId="userId"
          userName="name"
        />
        <div class="d-flex justify-end mr-8">
          <v-btn class="pa-4 ma-4 text-capitalize" @click.native="close">
            Close
          </v-btn>
        </div>
      </v-dialog>
      <!-- Others -->
      <v-list class="list" v-if="activeBtn !== 'createdByMe'">
        <v-list-item
          @click.stop="
            (incidentId = incidentIdProps),
              (showDialogComment = true),
              ($refs.menu.isActive = false)
          "
        >
          <v-list-item-title>Add comment</v-list-item-title>
        </v-list-item>
        <v-list-item
          @click.stop="
            (showText = true),
              (state = 'In Progress'),
              ($refs.menu.isActive = false)
          "
        >
          <v-list-item-title>In progress</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title
            @click.stop="
              (showText = true),
                (state = 'On Hold'),
                ($refs.menu.isActive = false)
            "
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
            @click.stop="
              (showText = true),
                (state = 'Resolved'),
                ($refs.menu.isActive = false)
            "
            >Resolved (corrective)</v-list-item-title
          >
        </v-list-item>
        <v-list-item>
          <v-list-item-title
            @click.stop="
              (showText = true),
                (state = 'Closed'),
                ($refs.menu.isActive = false)
            "
            >Closed (preventive)</v-list-item-title
          >
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import updateIncident from "../pages/updateIncident.vue";
import Reassign from "./Reassign.vue";
import StateAction from "./StateAction.vue";
export default {
  components: { updateIncident, StateAction, Reassign },
  props: ["creatorIdProps", "incidentIdProps", "itemProps", "activeBtn"],

  data() {
    return {
      offset: true,
      recordStatua: "",
      dialog: false,
      // userId: 0,
      userId: +localStorage.getItem("userId"),
      showCreateForm: false,
      showText: false,
      showDetailsIncident: false,
      incidentId: null,
      showList: false,
      showDialogComment: false,
      showDialogReassin: false,
    };
  },
  computed: {
    ...mapGetters(["allIncident", "incidentState", "allIncidentsAssigneeToMe"]),
  },
  async mounted() {
    this.userId = +localStorage.getItem("userId");
  },
  methods: {
    async getIncidents(value) {
      this.$emit("getIncidents");
    },
    ...mapActions(["incidentUpdated", "deleteIncident", "updateIncidentState"]),
    deleteIncidentFun() {
      this.deleteIncident(this.itemProps.id);
    },
    close() {
      this.showDialogComment = false;
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
