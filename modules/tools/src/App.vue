<template>
  <div id="app">
    <Nav />
    <div id="page">
      <transition
        name="fade"
        mode="out-in"
      >
        <router-view />
      </transition>
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
  margin: 20px;
}
a {
  color: #DA70D6;
  text-decoration:none;
}
h1 {
  color: #555;
}
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.15s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>
