<template>
  <v-container>
    <v-btn :color="color"> {{ widget.title }}</v-btn>
  </v-container>
</template>

<script>
import { mqttBase } from "./mqttBase.js";

export default {
  name: "GridStatus",
  mixins: [mqttBase],
  props: {
    widget: {
      title: "",
      topics: [],
    },
  },
  data() {
    return { value: false, timeout: false, topic: "" };
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
    this.topic = this.widget.topics[0];
    this.mqttRegister(this, this.widget.topic);
  },
  created() {},
};
</script>

<style>
</style>