<template>
  <v-btn :color="color"> {{ widget.title }}</v-btn>
</template>

<script>
import { mqttBase } from "./mqttBase.js";

export default {
  name: "ItemStatus",
  mixins: [mqttBase],
  props: {
    widget: {
      title: "gpio2mqtt",
      units: "no Units",
      range: [true, false],
      topic: "src/gpio2mqtt/system/alive",
    },
  },
  data() {
    return { value: false, timeout: false };
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
  created() {
  },
};
</script>

<style>
</style>