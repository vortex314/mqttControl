<template>
  <v-treeview class="tv" :items="items" dense></v-treeview>
</template>

<script>
import { mqttBase } from "./mqttBase.js";

export default {
  name: "MqttTree",
  mixins: [mqttBase],
  data() {
    return {
      items:[],
      idCounter:0,
    }
  },
  mounted() {
    this.mqttRegister(this, "src/#");
  },
  methods: {
    onMqttMessage(topic,variant) {
      this.updateTopic(topic,variant)
    },
    updateTopic(topic,variant) {
      let parts=topic.split('/')
      let childrenArray = this.items
      let childObject=null
      for( let part of parts ) {
        childObject = this.hasChild(childrenArray,part)
        if ( childObject == null ) {
          console.log("add topic to tree",topic)
          childObject = this.createParent(part)
          childrenArray.push(childObject)
          childrenArray.sort((a,b) => ( (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)))
        } else {
          childObject.count++
        }
        childrenArray = childObject.children
      }
      childObject.value=variant
    },
    hasChild(parent,x){
      for( let i=0;i<parent.length;i++  ) {
        if ( parent[i].name == x) return parent[i]
      }
      return null
    },
    createParent(x) {
      this.idCounter++
      return {
          id:this.idCounter,
          name:x,
          count:0,
          value:null,
          children:[]
      }
    },
    createChild(x) {
      this.idCounter++
      return {
          id:this.idCounter,
          name:x,
      }
    }
  },
  data2: () => ({
    items: [
      {
        id: 1,
        name: "Applications :",
        children: [
          { id: 2, name: "Calendar : app" },
          { id: 3, name: "Chrome : app" },
          { id: 4, name: "Webstorm : app" },
        ],
      },
      {
        id: 5,
        name: "Documents :",
        children: [
          {
            id: 6,
            name: "vuetify :",
            children: [
              {
                id: 7,
                name: "src :",
                children: [
                  { id: 8, name: "index : ts" },
                  { id: 9, name: "bootstrap : ts" },
                ],
              },
            ],
          },
          {
            id: 10,
            name: "material2 :",
            children: [
              {
                id: 11,
                name: "src :",
                children: [
                  { id: 12, name: "v-btn : ts" },
                  { id: 13, name: "v-card : ts" },
                  { id: 14, name: "v-window : ts" },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 15,
        name: "Downloads :",
        children: [
          { id: 16, name: "October : pdf" },
          { id: 17, name: "November : pdf" },
          { id: 18, name: "Tutorial : html" },
        ],
      },
      {
        id: 19,
        name: "Videos :",
        children: [
          {
            id: 20,
            name: "Tutorials :",
            children: [
              { id: 21, name: "Basic layouts : mp4" },
              { id: 22, name: "Advanced techniques : mp4" },
              { id: 23, name: "All about app : dir" },
            ],
          },
          { id: 24, name: "Intro : mov" },
          { id: 25, name: "Conference introduction : avi" },
        ],
      },
    ],
  }),
};
</script>

<style lang="sass"  >
</style>