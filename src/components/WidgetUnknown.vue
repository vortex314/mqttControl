<template>
  <v-container>
    <v-select :items="items" label="Widget Type" v-model="selectedType" />
    <v-btn color="blue darken-1" text @click="cancelled"> Cancel </v-btn>
    <v-btn color="blue darken-1" text @click="changeWidgetType"> Update </v-btn>
  </v-container>
</template>

<script>
export default {
  props: {
    widget: {
      type: Object,
      default() {
        return "none";
      },
    },
  },
  data() {
    return {
      items: [
        "none",
        "gauge",
        "compass",
        "linePlot",
        "status",
        "button",
        "text",
        "table",
      ],
      selectedType: "text",
    };
  },
  methods: {
    changeWidgetType() {
      this.$emit("widgetType",this.selectedType)
    },
  },
};
</script>

<style>
</style>