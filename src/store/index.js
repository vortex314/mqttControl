import Vue from 'vue'
import Vuex from 'vuex'

import mqtt from './modules/mqtt-connection'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        mqtt
    }
})
