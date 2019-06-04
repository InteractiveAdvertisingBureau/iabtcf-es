<template>
  <div class="tools-app">
    <Nav />
    <div class="page">
      <transition
        name="fade"
        mode="out-in"
      >
        <router-view />
      </transition>
    </div>
  </div>
</template>
<script src="./App.vue.ts" lang="ts"></script>
<style lang="scss">
  @import './styles/index.scss';
</style>
