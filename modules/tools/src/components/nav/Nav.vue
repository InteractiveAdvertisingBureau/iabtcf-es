<template>
  <div>
    <b-navbar
      toggleable="lg"
      type="light"
      variant="faded">
      <b-navbar-brand>
        <router-link to="/">
          Home
        </router-link>
      </b-navbar-brand>

      <b-navbar-toggle
      target="nav-collapse"/>

      <b-collapse
        id="nav-collapse"
        is-nav>
        <b-navbar-nav>
          <b-nav-item
            v-for="(link, idx) in links"
            :key="idx"
          >
            <router-link :to="link.path">
              {{ link.title }}
            </router-link>
          </b-nav-item>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {SectionModel} from '../../model/SectionModel';
import {LinkModel} from '../../model/LinkModel';

// eslint doesn't like these decorators...
// eslint-disable-next-line
@Component

export default class extends Vue {

  public sectionModel: SectionModel = new SectionModel();
  public get links(): LinkModel[] {

    const retr: LinkModel[] = [];

    this.sections.forEach((sectionName) => {

      const links = this.sectionModel.get(sectionName);
      links.forEach((link) => retr.push(link) );

    });

    return retr;

  }
  public get sections(): string[] {

    return Array.from(this.sectionModel.keys());

  }

}
</script>
<style scoped>
</style>
