<template>
  <div>
    <v-icon @click.stop="showCard = true">mdi-alert </v-icon>
    <incident-cards v-if="showCard" />
  </div>
</template>

<script>
import incidentCards from "../pages/incidentCards.vue";
export default {
  components: { incidentCards },
  data() {
    return {
      showCard: false,
    };
  },
  methods: {},
};
</script>

<style>
.incidentManagement {
  text-transform: none;
}
</style>
