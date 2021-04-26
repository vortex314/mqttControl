<template>
  <v-container class="px-6 py-6">
    <v-row>
      <v-text-field label="Title" v-model="input.title" />
    </v-row>
    <v-row>
      <v-text-field label="Prefix" v-model="input.prefix" />
    </v-row>
    <v-row>
      <v-text-field label="Postfix" v-model="input.postfix" />
    </v-row>
  </v-container>
</template>

<script>
import { mqttBase } from "./mqttBase.js";

export default {
  name: "GridGaugeDialog",
  mixins: [mqttBase],
  data() {
    return {
      input: {
        title: "",
        prefix: "",
        postfix: "",
      },
    };
  },
  methods: {
  },
};
</script>

<style>
</style>