<template>
  <span :color="color"> {{ prefix }}{{ value }}{{ postfix }}</span>
</template>

<script>
import { mqttBase } from "./mqttBase.js";

export default {
  name: "GridText",
  mixins: [mqttBase],
  props: {
    widget: {
      title: "gpio2mqtt",
      postfix: "",
      prefix: "",
      topic: "src/wiring/system/cpu",
    },
  },
  data() {
    return { value: "", timeout: false };
  },
  methods: {
    onMqttMessage(topic, variant) {
      if (topic == this.widget.topic) {
        this.mqtt.watchdogReset();
        console.log(topic, variant);
        this.value = JSON.stringify(variant);
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