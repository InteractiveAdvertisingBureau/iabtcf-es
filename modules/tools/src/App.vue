<template>
  <div id="app">
    <LeftNav />
  </div>
</template>

<script>

import LeftNav from './components/LeftNav';

export default {
  name: 'App',
  components: {
    LeftNav,
  }
};

</script>

<style>
#app {
  font-family: monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0px;
  padding: 0px;
}
</style>
