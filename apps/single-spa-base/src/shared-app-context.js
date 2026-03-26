// 全局应用级状态与事件通信中心

const globalState = {
  user: null,
  theme: 'light',
};

const listeners = new Set();

export const getGlobalState = () => ({ ...globalState });

export const setGlobalState = (partial) => {
  Object.assign(globalState, partial);
  listeners.forEach((listener) => {
    try {
      listener(getGlobalState());
    } catch (e) {
      // 单个监听器异常不影响整体
    }
  });
};

export const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

// 全局导航：供子应用间跳转使用
export const navigateTo = (url) => {
  if (window.location.pathname === url) {return;}
  window.history.pushState({}, '', url);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

// 汇总给 single-spa 的 customProps 使用
export const sharedProps = {
  globalState: {
    getGlobalState,
    setGlobalState,
    subscribe,
  },
  navigation: {
    navigateTo,
  },
};

