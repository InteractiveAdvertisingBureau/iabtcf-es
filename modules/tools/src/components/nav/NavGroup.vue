<template>
  <div>
    <h3>{{ title }}</h3>
    <p v-for="(link, index) in links" :key="index" v-on:click="$emit(this.events.NavItemClick)" >{{ link.getTitle() }}</p>
  </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator';
import { LinkModel } from '../model/LinkModel';
import { Events } from '../Events';

@Component
export default class NavGroup extends Vue {

  @Prop() private sectionTitle: string;
  @Prop() private sectionLinks: LinkModel[];

  public get title(): string {
    return this.sectionTitle;
  }
  public get links(): LinkModel[] {
    return this.sectionLinks;
  }
  public get events(): Events {
    return Events;
  }


}

</script>

<style scoped>
div {
  float: left;
}
  h3 {
    margin-top: 0px;
    padding-top: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
  }
  p {
    color: #DA70D6;
  }
  p:hover {
    cursor: pointer;
  }
</style>
