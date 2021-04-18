<template>
  <div>
    <item-compass v-if="item.widget.type == 'compass'" :widget="item.widget" />
    <grid-gauge v-if="item.widget.type == 'gauge'" :widget="item.widget" />
    <item-line-plot
      v-if="item.widget.type == 'linePlot'"
      :widget="item.widget"
    />
    <item-button v-if="item.widget.type == 'button'" :widget="item.widget" />
    <item-status v-if="item.widget.type == 'status'" :widget="item.widget" />
  </div>
</template>

<script>
import ItemCompass from "./ItemCompass.vue";
import GridGauge from "./GridGauge.vue";
import ItemButton from "./ItemButton.vue";
import ItemLinePlot from "./ItemLinePlot.vue";
import ItemStatus from "./ItemStatus.vue";
export default {
  name: "GridItem",
  components: { GridGauge, ItemCompass, ItemLinePlot, ItemButton, ItemStatus },
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
    return {};
  },
  methods: {},
  mounted() {},
  created() {},
};
</script>

<style>
</style>