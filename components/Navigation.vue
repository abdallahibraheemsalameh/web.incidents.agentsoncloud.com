<template>
  <div>
    <v-btn color="primary" elevation="2" @click="goToIncidentDrawer"
      >Incident management</v-btn
    >
  </div>
</template>

<script>
export default {
  methods: {
    goToIncidentDrawer() {
      this.$router.push(`/incidentCards`);
    },
  },
};
</script>

<style></style>
