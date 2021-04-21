<template>
  <div>
    <v-row>
      <v-select
        :items="Array.from(mqtt.MQTT.topics).sort()"
        label="Topic"
        v-model="input.topic"
      />
    </v-row>

    <v-row>
      <v-text-field label="Title" v-model="input.title" />
    </v-row>
    <v-row>
      <v-text-field label="Prefix" v-model="input.prefix" />
    </v-row>
    <v-row>
      <v-text-field label="Postfix" v-model="input.postfix" />
    </v-row>
  </div>
</template>

<script>
import { mqttBase } from "./mqttBase.js";

export default {
  name: "GridGaugeDialog",
  mixins: [mqttBase],
  data() {
    return {
      input: {
        title: "no Title",
        prefix: "",
        postfix: "",
        topic: "no topic",
      },
    };
  },
  methods: {
    cancel() {
      console.log("cancel pressed");
      this.$emit("end");
    },
    add() {
      console.log("add pressed");
      this.$emit("end");
    },
  },
};
</script>

<style>
</style>