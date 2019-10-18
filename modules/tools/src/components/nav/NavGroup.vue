<template>
  <div>
    <h6>{{ title }}</h6>
    <ul>
    <li v-for="(link, index) in links" :key="index">
    <router-link :to="{name:link.getLink()}" >{{ link.getTitle() }}</router-link>
    </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {LinkModel} from '../../model/LinkModel';

@Component
export default class NavGroup extends Vue {

  // eslint-disable-next-line
  @Prop() 
  private sectionTitle!: string;
  // eslint-disable-next-line
  @Prop() 
  private sectionLinks!: LinkModel[];

  public get title(): string {

    return this.sectionTitle;

  }
  public get links(): LinkModel[] {

    return this.sectionLinks;

  }

}
</script>
<style scoped=true>
ul {
  padding-inline-start: 10px;
}
li {
      list-style-type: none;
}
</style>
