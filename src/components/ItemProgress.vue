<template>
  <v-progress-linear v-model="value" height="25">
    <strong>{{ value }}</strong>
  </v-progress-linear>
</template>

<script>
import { mqttBase } from "./mqttBase.js";

export default {
  name: "ItemProgress",
  mixins: [mqttBase],
  props: {
    widget: {
      title: "current",
      units: "no Units",
      range: [0, 1000],
      topic: "src/triac/triac/current",
    },
  },
  data() {
    return { value: 0, timeout: false };
  },
  methods: {
    onMqttMessage(topic, variant) {
      if (topic == this.widget.topic) {
        this.mqtt.watchdogReset();
        console.log(topic, variant);
        this.value = variant;
      }
    },
  },
  computed: {
    color() {
      if (this.mqtt.expired) return "grey";
      else if (this.value) return "success";
      else return "error";
    },
  },
  mounted() {
    this.mqttRegister(this, this.widget.topic);
  },
  created() {},
};
</script>

<style>
</style>