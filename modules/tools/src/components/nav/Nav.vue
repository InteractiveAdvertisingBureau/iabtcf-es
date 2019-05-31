<template>
  <div class="nav">
    <NavGroup
      v-for="(section, index) in sections"
      v-bind:sectionTitle="section"
      v-bind:sectionLinks="sectionModel.get(section)"
      :key="index"
      class="section"
    />
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import { SectionModel } from '../../model/SectionModel';
import NavGroup from './NavGroup.vue';

@Component({
  components: {
    NavGroup,
  },
})

export default class Nav extends Vue {

  public sectionModel: SectionModel = new SectionModel();
  public get sections(): string[] {

    return Array.from(this.sectionModel.keys());

  }

}
</script>
<style scoped>
  .nav {
    margin-top:0px;
    width: 150px;
    border-right: 1px solid #ccc;
    height: 100vh;
    display: block;
    float:left;
  }
</style>
