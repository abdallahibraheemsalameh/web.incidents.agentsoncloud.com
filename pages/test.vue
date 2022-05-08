<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Open Dialog
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  :rules="nameRules"
                  label="Legal first name*"
                  required
                  v-model="form.name"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  :rules="middelName"
                  v-model="form.middelName"
                  label="Legal middle name"
                  hint="example of helper text only on focus"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  :rules="lastname"
                  label="Legal last name*"
                  hint="example of persistent helper text"
                  persistent-hint
                  v-model="form.lastname"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Email*"
                  required
                  v-model="form.Email"
                  :rules="EmailRule"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="btn-close" text @click="dialog = false"> Close </v-btn>
          <v-btn
            class="btn-save"
            text
            :disabled="
              form.name == '' ||
              form.Email == '' ||
              form.lastname == '' ||
              form.middelName == ''
            "
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

// vue script
<script>
export default {
  data: () => ({
    dialog: false,
    form: {
      name: "",
      middelName: "",
      lastname: "",
      Email: "",
    },
    lastname: [(v) => !!v || "This field is required"],
    middelName: [(v) => !!v || "This field is required"],
    nameRules: [(v) => !!v || "This field is required"],
    EmailRule: [(v) => !!v || "E-mail is required"],
  }),
};
</script>

<style scoped>
.btn-close {
  color: gray !important;
}

.btn-save:enabled {
  background-color: #1976d2 !important;
  color: #fff;
}

.btn-save:disabled {
  background-color: #e0e0e0 !important;
  color: #a6a6a6 !important;
}
</style>
