import { MQTT } from "./mqtt";


export var mqttBase = {
  props: {
  },
  data() {
    return {
      mqtt: {
        timer: null,
        expired: false,
        timeout: 4000,
        prefix: "",
        postfix: "",
        MQTT: MQTT,
        register: this.mqttRegister,
        watchdogReset: this.mqttWatchdogReset,
      }
    };
  },
  methods: {
    time() {
      var today = new Date(),
        h = (today.getHours()),
        m = (today.getMinutes()),
        s = (today.getSeconds());
      return h + ":" + m + ":" + s;
    },
    timeoutHandler
      : function() {
      this.mqtt.timer = setTimeout(this.timeoutHandler, this.mqtt.timeout);
      if (!this.mqtt.expired) {
//        console.log(this.time(), "mixin mqtt timed out", this.widget.topic, this.$options.name, this.mqtt.timeout)
        this.mqtt.expired = true;
      }
    },
    mqttWatchdogReset() {
      clearTimeout(this.mqtt.timer);
      this.mqtt.timer = setTimeout(this.timeoutHandler, this.mqtt.timeout);
      if (this.mqtt.expired) {
//        console.log(this.time(), "mixin watchdog reset", this.widget.topic, this.$options.name, this.mqtt.timeout)
        this.mqtt.expired = false;
      }
    },
    mqttRegister(obj, topic) { this.mqtt.MQTT.register(obj, topic) }
  },
  mounted() {
    console.log(" mixin mounted Base item ");
    this.mqtt.timer = setTimeout(this.timeoutHandler
      , this.mqtt.timeout);
  },
  created() {
    console.log(" mixin created Base item ");
  },
};
