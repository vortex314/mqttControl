<template>
  <v-container class="px-6 py-6">
    <v-row>
      <v-text-field label="Title" v-model="input.title" />
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      input: {
        title: "",
      },
    };
  },
};
</script>

<style>
</style>