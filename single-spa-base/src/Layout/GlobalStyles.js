import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --primary-color: #1890ff;
    --secondary-color: #1890ff;
    --success-color: #52c41a;
    --warning-color: #faad14;
    --error-color: #f5222d;
    --text-primary: #000000;
    --text-secondary: #000000;
    --border-color: #f0f0f0;
    --background-color: #f5f5f5;
    --card-background: #ffffff;
    --shadow-color: rgba(0, 0, 0, 0.08);
    
    --header-height: 64px;
    --sidebar-width: 260px;
    --sidebar-collapsed-width: 80px;
    --footer-height: 40px;
    --content-padding: 24px;
  }

  html {
    font-size: 16px;
    line-height: 1.5;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB',
      'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: var(--text-primary);
    background-color: var(--background-color);
  }

  /* 根布局容器 */
  .root-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    overflow: hidden;
  }

  /* 主内容区域 */
  .main-content {
    display: flex;
    flex: 1;
    overflow: hidden;
    transition: margin-left var(--transition-duration, 0.3s) ease;
  }

  .main-content.sidebar-open {
    margin-left: var(--sidebar-width);
  }

  .main-content.sidebar-closed {
    margin-left: var(--sidebar-collapsed-width);
  }

  /* 内容区域 */
  .content-area {
    flex: 1;
    padding: var(--content-padding);
    overflow-y: auto;
    background-color: var(--background-color);
  }

  /* 响应式布局 */
  @media (max-width: 768px) {
    .main-content.sidebar-open {
      margin-left: 0;
    }

    .main-content.sidebar-closed {
      margin-left: 0;
    }

    :root {
      --content-padding: 16px;
      --header-height: 56px;
    }
  }

  @media (max-width: 1024px) {
    :root {
      --sidebar-width: 240px;
      --sidebar-collapsed-width: 0;
    }
  }

  /* 微应用容器样式 */
  .micro-app-container {
    width: 100%;
    min-height: calc(100vh - var(--header-height) - var(--footer-height));
    background-color: var(--card-background);
    border-radius: 8px;
    box-shadow: 0 1px 2px var(--shadow-color);
  }

  /* 滚动条样式 */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
`;

export default GlobalStyles;