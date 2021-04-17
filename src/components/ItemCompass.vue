<template>
  <radial-gauge :value="value" :options="options" />
</template>

<script>
import RadialGauge from "vue-canvas-gauges/src/RadialGauge.vue";

export default {
  name: "Compass",
  components: {
    RadialGauge,
  },
  props: {
    widget: { title: "No Title", units: "no Units", topic: "" },
  },
  data() {
    return {
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

