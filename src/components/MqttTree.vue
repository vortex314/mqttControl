<template>
  <v-treeview
    @update:active="clicked"
    v-model="tree"
    :items="items"
    activatable
    return-object
    dense
    item-key="id"
  >
    <template v-slot:label="{ item }" selectable="isLeaf(item)">
      {{ item.name }}
      <span v-if="isLeaf(item)"> : {{ JSON.stringify(item.value) }} </span>
    </template>
  </v-treeview>
</template>

<script>
import { mqttBase } from "./mqttBase.js";

export default {
  name: "MqttTree",
  mixins: [mqttBase],
  data() {
    return {
      tree: [],
      items: [],
      idCounter: 0,
    };
  },
  mounted() {
    this.mqttRegister(this, "src/#");
  },
  methods: {
    onMqttMessage(topic, variant) {
      this.updateTopic(topic, variant);
    },
    updateTopic(topic, variant) {
      let parts = topic.split("/");
      let childrenArray = this.items;
      let childObject = null;
      let path=""
      for (let i=0;i<parts.length;i++ ) {
        let part = parts[i]
        if ( path.length != 0 ) path+="/"
        path+=part
        childObject = this.hasChild(childrenArray, part);
        if (childObject == null) {
          console.log("add topic to tree", topic);
          childObject = this.createParent(part);
          childObject.topic = path
          childrenArray.push(childObject);
          childrenArray.sort((a, b) =>
            a.name > b.name ? 1 : b.name > a.name ? -1 : 0
          );
        } else {
          childObject.count++;
        }
        childrenArray = childObject.children;
      }
      childObject.topic = topic;
      childObject.value = variant;
    },
    hasChild(parent, x) {
      for (let i = 0; i < parent.length; i++) {
        if (parent[i].name == x) return parent[i];
      }
      return null;
    },
    createParent(x) {
      this.idCounter++;
      return {
        id: this.idCounter,
        name: x,
        count: 0,
        children: [],
      };
    },
    createChild(x) {
      this.idCounter++;
      return {
        id: this.idCounter,
        name: x,
      };
    },
    findItemById(id) {
      console.log(id);
    },
    isLeaf(obj) {
      return obj.value != undefined;
    },
    clicked(ev) {
      let item=ev[0]
      if (this.isLeaf(item)) {
        this.$emit('topic',item.topic);
      } else {
        this.$emit('topic',item.topic+"/#");
      }
      console.log("emitting",item); // array of activated id's
    },
  },
};
</script>

<style lang="scss"  >
$treeview-node-shaped-margin: 8px;
</style>