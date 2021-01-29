<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import ConfigHelper from './common/ConfigHelper';
export default {
  name: 'App',
  created(){
    ConfigHelper.init();
  }
}
</script>

<style lang='less'>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
</style>
