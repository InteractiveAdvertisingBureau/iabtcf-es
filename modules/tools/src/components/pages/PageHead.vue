<template>
  <div>
    <p>
      <router-link v-if="$route.path !== '/'" to="/">home</router-link>
    </p>
    <h1>{{ title }}</h1>
  </div>
</template>

<script src="./PageHead.vue.ts"></script>
