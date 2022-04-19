<template>
  <div>
    <!-- <allIncidents /> -->
    <incident-cards />
  </div>
</template>
<script>
import allIncidents from "./allIncidents";
import Navigation from "../components/Navigation.vue";
import IncidentCards from "./incidentCards.vue";
export default {
  layout: "dashboard",
  components: { allIncidents },
  name: "IndexPage",
  // mounted() {
  //   this.$router.push(`/allIncidents/3`);
  // },
};
</script>
