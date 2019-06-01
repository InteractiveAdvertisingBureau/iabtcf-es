<template>
  <div>
    <h3>{{ title }}</h3>
    <p v-for="(link, index) in links" :key="index" >{{ link.getTitle() }}</p>
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
  p {
    color: #DA70D6;
  }
  p:hover {
    cursor: pointer;
  }
</style>
