import Vue from 'vue';
import singleSpaVue from 'single-spa-vue';
import App from './App.vue';

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    render(h) {
      // props 由 single-spa 注入，包含 globalState / navigation
      return h(App, {
        props: {
          globalState: this.globalState,
          navigation: this.navigation,
        },
      });
    },
    el: '#app',
  },
});

export const { bootstrap, mount, unmount } = vueLifecycles;

