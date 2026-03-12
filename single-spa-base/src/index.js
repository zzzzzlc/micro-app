import React from 'react';
import ReactDOMClient from 'react-dom/client';
import { registerApplication, start } from 'single-spa';
import { config } from '../config/index';
import { ShellLayout } from './ShellLayout';

// 渲染基座 React UI
const container = document.getElementById('root');
if (container) {
  const root = ReactDOMClient.createRoot(container);
  root.render(<ShellLayout />);
}

// 注册子应用
config.forEach((item) => {
  registerApplication({
    name: item.name,
    app: () => System.import(item.href),
    activeWhen: item.activeWhen,
    customProps: { ...(item.customProps || {}) },
  });
});

start();