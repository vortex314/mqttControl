<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">MQTT widget</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-select :items="items" label="Widget Type"></v-select>
              </v-col>
            </v-row>
            <v-row><v-text-field label="Topic" /></v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="show = false">
            Cancel
          </v-btn>
          <v-btn color="blue darken-1" text @click="show = false"> Add </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "GridDialog",
  props: {
    value: Boolean,
  },
  data() {
    return {
      items: ["gauge", "compass", "linePlot", "status", "button", "text"],
    };
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(newVal) {
        this.$emit("input", newVal);
      },
    },
  },
};
</script>

<style>
</style>