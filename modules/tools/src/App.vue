<template>
  <div id="app">
    <Nav
      v-on:click="onNavClick"
      />
    <component
       id="page"
      :is="selectedComponent"
       />
  </div>
</template>

<script src="./App.vue.ts" lang="ts">
</script>

<style lang="scss">
#app {
  font-family: monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0px;
  padding: 0px;
}
#page {
  display: block;
  float:left;
  margin-left: 20px;
}
</style>
