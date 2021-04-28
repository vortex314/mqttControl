<template>
  <dashboard :id="'dashExample'">
    <dash-layout
      v-for="layout in dlayouts"
      v-bind="layout"
      :debug="false"
      :key="layout.breakpoint"
    >
      <dash-item
        v-for="item in layout.items"
        v-bind.sync="item"
        :key="item.id"
        @resizing="resizing"
      >
        <div class="content"><grid-item :item="item" /></div>
      </dash-item>
    </dash-layout>
  </dashboard>
</template>

<script>
import { Dashboard, DashLayout, DashItem } from "vue-responsive-dash";
import GridItem from "./GridItem.vue";
import { EventBus } from "./eventbus";
import { config } from "./config.js";

export default {
  name: "Grid",
  mixins: [],
  components: {
    Dashboard,
    DashLayout,
    DashItem,
    GridItem,
  },
  props: {},
  data() {
    return {
      config: config,
      dlayouts: [
        {
          breakpoint: "md",
          breakpointWidth: 0,
          rowHeight: 20,
          numberOfCols: 24,
          margin: { x: 3, y: 3 },
          items: [
            {
              id: "1",
              x: 0,
              y: 0,
              width: 5,
              height: 9,
              widget: {
                type: "gauge",
                topic: "src/triac/triac/current",
                title: "Current",
                units: "mA",
                range: [0, 2000],
              },
              locked: false,
            },
            {
              id: "2",
              x: 6,
              y: 0,
              width: 8,
              height: 10,
              widget: {
                type: "linePlot",
                topic: "src/triac/triac/current",
                title: "Current Triac",
              },
              locked: false,
            },
            {
              id: "3",
              x: 14,
              y: 0,
              width: 6,
              height: 7,
              widget: {
                type: "compass",
                topic: "src/dev/object/prop",
                title: "Compass",
              },
              locked: false,
            },
            {
              id: "4",
              x: 0,
              y: 70,
              width: 5,
              height: 9,
              widget: {
                type: "button",
                topic: "dst/dev/object/prop",
                title: "Power ",
                range: ["ON", "OFF"],
              },
              locked: false,
            },
          ],
        },
      ],
      backup: {},
      counter: 0,
      alives: ["gpio2mqtt", "serial2mqtt", "wiring"],
      //         dlayouts : this.$store.state.grid.layout,
    };
  },
  methods: {
    getLayout() {
      return this._.cloneDeep(this.dlayouts[0]);
    },
    clearLayout() {
      console.log(" clear ");
      this.dlayouts = [];
    },
    setLayout(dl) {
      this.dlayouts.push(dl);
    },
    resizing(ev) {
      console.log("resizing", ev);
    },
    getConfig() {
      return this._.cloneDeep(this.dlayouts);
    },
    setConfig(config) {
      while (this.dlayouts.length > 0) this.dlayouts.shift();
      this.dlayouts = config;
    },
  },
  mounted() {
    this.config.register("grid", this);
    //    console.log("parent :");
    //    console.log(this.$parent);
    EventBus.$on("save", () => {
      EventBus.$emit("saving", { layout: this._.cloneDeep(this.dlayouts) });
    });
    EventBus.$on("gridFreeze", () => {
      console.log("gridFreeze");
      for (let item of this.dlayouts[0].items) {
        item.locked = true;
      }
    });
    EventBus.$on("gridUnfreeze", () => {
      console.log("gridUnfreeze");
      for (let item of this.dlayouts[0].items) {
        item.locked = false;
      }
    });
    EventBus.$on("gridAdd", () => {
      console.log("gridAdd");
      let max = 0;
      for (let item of this.dlayouts[0].items) {
        if (max < parseInt(item.id)) max = parseInt(item.id);
      }
      this.dlayouts[0].items.push({
        id: (max + 1).toString(),
        x: 0,
        y: 50,
        width: 6,
        height: 6,
        widget: { type:'none'},
        locked: false,
      });
    });
  },
  created() {},
};
</script>

<style>
.content {
  height: 100%;
  width: 100%;
  border: 1px solid #42b983;
  border-radius: 1px;
  overflow: hidden;
  text-align: center;
}
</style>