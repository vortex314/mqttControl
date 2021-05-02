<template>
  <v-container py-0 px-0 @contextmenu="rightClick($event)">
    <span>
      {{ params.title }}{{ params.prefix }}{{ value }}{{ params.postfix }}
    </span>
    <v-dialog v-model="dialog" persistent max-width="600px" dense>
      <v-card class="px-6 py-6">
        <v-row>
          <v-text-field label="Topic" v-model="params.topic" />
        </v-row>
        <mqtt-tree @topic="updateTopic" />
        <v-row>
          <v-text-field label="Title" v-model="params.title" />
        </v-row>
        <v-row>
          <v-text-field label="Prefix" v-model="params.prefix" />
        </v-row>
        <v-row>
          <v-text-field label="Postfix" v-model="params.postfix" />
        </v-row>
        <v-spacer />
        <v-btn color="blue darken-1" text @click="cancel"> Cancel </v-btn>
        <v-btn color="blue darken-1" text @click="updateWidget"> Update </v-btn>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mqttBase } from "./mqttBase.js";
import MqttTree from "./MqttTree";

export default {
  name: "GridText",
  mixins: [mqttBase],
  components: {MqttTree},
  props: {
    widget: {
      title: "gpio2mqtt",
      postfix: "",
      prefix: "",
      topic: "",
    },
    topic: null,
  },
  data() {
    return {
      dialog: false,
      params: {
        type: "text",
        title: this.widget.title || "",
        topic: this.widget.topic || "",
        postfix: this.widget.postfix || "",
        prefix: this.widget.prefix || "",
      },
      value: "",
    };
  },
  methods: {
    onMqttMessage(topic, variant) {
      if (topic == this.widget.topic) {
        this.mqtt.watchdogReset();
        this.value = variant;
      }
    },
    updateTopic(t) {
      this.params.topic = t;
    },
    rightClick(ev) {
      console.log(" right click ", ev);
      this.dialog = !this.dialog;
      ev.preventDefault();
    },
    updateWidget() {
      this.$emit("widgetUpdate", this.params);
      this.dialog = false;
    },
    cancel() {
      this.dialog = false;
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