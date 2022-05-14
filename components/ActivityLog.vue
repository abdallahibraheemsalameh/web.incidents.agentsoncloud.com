<template>
  <v-container>
    <div v-for="log in activityLog" :key="log.id" class="d-flex justify-center">
      <v-card width="800" class="cardLog pa-4 mx-6">
        <div
          class="pa-4"
          v-for="[key, value] in Object.entries(log.oldValue)"
          :key="key"
        >
          <v-row>
            <!-- <v-col> -->
            <v-avatar>
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                alt="John"
              />
            </v-avatar>
            <div class="pa-4">{{ userName }} updated</div>
            <div class="pa-4">{{ key }}</div>
            <div class="pa-4">on</div>

            <!-- </v-col> -->
            <!-- <v-col
              ><div>{{ userName }} updated</div>
            </v-col> -->
            <!-- <v-col>{{ key }}</v-col> -->
            <!-- <v-col>on</v-col> -->
            <!-- <v-col> -->
            <div class="Happened pa-4">
              {{ formatData(log.createdAt) }}
            </div>
            <!-- </v-col> -->
          </v-row>
          <v-row>
            <div class="d-flex">
              <div class="pa-4">
                {{ formatData(value) }}
              </div>

              <!-- <v-col class="mr-12"> -->
              <v-icon color="#2684ff" size="20"> mdi-arrow-right-bold</v-icon>
              <!-- </v-col> -->

              <div class="pa-4">{{ formatData(log.newValue[key]) }}</div>
            </div></v-row
          >
          <v-progress-linear
            height="1"
            value="100"
            color="rgb(117 117 117)"
            class="progress-linear py-4"
          ></v-progress-linear>
        </div>
      </v-card>
    </div>
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
    isValidDate(date) {
      if (!isNaN(date)) {
        return false;
      }
      return new Date(date) !== "Invalid Date" && !isNaN(new Date(date));
    },
    formatData(data) {
      if (this.isValidDate(data)) {
        return new Date(data).toLocaleString();
      }
      return data;
    },
  },
};
</script>

<style>
.Happened {
  color: #2684ff;
}
.cardLog {
  font-family: "Roboto";
}
</style>
