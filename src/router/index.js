import WxRouter from './wx-router';
// import VueRouter from 'vue-router';
import Vue from 'vue';
import HelloWorld from '../components/HelloWorld.vue';
import HelloWorld2 from '../components/HelloWorld2.vue';

Vue.use(WxRouter);
// Vue.use(VueRouter);

export default new WxRouter({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/hello_router',
      name: 'HelloWorld2',
      component: HelloWorld2
    }
  ]
})