<template>
  <v-container @dblclick="dblClick">
    <item-compass v-if="item.widget.type == 'compass'" :widget="item.widget" />
    <grid-gauge v-if="item.widget.type == 'gauge'" :widget="item.widget" />
    <item-line-plot
      v-if="item.widget.type == 'linePlot'"
      :widget="item.widget"
    />
    <item-button v-if="item.widget.type == 'button'" :widget="item.widget" />
    <grid-status v-if="item.widget.type == 'status'" :widget="item.widget" />
    <grid-text v-if="item.widget.type == 'text'" :widget="item.widget" />
    <h2 v-if="item.widget.type == 'none' " >No widget defined </h2>
    <widget-dialog
      v-model="showSettings"
      widget="item.widget"
      @widgetUpdate="widgetUpdate"
    />
  </v-container>
</template>

<script>
import ItemCompass from "./ItemCompass.vue";
import GridGauge from "./GridGauge.vue";
import GridText from "./GridText";
import ItemButton from "./ItemButton.vue";
import ItemLinePlot from "./ItemLinePlot.vue";
import GridStatus from "./GridStatus.vue";
import WidgetDialog from "./WidgetDialog.vue";
export default {
  name: "GridItem",
  components: {
    GridGauge,
    GridText,
    ItemCompass,
    ItemLinePlot,
    ItemButton,
    GridStatus,
    WidgetDialog,
  },
  props: {
    item: {
      type: Object,
      default() {
        return {
          widget: {},
        };
      },
    },
  },
  data() {
    return {
      showSettings: false,
    };
  },
  methods: {
    dblClick(ev) {
      console.log(" double clicked ", ev);
      this.showSettings = true;
    },
    widgetUpdate(newWidget) {
      console.log(" received new widget settings ",newWidget);
      this.item.widget = newWidget;
    },
  },
  mounted() {},
  created() {},
};
</script>

<style>
</style>