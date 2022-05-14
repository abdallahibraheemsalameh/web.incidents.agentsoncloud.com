<template>
  <v-card flat class="py-12">
    <v-card-text>
      <div @click="active = true" :color="color1">
        <p v-bind:class="{ class1: active == true }">goood</p>
      </div>
      <v-btn v-bind:class="{ class2: active == false }" :color="color2"
        >baad</v-btn
      >
      <v-btn color="indigo accent-2">baad</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      active: false,
    };
  },
};
</script>
<style>
.class1 {
  color: "red";
  /* "rgb(204, 202, 202)"; */
}
.class2 {
  color: "#89d5d2";
}
</style>
