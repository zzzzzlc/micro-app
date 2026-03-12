import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { LoadingOutlined, ReloadOutlined, FullscreenOutlined } from '@ant-design/icons';

const MicroAppContainer = ({ currentApp, appStatus, onAppChange }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [appContent, setAppContent] = useState(null);

  useEffect(() => {
    if (currentApp) {
      loadApp(currentApp);
    }
  }, [currentApp]);

  const loadApp = async (appName) => {
    setLoading(true);
    setError(null);

    try {
      // 加载微应用
      const appModule = await System.import(appName);
      setAppContent(appModule);
    } catch (err) {
      console.error('Failed to load app:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    if (currentApp) {
      loadApp(currentApp);
    }
  };

  const handleFullscreen = () => {
    const container = document.getElementById('micro-app-mount');
    if (container) {
      container.requestFullscreen();
    }
  };

  return (
    <Container>
      <Toolbar>
        <AppInfo>
          <AppTitle>{getAppName(currentApp)}</AppTitle>
          <AppStatus>
            <StatusIndicator status={appStatus[currentApp]} />
            {getStatusText(appStatus[currentApp])}
          </AppStatus>
        </AppInfo>

        <Actions>
          {error && (
            <RetryButton onClick={handleRetry}>
              <ReloadOutlined />
              重试
            </RetryButton>
          )}
          <FullscreenButton onClick={handleFullscreen}>
            <FullscreenOutlined />
          </FullscreenButton>
        </Actions>
      </Toolbar>

      <AppContent id="micro-app-mount">
        {loading && (
          <LoadingOverlay>
            <Spinner>
              <LoadingOutlined style={{ fontSize: 48 }} />
            </Spinner>
            <LoadingText>应用加载中...</LoadingText>
          </LoadingOverlay>
        )}

        {error && (
          <ErrorContainer>
            <ErrorIcon>⚠️</ErrorIcon>
            <ErrorMessage>应用加载失败</ErrorMessage>
            <ErrorDetails>{error.message}</ErrorDetails>
          </ErrorContainer>
        )}

        {appContent && !loading && !error && (
          <AppWrapper>
            {/* 微应用将挂载到这里 */}
          </AppWrapper>
        )}
      </AppContent>
    </Container>
  );
};

// 辅助函数
const getAppName = (appName) => {
  const names = {
    'react_app_1': '应用中心',
    'react_app_2': '数据分析',
    'admin_app': '系统管理'
  };
  return names[appName] || appName;
};

const getStatusText = (status) => {
  const texts = {
    'LOADING': '加载中',
    'LOADED': '已加载',
    'MOUNTED': '运行中',
    'ERROR': '错误'
  };
  return texts[status] || '未知';
};

// 动画效果
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// 样式组件
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--card-background);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid var(--border-color);
  background: #fafafa;
`;

const AppInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const AppTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
`;

const AppStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--text-secondary);
`;

const StatusIndicator = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => {
    const colors = {
      'LOADING': '#1890ff',
      'LOADED': '#52c41a',
      'MOUNTED': '#52c41a',
      'ERROR': '#f5222d'
    };
    return colors[props.status] || '#d9d9d9';
  }};
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RetryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #40a9ff;
  }
`;

const FullscreenButton = styled.button`
  padding: 8px;
  background: none;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: var(--background-color);
  }
`;

const AppContent = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
  animation: ${fadeIn} 0.3s ease;
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
`;

const Spinner = styled.div`
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.div`
  margin-top: 16px;
  font-size: 14px;
  color: var(--text-secondary);
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 40px;
  text-align: center;
`;

const ErrorIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const ErrorMessage = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 8px;
`;

const ErrorDetails = styled.div`
  font-size: 14px;
  color: var(--text-secondary);
  max-width: 400px;
`;

const AppWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;

export default MicroAppContainer;