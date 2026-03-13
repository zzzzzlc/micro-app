import Vue from 'vue';
import singleSpaVue from 'single-spa-vue';
import App from './App.vue';

const vueLifecycles = singleSpaVue({
  Vue,
  // 注意：single-spa-vue 在运行时只会传入一个参数（singleSpaProps）
  appOptions: (singleSpaProps) => {
    const props = singleSpaProps || {};

    const domElement =
      props.domElement
        ? props.domElement
        : typeof props.domElementGetter === 'function'
          ? props.domElementGetter(props)
          : document.getElementById('app');

    return Promise.resolve({
      el: domElement,
      render(h) {
        // props 由 single-spa 注入，包含 globalState / navigation / domElementGetter
        return h(App, {
          props: {
            globalState: props.globalState,
            navigation: props.navigation,
          },
        });
      },
    });
  },
});

export const { bootstrap, mount, unmount } = vueLifecycles;

