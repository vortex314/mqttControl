<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-row>
        <v-text-field v-model="mqtt.host" label="Mqtt Host" />
        <v-text-field
          v-model.number="mqtt.port"
          label="Mqtt Port"
          type="number"
        />
        <v-icon @click="mqtt.connect()" :disabled="mqtt.connected">
          mdi-lan-connect
        </v-icon>
        <v-icon @click="mqtt.disconnect()" :disabled="!mqtt.connected">
          mdi-lan-disconnect
        </v-icon>

        <v-icon @click="config.save('A')">mdi-content-save</v-icon>
        <v-icon @click="config.load('A')">mdi-folder-upload-outline</v-icon>
        <v-icon @click="eb.$emit('gridFreeze')" :disabled="frozen">
          mdi-lock
        </v-icon>
        <v-icon @click="eb.$emit('gridUnfreeze')" :disabled="!frozen">
          mdi-lock-open-variant-outline
        </v-icon>
        <v-icon @click="eb.$emit('gridAdd')"> mdi-plus </v-icon>
      </v-row>
    </v-app-bar>

    <v-main>
      <Grid />
    </v-main>
  </v-app>
</template>

<script>
import Grid from "./components/Grid";
import { MQTT } from "./components/mqtt.js";
import { config } from "./components/config.js";
import { EventBus } from "./components/eventbus.js";

export default {
  name: "App",
  components: {
    Grid,
  },
  props: {},

  data() {
    return {
      mqtt: MQTT,
      config: config,
      frozen: false,
      eb: EventBus,
    };
  },
  methods: {},
  watch: {
    "mqtt.connected": (val) => {
      console.log("connected :" + val);
//      if (oldVal == false && val == true) this.mqtt.client.subscribe("src/#", { qos: 1 });
    },
  },
  mounted() {
    console.log("mqtt", this.mqtt);
  },
};
</script>

<style >
</style>
