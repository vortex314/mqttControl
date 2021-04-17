<template>
  <v-row>
    <v-text-field v-model="host" label="Mqtt Host" />
    <v-text-field v-model="port" label="Mqtt Port" />
    <v-icon @click="buttonClicked()" :disabled="connected">mdi-lan-connect</v-icon>
        <v-icon @click="buttonClicked()" :disabled="!connected">mdi-lan-disconnect</v-icon>

    <v-icon @click="saveConfig('A')">mdi-content-save</v-icon>
    <v-icon @click="eb.$emit('load')">mdi-folder-upload-outline</v-icon>
    <v-icon @click="eb.$emit('gridFreeze')" :disabled="frozen">mdi-lock</v-icon>
    <v-icon @click="eb.$emit('gridUnfreeze')" :disabled="!frozen">
      mdi-lock-open-variant-outline
    </v-icon>
  </v-row>
</template>

<script>
import Mqtt from "paho-mqtt";
import EventBus from "./eventbus";
import Config from "./Config"
import mymqtt from "./mqtt.js"

export default {
  mixins:[Config],
  components: {},
  props: {},
  data() {
    return {
      host: "limero.ddns.net",
      port: 1884,
      saveTopic: "dashboard/saved",
      client: null,
      connected: false,
      frozen: false,
      backup: {},
      eb: EventBus,
    };
  },
  methods: {
    onConnectionLost(responseObject) {
      this.connected = false;
      console.log("connection lost: " + responseObject.errorMessage);
    },
    onMessageArrived(message) {
      console.log(message.destinationName, " -- ", message.payloadString);
    },
    onConnectSuccess() {
      this.connected = true;
      console.log("mqtt connected");
      // Connection succeeded; subscribe to our topic, you can add multile lines of these
      //     this.client.subscribe("#", { qos: 1 });

      //use the below if you want to publish to a topic on connect
      var message = new Mqtt.Message("Hello");
      message.destinationName = "/World";
      this.client.send(message);
    },
    onConnectFailure(message) {
      console.log("Connection failed: " + message.errorMessage);
      this.connected = false;
    },
    buttonClicked() {
      console.log(mymqtt)
      mymqtt.connect()
/*      if (!this.connected) {
        console.log("connecting to " + this.host);
        this.client = new Mqtt.Client(
          this.host,
          this.port,
          "myclientid_" + parseInt(Math.random() * 100, 10)
        );

        this.client.onConnectionLost = this.onConnectionLost;
        this.client.onMessageArrived = this.onMessageArrived;

        var options = {
          timeout: 3,
          onSuccess: this.onConnectSuccess,
          onFailure: this.onConnectFailure,
        };
        this.client.connect(options);
      } else {
        this.client.disconnect();
        this.connected = false;
        this.client = null;
      }*/
    },
    saveDashboardToMqtt() {
      const dashboard = this.$store.state;
      let message = new Mqtt.Message(JSON.stringify(dashboard));
      message.destinationName = this.saveTopic;
      message.retained = true;
      message.qos = 2;
      this.client.send(message);
    },
    saveDashboard() {
      EventBus.$emit("save");
    },
    loadDashboard() {
      console.log("loading...");
      const dashboard = JSON.parse(window.localStorage.getItem("dashboard"));
      console.log("loading...  " + dashboard.version.date);
      this.$store.state.grid.layout[0].items[0].height = 24;
    },
  },
  computed: {
    buttonLabel() {
      return this.connected ? "Disconnect" : "Connect...";
    },
  },
  mounted() {
    EventBus.$on("save", () => {
      console.log("save");
      EventBus.$emit("saving", {
        mqtt: { host: this.host, port: this.port, connected:this.connected },
      });
    });
    EventBus.$on("saving", (object) => {
      this._.merge(this.backup, object);
      console.log(JSON.stringify(this.backup));
      console.log(this.backup);
      localStorage.setItem("dashboard", this.backup);
    });
    EventBus.$on("gridFreeze", () => {
      this.frozen = true;
    });
    EventBus.$on("gridUnfreeze", () => {
      this.frozen = false;
    });
  },
};
</script>

<style></style>
