<template>
  <v-container class="px-0 py-0">
    <item-compass v-if="item.widget.type == 'compass'" :widget="item.widget" />
    <grid-gauge v-if="item.widget.type == 'gauge'" :widget="item.widget" @widgetUpdate="widgetUpdate"/>
    <item-line-plot
      v-if="item.widget.type == 'linePlot'"
      :widget="item.widget"
    />
    <item-button v-if="item.widget.type == 'button'" :widget="item.widget" />
    <grid-status v-if="item.widget.type == 'status'" :widget="item.widget" />
    <grid-text v-if="item.widget.type == 'text'" :widget="item.widget" />
    <v-card v-if="item.widget.type == 'none'">
      <v-select :items="items" label="Widget Type" v-model="item.widget.type" />
    </v-card>
  </v-container>
</template>

<script>
import ItemCompass from "./ItemCompass.vue";
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
    ItemCompass,
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
          },
        };
      },
    },
  },
  data() {
    return {
      showSettings: false,
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
    };
  },
  methods: {
    widgetUpdate(newWidget) {
      console.log(" received new widget settings ", newWidget);
      this.item.widget = newWidget;
      let t= this.item.widget.type
      this.item.widget.type='none';
      this.item.widget.type=t;
    },
  },
  mounted() {},
  created() {},
};
</script>

<style>
</style>