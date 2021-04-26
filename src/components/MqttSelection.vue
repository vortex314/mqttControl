<template>
  <v-container class="px-6 py-6">
    <v-row>
      <p>Topics : {{ JSON.stringify(topics) }}</p>
    </v-row>
    <v-row>
      <v-text-field label="Topic" v-model="topic" />
      <v-btn @click="clearTopics" color="primary">clear</v-btn>
      <v-btn @click="addTopicFromText" color="primary"> Add topic </v-btn>
    </v-row>
    <v-row>
      <mqtt-tree @topic="addTopicFromTree" />
    </v-row>
  </v-container>
</template>

<script>
import MqttTree from "./MqttTree.vue";
export default {
  components: { MqttTree },
  props: {
    value: Boolean,
  },
  data() {
    return {
      topics: [],
      topic: "",
    };
  },
  methods: {
    addTopicFromTree(topic) {
      if (topic.length > 0) this.topics.push(topic);
      this.emitTopics()
    },
    addTopicFromText() {
      if (this.topic.length > 0) this.topics.push(this.topic);
      this.topic = "";
      this.emitTopics()
    },
    clearTopics(){
      this.topics=[]
      this.emitTopics()
    },
    emitTopics(){
      this.$emit('topics',this.topics)
    }
  },
  computed: {
  },
};
</script>

<style>
</style>