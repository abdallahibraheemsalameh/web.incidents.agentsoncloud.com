<template>
  <v-container fluid>
    <v-icon :items="items" label="Standard"
      >mdi-eye-outline

      <!-- <v-select :items="items" label="Standard"></v-select> -->
    </v-icon>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    items: ["Foo", "Bar", "Fizz", "Buzz"],
  }),
};
</script>
