<template>
  <v-container py-0 px-0  @contextmenu="rightClick($event)" >
    <radial-gauge :value="value" :options="gaugeOptions" />
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
      dense
    >
      <v-card class="px-6 py-6">
        <v-row>
          <v-text-field label="Topic" v-model="params.topic" />
        </v-row>
        <mqtt-tree @topic="updateTopic" />
        <v-row>
          <v-text-field label="Title" v-model="params.title" />
        </v-row>
        <v-row>
          <v-text-field label="Units" v-model="params.units" />
        </v-row>
        <v-row>
          <v-text-field label="Min" v-model.number="params.min" type="number" />
        </v-row>
        <v-row>
          <v-text-field label="Max" v-model.number="params.max" type="number" />
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
import RadialGauge from "vue-canvas-gauges/src/RadialGauge.vue";
import MqttTree from "./MqttTree";
import { mqttBase } from "./mqttBase.js";

export default {
  name: "GridGauge",
  mixins: [mqttBase],
  components: {
    RadialGauge,
    MqttTree,
  },
  props: {
    widget: {
      title: "",
      units: "",
      min: 0,
      max: 101,
      topic: "",
      showSettings: false,
    },
  },
  methods: {
    onMqttMessage(topic, variant) {
      if (topic == this.widget.topic) {
        if (typeof variant == "number") {
          this.mqtt.watchdogReset();
          this.value = variant;
        }
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
  data() {
    return {
      dialog:false,
      value: 50,
      params: {
        type: "gauge",
        title: this.widget.title || "",
        units: this.widget.units || "",
        min: this.widget.min || 0,
        max: this.widget.max || 100,
        topic: this.widget.topic || "",
      },
      gaugeOptions: {
        units: this.widget.units || "",
        title: this.widget.title || "",
        minValue: this.widget.min || 0,
        maxValue: this.widget.max || 100,
        width: 200,
        height: 200,
        strokeTicks: true,
        colorBar: "white",
        colorBarProgress: "blue",
        highlights: [],
        minorTicks: 10, //  #of ticks between major ticks
        majorTicks: [0, 50, 100],
        colorPlate: "#fff",
        borderShadowWidth: 0,
        borders: false,
        needleType: "arrow",
        needleShadow: true,
        needleWidth: 0,
        needleCircleSize: 7,
        needleCircleOuter: true,
        needleCircleInner: false,
        numberSide: "left",
        needleSide: "left",
        animationDuration: 50,
        animationRule: "bounce",
        barWidth: 15,
        valueBox: true,
        valueBoxStroke: 5,
        valueTextShadow: true,
        valueDec: 1,
        barBeginCircle: 0,
        fontNumbersSize: 20,
        fontUnitsSize: 30,
        fontValueSize: 30,
      },
    };
  },

  created() {
    // calculate majorTicks
    console.log(" created ", this.widget);
    const max = this.widget.max || 100;
    const min = this.widget.min || 0;
    const logRange = Math.floor(Math.log10(max - min));
    const step = Math.pow(10, logRange);
    //   console.log(` min : ${min} , max : ${max}, step : ${max}, logRange : ${logRange }`)
    let majorTicks = [];
    majorTicks.push(min);
    let x = 0;
    for (x = -9 * step; x <= 9 * step; x += step) {
      if (x > min && x < max) {
        majorTicks.push(x);
      }
    }
    majorTicks.push(max);
    this.gaugeOptions.majorTicks = majorTicks;
  },
  computed: {
    mqttTopic() {
      return this.mqtt.topic;
    },
  },
  watch: {
    widget() {
      this.updateWidget();
    },
  },
  mounted() {
    console.log("mounted ", this.widget);
    this.mqtt.register(this, this.widget.topic);
  },
};
</script>

<style scoped>
</style>
