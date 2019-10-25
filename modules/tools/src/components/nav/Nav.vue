<template>
  <div class="nav col-md-1">
    <div class="nav-groups">
      <router-link to="/"><img id="home-logo-link" src="https://iabtechlab.com/wp-content/uploads/2016/07/IAB_Tech_Lab.png"/></router-link>
      <p class="home-link">
        <router-link to="/">Home</router-link>
      </p>
      <NavGroup
        v-for="(section, index) in sections"
        v-bind:sectionTitle="section"
        v-bind:sectionLinks="sectionModel.get(section)"
        :key="index"
        class="section"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {SectionModel} from '../../model/SectionModel';
import NavGroup from './NavGroup.vue';

// eslint doesn't like these decorators...
// eslint-disable-next-line
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
</style>
