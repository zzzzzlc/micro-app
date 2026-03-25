import { pathPrefix } from '../src/activity-functions';

// 浏览器直接从宿主机访问，使用 localhost
// Docker 容器间通信使用服务名
export const config = [
  {
    name: 'react_app_1',
    href: 'http://localhost:8082/react_app_1.js',
    activeWhen: pathPrefix('/app1'),
  },
  {
    name: 'vue_app_1',
    href: 'http://localhost:8083/vue_app_1.js',
    activeWhen: pathPrefix('/app2'),
    domId: 'app',
  },
];
