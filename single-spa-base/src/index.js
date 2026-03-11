import { registerApplication, start } from 'single-spa';
import { pathPrefix } from './activity-functions';

// 配置子应用的远程入口
// const importMaps = {
//     imports: {
//       '@org/root-config': 'http://localhost:8081/root-config.js',
//       'react-app-1': 'http://localhost:8082/remoteEntry.js',
//     //   'react-app-2': 'http://app2.local:3002/remoteEntry.js',
//     //   'util-module': 'http://util.local:3003/remoteEntry.js',
//       'react': 'https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js',
//       'react-dom': 'https://cdn.jsdelivr.net/npm/react-dom@18/umd/react-dom.production.min.js'
//     }
//   };
  
  // // 注入 import map
  // const script = document.createElement('script');
  // script.type = 'systemjs-importmap';
  // script.textContent = JSON.stringify(importMaps);
  // document.head.appendChild(script);
  // console.log(document.querySelector('script[type="systemjs-importmap"]'));

// 注册子应用
registerApplication({
  name: 'react_app_1',
  app: () => System.import('react_app_1'),
  activeWhen: pathPrefix('/app1'),
  customProps: {
    test: '这是传递给子应用的自定义属性'
   }
});


// registerApplication({
//   name: 'react-app-2',
//   app: () => System.import('react-app-2'),
//   activeWhen: pathPrefix('/app2'),
//   customProps: { }
// });

// 启动 single-spa
start();