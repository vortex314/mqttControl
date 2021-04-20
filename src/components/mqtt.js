import Vue from 'vue';
import Paho from "paho-mqtt";
import { config } from "./config.js";

export const MQTT = Vue.observable({
    host: "limero.ddns.net",
    port: 1884,
    connected: false,
    client: null,
    components: [],
    topics:new Set(),
    getConfig() {
        return {
            host: this.host,
            port: this.port,
        }
    },
    constructor() {
        config.register("mqtt", this)
    },
    setConfig(object) {
        this.host = object.host
        this.port = object.port
    },
    register(obj, topic) {
        for (let i = 0; i < this.components.length; i++) {
            if (this.components[i].vue == obj) console.log("[MQTT] vue already registered",obj,topic)
        }
        this.components.push({ vue: obj, topic: topic })
        if ( this.connected ) this.subscribe(topic)
    },
    unregister(obj) {
        for (let i = 0; i < this.components.length; i++) {
            if (this.components[i].vue == obj) this.components.splice(i, 1)
        }
    },
    subscribeAllComponents() {
        this.subscribe("src/#")
        for (let component of this.components) {
            this.subscribe(component.topic)
        }
    },
    connect() {
        config.register("mqtt", this)
        var self = this;
        if (!this.connected) {
            console.log("MQTT connecting to " + this.host);
            this.client = new Paho.Client(
                this.host,
                this.port,
                "myclientid_" + parseInt(Math.random() * 100, 10)
            );

            this.client.onConnectionLost = (responseObject) => {
                this.connected = false;
                console.log("connection lost: " + responseObject.errorMessage);
            }
            this.client.onMessageArrived = (message) => {
                this.topics.add(message.topic)
                let variant = JSON.parse(message.payloadString)
                //  console.log("[MQTT] SUB ", message.topic, variant)
                for (let component of this.components) {
                    component.vue.onMqttMessage(message.topic, variant)
                }
            };

            var options = {
                timeout: 3,
                onSuccess: () => {
                    self.connected = true;
                    console.log("MQTT connected ")
                    self.subscribeAllComponents()
                },
                onFailure: (message) => {
                    self.connected = false;
                    console.log("MQTT Connection failed: " + message.errorMessage)
                },
            };
            this.client.connect(options);
        } else {
            console.log("[MQTT] " + this.host + " already connected.")
        }
    },
    disconnect() {
        console.log("[MQTT]", " disconnect")
        this.client.disconnect()
        this.connected = false;
        this.client = null;
    },
    publish(topic, payload, qos = 1, retain = false) {
        console.log(this.host)
        if (!this.connected) return
        console.log(" PUB " + topic + ":" + payload)
        let message = new Paho.Message(JSON.stringify(payload));
        message.destinationName = topic;
        message.retained = retain;
        message.qos = qos;
        this.client.send(message);
    },
    subscribe(topics) {
        console.log("[MQTT] subscribe " + topics)
        this.client.subscribe(topics, { qos: 1 })
    },
    onConnectionLost(responseObject) {
        this.connected = false;
        console.log("connection lost: " + responseObject.errorMessage);
    },
    onMessageArrived(message) {
        console.log(message.destinationName, " = ", message.payloadString);
    },


});

//export default Mqtt
