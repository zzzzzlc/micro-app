import Vue from 'vue';
import App2RootComponent from './App2RootComponent.vue';

export const bootstrap = () => {
  console.log('app2 bootstrapped');
};

export const mount = (container) => {
  new Vue({
    render: (h) => h(App2RootComponent),
  }).$mount(container);
};

export const unmount = (container) => {
  container.innerHTML = '';
};
