<template>
  <v-container>
    <v-row v-for="topic in widget.topics" v-bind:key="topic">
      <span :color="color">
        {{ widget.prefix }}{{ values[topic] }}{{ widget.postfix }}</span
      >
    </v-row>
  </v-container>
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
      topics: [],
    },
    topic: null,
  },
  data() {
    return {
      values: {},
      timeout: false,
    };
  },
  methods: {
    onMqttMessage(topic, variant) {
      if (
        this.widget.topics.find((str) => {
          return str == topic;
        })
      ) {
        this.mqtt.watchdogReset();
        console.log(topic, variant);
        this.values[topic] = JSON.stringify(variant);
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
    console.log(" mounted Gridtext ")
    for (let topic of this.widget.topics) this.mqttRegister(this, topic);
  },
  created() {},
};
</script>

<style>
</style>