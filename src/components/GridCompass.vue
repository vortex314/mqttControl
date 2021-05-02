<template>
  <v-container class="py-0 px-0">
    <radial-gauge :value="value" :options="options" />
    <v-dialog
      v-if="widget.showSettings"
      v-model="widget.showSettings"
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

export default {
  name: "Compass",
  components: {
    RadialGauge,
    MqttTree,
  },
  props: {
    widget: { title: "No Title", topic: "" },
  },
  methods: {
    updateTopic(t) {
      this.params.topic = t;
    },
    updateWidget() {
      this.$emit("widgetUpdate", this.params);
      this.widget.showSettings = false;
    },
    cancel() {
      this.widget.showSettings = false;
    },
  },
  data() {
    return {
      params: {
        type: "compass",
        title: this.widget.title || "",
        topic: this.widget.topic || "",
      },
      value: 0,
      options: {
        title: this.widget.title,
        width: 200,
        height: 200,
        minValue: 0,
        maxValue: 360,
        majorTicks: ["N", "NE", "E", "SE", "S", "SW", "W", "NW", "N"],
        minorTicks: 22,
        ticksAngle: 360,
        startAngle: 180,
        strokeTicks: false,
        highlights: false,
        colorPlate: "#33a",
        colorMajorTicks: "#f5f5f5",
        colorMinorTicks: "#ddd",
        colorNumbers: "#ccc",
        colorNeedle: "#ddd",
        colorNeedleEnd: "#d00",
        valueBox: false,
        valueTextShadow: false,
        colorCircleInner: "#fff",
        colorNeedleCircleOuter: "#ccc",
        needleCircleSize: 15,
        needleCircleOuter: false,
        animationRule: "linear",
        needleType: "arrow",
        needleStart: 60,
        needleEnd: 99,
        needleWidth: 12,
        borders: true,
        borderInnerWidth: 0,
        borderMiddleWidth: 0,
        borderOuterWidth: 10,
        colorBorderOuter: "#ccc",
        colorBorderOuterEnd: "#ccc",
        borderShadowWidth: 0,
        //        animationTarget: 'plate',
        units: "g",
        fontTitleSize: 19,
        colorTitle: "#f5f5f5",
        needleShadow: true,
        animationDuration: 50,
      },
    };
  },
  mounted() {
    setInterval(() => {
      //      console.log('tick');
      this.value += Math.round((Math.random() - 0.5) * 5);
    }, 100);
  },
};
</script>

