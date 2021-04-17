import Vue from 'vue';

export const config = Vue.observable({

  components: [],
  componentNames: [],
  config: {},

  register(componentName, component) {
    //      console.log(" registering ", componentName, component);
    this.components.push(component);
    this.componentNames.push(componentName);
  },
  save(configName="default") {
    console.log(configName + " config saving ");
    for (let i = 0; i < this.componentNames.length; i++) {
      let component = this.components[i];
      let componentName = this.componentNames[i];
      const cfg = component.getConfig();
      this.config[componentName] = cfg;
    }
    localStorage.setItem(configName, JSON.stringify(this.config));
  },
  load(configName="default") {
    let configJson = localStorage.getItem(configName)
    console.log(configJson)
    this.config = JSON.parse(configJson);
    for (let i = 0; i < this.componentNames.length; i++) {
      this.components[i].setConfig(this.config[this.componentNames[i]]);
    }
  },

});
