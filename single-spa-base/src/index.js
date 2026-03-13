import React from 'react';
import ReactDOMClient from 'react-dom/client';
import { registerApplication, start } from 'single-spa';
import { config } from '../config/index';
import { ShellLayout } from './ShellLayout';
import { sharedProps } from './shared-app-context';

// 渲染基座 React UI
const container = document.getElementById('root');
if (container) {
  const root = ReactDOMClient.createRoot(container);
  root.render(<ShellLayout />);
}

// 注册子应用，注入全局通信能力
config.forEach((item) => {
  console.log('registerApplication', item);
  registerApplication({
    name: item.name,
    app: () => System.import(item.href),
    activeWhen: item.activeWhen,
    customProps: {
      ...(item.customProps || {}),
      ...sharedProps,
    },
  });
});

start();