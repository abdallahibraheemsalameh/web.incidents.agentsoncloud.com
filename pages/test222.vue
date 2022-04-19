<template>
  <v-container fluid>
    <v-select v-model="assignee" :items="items" label="Select Item" multiple>
      <v-chip v-for="(user, i) in assignee" :key="i">
        {{ user }}
      </v-chip>
    </v-select>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    items: ["foo", "bar", "fizz", "buzz", "fizzbuzz", "foobar"],
    value: ["foo", "bar", "fizz"],
    assignee: [],
  }),
  mounted() {
    this.assignee = ["lll", "jjj"];
  },
};
</script>
