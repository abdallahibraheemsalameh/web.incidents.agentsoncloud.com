<template>
  <v-row class="my-0 mx-0">
    <v-col class="py-0 px-1" cols="6">
      <v-select
        :items="allImpactedIssues"
        v-model="issue"
        item-text="name"
        item-value="id"
        return-object
        dense
        label="impacted issue"
        @change="selectionImpactedIssue()"
      ></v-select>
    </v-col>
    <v-col class="py-0 px-1" cols="6">
      <v-autocomplete
        :items="itemNames"
        v-model="item"
        dense
        label="Search"
        @change="setItemName"
      ></v-autocomplete>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["issueId", "issueName", "itemName"],
  data() {
    return {
      selectedImpactedIssueId: null,
      itemList: [],
      issue: { id: this.issueId },
      itemNames: [],
      item: null,
    };
  },
  computed: {
    ...mapGetters([
      "allImpactedIssues",
      "allInventories",
      "allFacilities",
      "allSuppliers",
    ]),
  },
  async mounted() {
    this.issue = { id: this.issueId, name: this.issueName };
    this.item = this.itemName;
    this.selectionImpactedIssue(this.issue);
  },

  methods: {
    selectionImpactedIssue() {
      const { name, id } = this.issue;
      if (!id) {
        return;
      }
      this.selectedImpactedIssueId = id;
      const itemsLists = {
        Facilities: this.allFacilities,
        Suppliers: this.allSuppliers,
        "Inventory item": this.allInventories,
        "Consumer profile": this.allUsers,
        Appointment: this.allSuppliers,
        "Users profiles": this.allUsers,
      };
      this.itemList = itemsLists[name] || [];
      this.itemNames = this.itemList.map((item) => {
        return item.name;
      });
    },

    setItemName() {
      console.log(this.itemName, this.issueId);
      this.$emit("setIssueAndItem", this.selectedImpactedIssueId, this.item);
    },
  },
};
</script>
