<template>
  <div id="app">
    <Nav />
    <div id="page">
      <router-view></router-view>
    </div>
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
a {
  color: #DA70D6;
  text-decoration:none;
}
h1 {
  color: #555;
}
</style>
