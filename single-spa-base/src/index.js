import React from 'react';
import ReactDOMClient from 'react-dom/client';
import { registerApplication, start } from 'single-spa';
import { config } from '../config/index';
import { ShellLayout } from './ShellLayout';
import { sharedProps } from './shared-app-context';
import { domElementGetterForApp } from './tab-outlets';
// 开发调试插件：子应用地址覆盖（仅开发环境动态加载）

// 渲染基座 React UI
const container = document.getElementById('root');
if (container) {
  const root = ReactDOMClient.createRoot(container);
  root.render(<ShellLayout />);
}

// 开发调试插件：覆盖子应用地址（可选启用，仅开发环境）
if (process.env.NODE_ENV !== 'production') {
  import('./plugins/importmap-overrides')
    .then(({ enableImportMapOverrides }) => enableImportMapOverrides(config))
    .catch(() => {});
}

// 注册子应用，注入全局通信能力
config.forEach((item) => {
  console.log('registerApplication', item);
  registerApplication({
    name: item.name,
    // 直接使用 href（可被开发插件覆盖），避免 bare specifier 解析问题
    app: () => System.import(item.href),
    activeWhen: item.activeWhen,
    customProps: {
      ...(item.customProps || {}),
      ...sharedProps,
      domElementGetter: domElementGetterForApp(item.name),
    },
  });
});

start();