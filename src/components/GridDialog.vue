<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent max-width="600px" dense>
      <v-card>
        <v-card-title>
          <span class="headline">MQTT widget</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-select
                :items="items"
                label="Widget Type"
                v-model="selectedType"
              />
            </v-row>
            <grid-gauge-dialog v-if="selectedType == 'gauge'" ref="child" />
            <grid-text-dialog v-if="selectedType == 'text'" ref="child" />
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="cancel"> Cancel </v-btn>
          <v-btn color="blue darken-1" text @click="add"> Add </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import GridGaugeDialog from "./GridGaugeDialog";
import GridTextDialog from "./GridTextDialog"

export default {
  name: "GridDialog",
  components: {
    GridGaugeDialog,
    GridTextDialog,
  },
  props: {
    value: Boolean,
  },
  data() {
    return {
      items: [
        "gauge",
        "compass",
        "linePlot",
        "status",
        "button",
        "text",
        "table",
      ],
      selectedType: "gauge",
    };
  },
  methods: {
    cancel() {
      console.log(this.$refs.child.$data.input);

      this.show = false;
    },
    add() {
      this.show = false;
    },
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