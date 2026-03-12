import React, { useState } from 'react';
import styled from 'styled-components';
import { Menu, Search, Bell, User, Setting, Fullscreen } from '@ant-design/icons';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';
import NotificationPanel from './NotificationPanel';

const Header = ({ sidebarOpen, onSidebarToggle, currentApp, appStatus }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handleSearch = (query) => {
    console.log('Search:', query);
    // 实现全局搜索功能
  };

  return (
    <HeaderContainer>
      <LeftSection>
        <MenuButton 
          onClick={onSidebarToggle}
          aria-label="切换侧边栏"
        >
          <Menu />
        </MenuButton>
        
        <AppIndicator>
          {currentApp ? getAppDisplayName(currentApp) : '微前端平台'}
        </AppIndicator>
        
        <AppStatusIndicator status={appStatus[currentApp]}>
          {getAppStatusText(appStatus[currentApp])}
        </AppStatusIndicator>
      </LeftSection>

      <CenterSection>
        <SearchButton onClick={() => setSearchOpen(true)}>
          <Search />
          <span>搜索</span>
        </SearchButton>
      </CenterSection>

      <RightSection>
        <ToolbarButton onClick={() => setNotificationOpen(true)}>
          <Bell />
          <NotificationBadge>3</NotificationBadge>
        </ToolbarButton>

        <ToolbarButton onClick={handleFullscreen}>
          <Fullscreen />
        </ToolbarButton>

        <UserButton onClick={() => setUserMenuOpen(!userMenuOpen)}>
          <UserAvatar src="/api/user/avatar" alt="用户头像" />
        </UserButton>
      </RightSection>

      {/* 搜索栏模态框 */}
      {searchOpen && (
        <SearchBar 
          onClose={() => setSearchOpen(false)}
          onSearch={handleSearch}
        />
      )}

      {/* 通知面板 */}
      {notificationOpen && (
        <NotificationPanel 
          onClose={() => setNotificationOpen(false)}
        />
      )}

      {/* 用户菜单 */}
      {userMenuOpen && (
        <UserMenu 
          onClose={() => setUserMenuOpen(false)}
        />
      )}
    </HeaderContainer>
  );
};

// 辅助函数
const getAppDisplayName = (appName) => {
  const appNames = {
    'react_app_1': '应用中心',
    'react_app_2': '数据分析',
    'admin_app': '系统管理'
  };
  return appNames[appName] || appName;
};

const getAppStatusText = (status) => {
  const statusTexts = {
    'LOADING': '加载中',
    'LOADED': '已加载',
    'MOUNTED': '运行中',
    'ERROR': '错误'
  };
  return statusTexts[status] || '未知';
};

// 样式组件
const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-height);
  padding: 0 24px;
  background: var(--card-background);
  border-bottom: 1px solid var(--border-color);
  box-shadow: 0 2px 8px var(--shadow-color);
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
`;

const CenterSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  justify-content: flex-end;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: background 0.3s;
  color: var(--text-secondary);

  &:hover {
    background: var(--background-color);
  }
`;

const AppIndicator = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: var(--text-primary);
`;

const AppStatusIndicator = styled.span`
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  background: ${props => {
    const colors = {
      'LOADING': '#e6f7ff',
      'LOADED': '#f6ffed',
      'MOUNTED': '#52c41a',
      'ERROR': '#fff2f0'
    };
    return colors[props.status] || '#f0f0f0';
  }};
  color: ${props => {
    const colors = {
      'LOADING': '#1890ff',
      'LOADED': '#52c41a',
      'MOUNTED': '#ffffff',
      'ERROR': '#f5222d'
    };
    return colors[props.status] || '#000000';
  }};
`;

const SearchButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s;
  color: var(--text-secondary);

  &:hover {
    background: var(--card-background);
    border-color: var(--primary-color);
    color: var(--primary-color);
  }
`;

const ToolbarButton = styled.button`
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: background 0.3s;
  color: var(--text-secondary);

  &:hover {
    background: var(--background-color);
  }
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: 4px;
  right: 4px;
  background: var(--error-color);
  color: white;
  border-radius: 10px;
  padding: 0 6px;
  font-size: 10px;
  font-weight: bold;
`;

const UserButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  transition: background 0.3s;

  &:hover {
    background: var(--background-color);
  }
`;

const UserAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

export default Header;