import Vue from 'vue';
import singleSpaVue from 'single-spa-vue';
import App from './App.vue';

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: (opts, props) => {
    const domElement =
      props && props.domElement
        ? props.domElement
        : props && typeof props.domElementGetter === 'function'
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

