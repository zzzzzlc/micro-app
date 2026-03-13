<template>
  <div class="home-page">
    <h1>Vue App 1</h1>
    <p>这是第二个微前端子应用（Vue）。</p>
    <p>当前全局主题：{{ theme }}</p>
    <div class="actions">
      <button type="button" @click="toggleTheme">切换全局主题</button>
      <button type="button" @click="goReactApp">跳转到 React 子应用 (/app1)</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  props: {
    globalState: Object,
    navigation: Object,
  },
  data() {
    return {
      theme: (this.globalState && this.globalState.getGlobalState().theme) || 'light',
      unsubscribe: null,
    };
  },
  mounted() {
    if (this.globalState) {
      this.unsubscribe = this.globalState.subscribe((next) => {
        this.theme = next.theme || 'light';
      });
    }
  },
  beforeDestroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  },
  methods: {
    toggleTheme() {
      if (!this.globalState) return;
      const nextTheme = this.theme === 'dark' ? 'light' : 'light';
      this.globalState.setGlobalState({ theme: nextTheme });
    },
    goReactApp() {
      if (this.navigation) {
        this.navigation.navigateTo('/app1');
      }
    },
  },
};
</script>

<style scoped>
.home-page {
  text-align: left;
  padding: 20px;
}
.actions {
  margin-top: 12px;
  display: flex;
  gap: 8px;
}
button {
  padding: 6px 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  cursor: pointer;
}
</style>

