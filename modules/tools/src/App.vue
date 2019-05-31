<template>
  <div id="app">
    <LeftNav></LeftNav>
    <div></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LeftNav from './components/LeftNav.vue';

@Component({
  components: {
    LeftNav,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  border-top: 1px solid #ccc;
  margin: 0px;
  padding: 0px;
}
</style>
