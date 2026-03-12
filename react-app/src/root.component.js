import React from 'react';
import ReactDOMClient from 'react-dom/client';
import singleSpaReact from 'single-spa-react';

const Root = (props) => {
  console.log('子应用接收到的props:', props);
  return (
    <div style={{ padding: '20px', background: '#f0f0f0' }}>
      <h1>React App 1</h1>
      <p>这是第一个微前端子应用</p>
    </div>
  );
};

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: Root,
  errorBoundary(err, info, props) {
    return <div>Error: {err.message}</div>;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;