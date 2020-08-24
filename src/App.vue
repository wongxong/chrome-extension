<template>
  <div id="zh_social_app_root">
    <wx-router-link to="/">HelloWorld</wx-router-link>
    <wx-router-link to="/hello_router">HelloWorld2</wx-router-link>
    <wx-router-view></wx-router-view>
  </div>
</template>

<script>
  import HelloWorld from './components/HelloWorld.vue';
  import { initApp } from './content-api/service';

  export default {
    name: 'App',
    components: {
      HelloWorld
    },
    created() {
      initApp().then(res => {
        console.log('initApp => ', res);
      }).catch(err => {
        console.log('initApp => ', err);
      });
    }
  }
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
