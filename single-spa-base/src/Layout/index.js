import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import MicroAppContainer from './MicroAppContainer';
import GlobalStyles from './GlobalStyles';
import NotificationSystem from './NotificationSystem';
import useAppStatus from './hooks/useAppStatus';
import useLayoutResponsive from './hooks/useLayoutResponsive';

const RootLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentApp, setCurrentApp] = useState(null);
  const appStatus = useAppStatus();
  const { isMobile, isTablet } = useLayoutResponsive();

  // 响应式侧边栏控制
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile]);

  // 应用切换处理
  const handleAppSwitch = (appName) => {
    setCurrentApp(appName);
    // 移动端切换应用后关闭侧边栏
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <LayoutWrapper>
      <GlobalStyles />
      
      {/* 全局通知系统 */}
      <NotificationSystem />
      
      {/* 顶部导航栏 */}
      <Header 
        sidebarOpen={sidebarOpen}
        onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
        currentApp={currentApp}
        appStatus={appStatus}
      />

      <MainContentWrapper sidebarOpen={sidebarOpen}>
        {/* 侧边菜单栏 */}
        <Sidebar 
          isOpen={sidebarOpen}
          onAppSwitch={handleAppSwitch}
          currentApp={currentApp}
          isMobile={isMobile}
        />

        {/* 内容区域 */}
        <ContentArea>
          <MicroAppContainer 
            currentApp={currentApp}
            appStatus={appStatus}
            onAppChange={setCurrentApp}
          />
        </ContentArea>
      </MainContentWrapper>

      {/* 底部状态栏 */}
      <Footer appStatus={appStatus} />
    </LayoutWrapper>
  );
};

// 布局容器组件
const LayoutWrapper = ({ children }) => (
  <div className="root-layout">
    {children}
  </div>
);

// 主内容包装器
const MainContentWrapper = ({ children, sidebarOpen }) => (
  <div className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
    {children}
  </div>
);

// 内容区域
const ContentArea = ({ children }) => (
  <div className="content-area">
    {children}
  </div>
);

export default RootLayout;