import React, { useEffect, useState } from 'react';
import ReactDOMClient from 'react-dom/client';
import singleSpaReact from 'single-spa-react';

const Root = (props) => {
  const { globalState, navigation } = props;
  const [state, setState] = useState(
    globalState ? globalState.getGlobalState() : {},
  );

  useEffect(() => {
    if (!globalState) return undefined;
    const unsubscribe = globalState.subscribe((next) => {
      setState(next);
    });
    return unsubscribe;
  }, [globalState]);

  const updateTheme = () => {
    if (!globalState) return;
    const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
    globalState.setGlobalState({ theme: nextTheme });
  };

  const goToVueApp = () => {
    if (navigation) {
      navigation.navigateTo('/app2');
    }
  };

  return (
    <div style={{ padding: '20px', background: '#f0f0f0' }}>
      <h1>React App 1</h1>
      <p>这是第一个微前端子应用</p>
      <p>当前全局主题：{state.theme || 'light'}</p>
      <button type="button" onClick={updateTheme}>
        切换全局主题
      </button>
      <button
        type="button"
        style={{ marginLeft: 12 }}
        onClick={goToVueApp}
      >
        跳转到 Vue 子应用 (/app2)
      </button>
    </div>
  );
};

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: Root,
  domElementGetter() {
    return document.getElementById('app');
  },
  errorBoundary(err) {
    return <div>Error: {err.message}</div>;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;