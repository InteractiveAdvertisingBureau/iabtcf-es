<template>
  <div class="nav">
    <div class="nav-groups">
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

<script src="./Nav.vue.ts" lang="ts">
</script>
<style scoped>
</style>
