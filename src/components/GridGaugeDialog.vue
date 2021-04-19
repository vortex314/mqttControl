<template>
  <div>

    <v-row><v-text-field label="Topic" v-model="input.topic" /></v-row>
    <v-row>
      <v-text-field label="Title" v-model="input.title" />
    </v-row>
    <v-row>
      <v-text-field label="Units" v-model="input.units" />
    </v-row>
    <v-row>
      <v-text-field label="Range" v-model="input.range" />
    </v-row>
  </div>
</template>

<script>
export default {
  name: "GridGaugeDialog",
  data() {
    return {
      input: {
        title: "no Title",
        units: "no Units",
        range: [0, 100],
        topic: "no topic",
      },
    };
  },
  methods: {}
};
</script>

<style>
</style>