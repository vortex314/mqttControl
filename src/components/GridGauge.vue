<template>
  <radial-gauge :value="value" :options="gaugeOptions" @dblclick="dblClick()" />
</template>

<script>
import RadialGauge from "vue-canvas-gauges/src/RadialGauge.vue";
import { mqttBase } from "./mqttBase.js";


export default {
  name: "GridGauge",
  mixins:[mqttBase],
  components: {
    RadialGauge,
  },
  props: {
    widget: {
      title: "no Title",
      units: "no Units",
      range: [0, 100],
      topic: "no topic",
    },
  },
  data() {
    return {
      value: 100,
      gaugeOptions: {
        units: this.widget.units,
        title: this.widget.title,
        minValue: this.widget.range[0],
        maxValue: this.widget.range[1],
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
  methods: {
    dblClick() {
      console.log(" double clicked ");
    },
    onMqttMessage(topic, variant) {
      if (topic == this.widget.topic) {
        this.mqtt.watchdogReset()
//        console.log(topic, variant);
        this.value = variant;
      }
    },
  },
  created() {

    const max = this.widget.range[1];
    const min = this.widget.range[0];
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
  mounted() {
    this.mqtt.register(this,this.widget.topic);
  },
};
</script>

<style scoped>
radial-gauge2 {
  height: 100%;
  width: 100%;
}
</style>
