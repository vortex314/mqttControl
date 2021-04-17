<template>
  <div ref="graphDiv"></div>
</template>
<script>
import { mqttBase } from "./mqttBase.js";
import uPlot from "uplot";
import "uplot/dist/uPlot.min.css";
/*
  <UplotVue
    :data="series"
    :options="opts"
    :target="target"
    @create="onCreate"
    @delete="onDelete"
  />
  */

export default {
  name: "LinePlotItem",
  mixins: [mqttBase],
  props: {
    widget: Object,
  },
  components: {
    //    uPlot,
  },
  data() {
    return {
      series: [
        [], // x-values (timestamps)
        [], // y-values (series 1)
        [], // y-values (series 2)
      ],
      opts: {
        title: this.widget.title,
        id: "chart" + this._uid,
        class: "my-chart",
        width: 400,
        height: 200,
        series: [
          {},
          {
            // initial toggled state (optional)
            show: true,
            spanGaps: false,
            // in-legend display
            label: "mA",
            value: (_, rawValue) => "$" + rawValue.toFixed(2),

            // series style
            stroke: "blue",
            width: 1,
            fill: "rgba(255, 255, 255, 0.3)",
            //           dash: [10, 5]
          },
/*          {
            // initial toggled state (optional)
            show: true,
            spanGaps: false,
            // in-legend display
            label: "CPU",
            value: (_, rawValue) => "X" + rawValue.toFixed(2),

            // series style
            stroke: "green",
            width: 1,
            fill: "rgba(255, 255, 255, 0.3)",
            //            dash: [5, 5]
          },*/
        ],
      },
      target: null,
      chart: {},
    };
  },
  mounted() {
    //    console.log(" creating graph");
    this.mqtt.register(this, this.widget.topic);
    this.chart = new uPlot(this.opts, this.series, this.$refs.graphDiv);
 /*   setInterval(() => {
      const v = Math.round(Math.random() * 100);
      const now = Math.round(new Date().getTime() / 1000);
      //     console.log( now+'   '+this.series[0].length)
      if (this.series[0].length > 100) {
        this.series[0].shift();
        this.series[1].shift();
        this.series[2].shift();
      }
      this.series[0].push(now);
      this.series[1].push(v);
      this.series[2].push(Math.round(Math.random() * 100));
      this.chart.setData(this.series);
    }, 1000);*/
  },
  methods: {
    onMqttMessage(topic, variant) {
      if (topic == this.widget.topic) {
        this.mqtt.watchdogReset();
        console.log("LINE" ,topic, variant);
        this.addSample(variant, 0);
      }
    },
    addSample(x) {
      const now = Math.round(new Date().getTime() / 1000);
      if (this.series[0].length > 100) {
        this.series[0].shift();
        this.series[1].shift();
        this.series[2].shift();
      }
      this.series[0].push(now);
      this.series[1].push(x);
      this.series[2].push(x)
      this.chart.setData(this.series);
    },
    onCreate() {
      console.log("onCreate");
    },
    onDelete() {
      console.log("onDelete");
    },
  },
};
</script>
