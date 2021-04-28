import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import store from './store';
import VueLodash from 'vue-lodash';
import lodash from 'lodash';

Vue.config.productionTip = false;
Vue.use(VueLodash, { name: 'custom', lodash: lodash });

export const eb = new Vue();

import Vuetify from 'vuetify/lib'

import 'font-awesome/css/font-awesome.min.css'

export default new Vuetify({
  icons: {
    iconfont: 'fa4', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
  },
});

new Vue({
  vuetify,
  eb,
  store,
  render: h => h(App)
}).$mount('#app');
