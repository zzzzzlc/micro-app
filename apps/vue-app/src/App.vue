<template>
  <div class="app-root">
    <HomePage :globalState="globalState" :navigation="navigation" />
  </div>
</template>

<script>
import HomePage from './HomePage.vue';

export default {
  name: 'VueAppRoot',
  components: { HomePage },
  props: {
    globalState: Object,
    navigation: Object,
  },
};
</script>

<style scoped>
.app-root {
  width: 100%;
  height: 100%;
}
</style>

