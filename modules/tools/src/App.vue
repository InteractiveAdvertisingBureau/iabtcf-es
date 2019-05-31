<template>
  <div id="app">
    <Nav></Nav>
    <component
       id="page"
      :is="selectedComponent"
       />
  </div>
</template>

<script lang="ts">
import { Component,Prop, Vue } from 'vue-property-decorator';
import Nav from './components/nav/Nav.vue';
import Landing from './components/pages/Landing';
import TCStringEncode from './components/pages/TCStringEncode';

@Component({
  components: {
    Nav,
    Landing,
    TCStringEncode, 
  },
})
export default class App extends Vue {

  @Prop() private selectedComponent: string;

  public constructor() {
    super();

    this.selectedComponent = "Landing";
  }
}
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
