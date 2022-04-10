<template>
  <div>
    <allIncidents />
    <Navigation />
  </div>
</template>
<script>
import allIncidents from "./allIncidents";
import Navigation from "../components/Navigation.vue";
export default {
  components: { allIncidents, Navigation },
  name: "IndexPage",
  // mounted() {
  //   this.$router.push(`/allIncidents/3`);
  // },
};
</script>
