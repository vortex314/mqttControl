<template>
  <v-container pt-2 px-1 :class="classColor" @contextmenu="rightClick($event)">
    <span >{{ params.title }}</span>
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
          <v-spacer />
          <v-btn color="blue darken-1" text @click="cancel"> Cancel </v-btn>
          <v-btn color="blue darken-1" text @click="updateWidget">
            Update
          </v-btn>
        </v-row>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mqttBase } from "./mqttBase.js";
import MqttTree from "./MqttTree";

export default {
  name: "GridStatus",
  mixins: [mqttBase],
  components: { MqttTree },
  props: {
    widget: {
      title: "",
      topic: "",
    },
  },
  data() {
    return {
      value: false,
      timeout: false,
      dialog: false,
      params: {
        type: "status",
        title: this.widget.title || "",
        topic: this.widget.topic || "",
      },
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
      this.dialog = true;
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
    classColor() {
      if (this.mqtt.expired) return "is-grey";
      else if (this.value) return "is-green";
      else return "is-red";
    },
  },
  mounted() {
    this.mqttRegister(this, this.widget.topic);
  },
  created() {},
};
</script>

<style>
.active {
  background: rgb(17, 128, 17);
}
.is-green {
  background: #3fec44 !important;
  color:black;
}
.is-grey {
  background: #afaeae !important;
  color:white;
}
.is-red {
  background: #f10909 !important;
}
</style>