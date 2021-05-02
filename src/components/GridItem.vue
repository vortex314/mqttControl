<template>
  <v-container
    class="px-0 py-0"
    @contextmenu="rightClick($event)"
  >
    <grid-compass v-if="isType('compass')" :widget="item.widget" :key="key" @widgetUpdate="widgetUpdate" />
    <grid-gauge v-if="isType('gauge')" :widget="item.widget" :key="key" @widgetUpdate="widgetUpdate" />
    <item-line-plot v-if="isType('linePlot')" :widget="item.widget" @widgetUpdate="widgetUpdate"/>
    <item-button v-if="isType('button')" :widget="item.widget" @widgetUpdate="widgetUpdate" />
    <grid-status v-if="isType('status')" :widget="item.widget" @widgetUpdate="widgetUpdate" />
    <grid-text v-if="isType('text')" :widget="item.widget" @widgetUpdate="widgetUpdate" />
    <v-card v-if="isType('none')">
      <v-select :items="items" label="Widget Type" v-model="item.widget.type" />
    </v-card>
  </v-container>
</template>

<script>
import GridCompass from "./GridCompass.vue";
import GridGauge from "./GridGauge.vue";
import GridText from "./GridText";
import ItemButton from "./ItemButton.vue";
import ItemLinePlot from "./ItemLinePlot.vue";
import GridStatus from "./GridStatus.vue";
export default {
  name: "GridItem",
  components: {
    GridGauge,
    GridText,
    GridCompass,
    ItemLinePlot,
    ItemButton,
    GridStatus,
  },
  props: {
    item: {
      type: Object,
      default() {
        return {
          widget: {
            showSettings: false,
          },
        };
      },
    },
  },
  data() {
    return {
      items: [
        "none",
        "gauge",
        "compass",
        "linePlot",
        "status",
        "button",
        "text",
        "table",
      ],
      selectedType: "none",
      key: new Date().getMilliseconds(),
    };
  },
  methods: {
    widgetUpdate(newWidget) {
      console.log(" received new widget settings ", newWidget);
      this.item.widget = newWidget;
      let t = this.item.widget.type;
      this.item.widget.type = "none";
      this.item.widget.type = t;
      this.key = new Date().getMilliseconds(); // force widget rebuild
    },
    isType(x) {
      return this.item.widget.type === x;
    },
    rightClick(ev) {
      console.log("right click ", ev);
      this.item.widget.showSettings = true;
      ev.preventDefault();
    },
  },
  computed: {},
  mounted() {},
  created() {},
};
</script>

<style>
</style>