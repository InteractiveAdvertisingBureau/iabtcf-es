<template>
  <div>
    <h3>{{ title }}</h3>
    <p v-for="(link, index) in links" :key="index">
    <router-link :to="{name:link.getLink()}" >{{ link.getTitle() }}</router-link>
    </p>
  </div>
</template>

<script src="./NavGroup.vue.ts" lang="ts">
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
</style>
