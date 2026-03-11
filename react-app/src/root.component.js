import React from 'react';
import ReactDOM from "react-dom";
import singleSpaReact from 'single-spa-react';

const Root = () => {
  return (
    <div style={{ padding: '20px', background: '#f0f0f0' }}>
      <h1>React App 1</h1>
      <p>这是第一个微前端子应用</p>
    </div>
  );
};

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  errorBoundary(err, info, props) {
    return <div>Error: {err.message}</div>;
  }
});

export const { bootstrap, mount, unmount } = lifecycles;