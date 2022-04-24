<template>
  <div>
    <!-- <allIncidents /> -->
    <allIncidents />
  </div>
</template>
<script>
import allIncidents from "./allIncidents";

export default {
  layout: "dashboard",
  components: { allIncidents },
  name: "IndexPage",
  // mounted() {
  //   this.$router.push(`/allIncidents/3`);
  // },
};
</script>
