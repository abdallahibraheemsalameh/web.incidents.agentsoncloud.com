<template>
  <v-container>
    <div v-for="log in activityLog" :key="log.id">
      <v-card class="pa-4 mx-6">
        <div
          class="pa-4"
          v-for="(value, index) in Object.entries(log.oldValue)"
          :key="index"
        >
          <v-row v-if="value[0] !== 'updatedAt'">
            <v-col
              ><div>{{ userName }} Change</div>
            </v-col>
            <v-col>{{ value[0] }}</v-col>
            <v-col v-if="value[0] == 'deadline' || value[0] == 'happeningTime'"
              >{{ value[1] ? value[1].split("T")[0] : "" }} At
              {{ value[1] ? value[1].split("T")[1].split(".")[0] : "" }}</v-col
            >
            <v-col v-else>{{ value[1] }}</v-col>
            <v-col>
              <v-icon large color="#2684ff" size="400">
                mdi-arrow-right-bold</v-icon
              ></v-col
            >
            <v-col v-if="value[0] == 'deadline' || value[0] == 'happeningTime'">
              {{ value[1] ? value[1].split("T")[0] : "" }} At
              {{ value[1] ? value[1].split("T")[1].split(".")[0] : "" }}
              <!-- <div
                v-for="(value, index) in Object.entries(log.oldValue)"
                :key="index"
              >
                <v-col v-if="">
                  {{ value[1] }}
                </v-col>
              </div> -->
            </v-col>
            <v-col v-else>{{ value[1] }} </v-col>
            <v-col>
              Happened on
              <div class="Happened">
                {{ log.createdAt ? log.createdAt.split("T")[0] : "" }} At
                {{
                  log.createdAt ? log.createdAt.split("T")[1].split(".")[0] : ""
                }}
              </div>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </div>

    <!-- <v-data-table
      :headers="headers"
      :items="activityLog"
      :search="search"
      show-expand
      single-expand
    >
      <template v-slot:[`item.oldValue`]="{ item }">
        <div
          v-for="(value, index) in Object.entries(item.oldValue)"
          :key="index"
        >
          {{ value[1] }}
        </div>
      </template>
      <template v-slot:[`item.record`]="{ item }">
        <div
          v-for="(value, index) in Object.entries(item.oldValue)"
          :key="index"
        >
          {{ value[0] }}
        </div>
      </template>
      <template v-slot:[`item.newValue`]="{ item }">
        <div
          v-for="(value, index) in Object.entries(item.newValue)"
          :key="index"
        >
          {{ value[1] }}
        </div>
      </template>
      <template v-slot:[`item.userId`]>
        {{ allUsersNameById[userId] }}
      </template>
    </v-data-table> -->
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["incidentId", "userName"],
  data() {
    return {
      change: "",
      beforeChange: "",
      incidentBeforeUpdate: {},
      incidentAfterUpdate: {},
      headers: [
        {
          text: "record",
          align: "start",
          value: "record",
        },
        { text: "old value", value: "oldValue" },
        { text: "new value", value: "newValue" },
        { text: "user name", value: "userId" },
      ],
      search: "",
    };
  },
  computed: {
    ...mapGetters(["activityLog", "allUsers"]),
  },
  async mounted() {
    await this.getActivityLog(this.incidentId);
    this.userId = +localStorage.getItem("userId");
    // this.userNameById();
  },

  methods: {
    ...mapActions(["getActivityLog"]),
    close() {
      this.$emit("update:dialog", false);
    },
  },
};
</script>

<style>
.Happened {
  color: #2684ff;
}
</style>
