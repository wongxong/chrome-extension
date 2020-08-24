import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';

Vue.config.productionTip = false;

var el = document.createElement('div');
el.id = 'zh_social_app_root';
document.body.appendChild(el);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#zh_social_app_root');
