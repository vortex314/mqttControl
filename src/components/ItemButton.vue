<template>
  <v-container @dblclick="this.$emit('dblclick')">
    <v-row color="success" @dblclick="this.$emit('dblclick')">
      <v-btn :color="color"> {{ widget.title }}</v-btn>
      <v-spacer @dblclick="this.$emit('dblclick')" />
      <v-btn color="success" @click="onOffTarget = true">ON</v-btn>
      <v-btn color="error" @click="onOffTarget = false">OFF</v-btn>
    </v-row>
  </v-container>
</template>

<script>
import { mqttBase } from "./mqttBase.js";

export default {
  mixins: [mqttBase],
  name: "ItemButton",
  props: {
    widget: {
      title: "no Title",
      units: "no Units",
      range: ["ON", "OFF"],
      topic: "no topic",
    },
  },
  data() {
    return {
      onOffTarget: false,
      value: true,
    };
  },
  computed: {
    color() {
      if (this.mqttExpired) return "grey";
      else if (this.value) return "success";
      else return "error";
    },
  },
  mounted() {
    // subscribe to src/
    setInterval(() => {
      this.onOffTarget = !this.onOffTarget;
    }, 5000);
  },
};
</script>

<style>
</style>