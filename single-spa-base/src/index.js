import { registerApplication, start } from 'single-spa';
import { config } from '../config/index';
// 注册子应用
config.forEach(item => {
    registerApplication({
        name: item.name,
        app: () => System.import(item.href),
        activeWhen: item.activeWhen,
        customProps: {...item.customProps }
    });
});
start();