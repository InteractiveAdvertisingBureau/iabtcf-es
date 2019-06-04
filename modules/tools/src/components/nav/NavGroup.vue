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

<script src="./NavGroup.vue.ts" lang="ts"></script>
<style scoped=true>
ul {
  padding-inline-start: 10px;
}
li {
      list-style-type: none;
}
</style>
