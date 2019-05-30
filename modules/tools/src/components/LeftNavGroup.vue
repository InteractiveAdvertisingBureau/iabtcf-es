<template>
  <div>
    <h3>{{ title }}</h3>
  </div>
</template>

<script>
export default {
  name: 'LeftNavGroup',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped>
  h3 {
    border-bottom: 1px solid #ccc
  }
</style>
