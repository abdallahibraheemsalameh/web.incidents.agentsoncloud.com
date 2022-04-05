<template>
  <div>
    <allIncidents />
  </div>
</template>
<script>
import allIncidents from "./allIncidents";
export default {
  components: { allIncidents },
  name: "IndexPage",
  // mounted() {
  //   this.$router.push(`/allIncidents/3`);
  // },
};
</script>
