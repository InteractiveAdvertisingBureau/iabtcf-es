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

<script src="./Nav.vue.ts" lang="ts">
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
