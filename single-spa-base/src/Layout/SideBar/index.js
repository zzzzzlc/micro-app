import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  HomeOutlined, 
  AppstoreOutlined, 
  SettingOutlined,
  UserOutlined,
  FileTextOutlined,
  BarChartOutlined,
  TeamOutlined 
} from '@ant-design/icons';
import SubMenu from './SubMenu';

const Sidebar = ({ isOpen, onAppSwitch, currentApp, isMobile }) => {
  const [expandedMenus, setExpandedMenus] = useState(['apps']);

  const toggleMenu = (menuId) => {
    setExpandedMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const menuItems = [
    {
      id: 'dashboard',
      icon: <HomeOutlined />,
      label: '工作台',
      path: '/dashboard',
      app: null
    },
    {
      id: 'apps',
      icon: <AppstoreOutlined />,
      label: '应用中心',
      children: [
        {
          id: 'react_app_1',
          label: '应用管理',
          path: '/app1',
          app: 'react_app_1'
        },
        {
          id: 'react_app_2',
          label: '数据分析',
          path: '/app2',
          app: 'react_app_2'
        }
      ]
    },
    {
      id: 'reports',
      icon: <FileTextOutlined />,
      label: '报表中心',
      children: [
        {
          id: 'financial',
          label: '财务报表',
          path: '/reports/financial',
          app: 'react_app_1'
        },
        {
          id: 'business',
          label: '业务报表',
          path: '/reports/business',
          app: 'react_app_2'
        }
      ]
    },
    {
      id: 'data',
      icon: <BarChartOutlined />,
      label: '数据分析',
      path: '/data',
      app: 'react_app_2'
    },
    {
      id: 'team',
      icon: <TeamOutlined />,
      label: '团队管理',
      path: '/team',
      app: 'admin_app'
    },
    {
      id: 'settings',
      icon: <SettingOutlined />,
      label: '系统设置',
      path: '/settings',
      app: 'admin_app'
    }
  ];

  const renderMenuItem = (item) => {
    if (item.children) {
      return (
        <SubMenu
          key={item.id}
          item={item}
          isExpanded={expandedMenus.includes(item.id)}
          onToggle={() => toggleMenu(item.id)}
          onAppSwitch={onAppSwitch}
          currentApp={currentApp}
        />
      );
    }

    const isActive = currentApp === item.app;
    return (
      <MenuItem 
        key={item.id}
        active={isActive}
        onClick={() => onAppSwitch(item.app)}
      >
        <MenuIcon>{item.icon}</MenuIcon>
        <MenuText>{item.label}</MenuText>
        {isActive && <ActiveIndicator />}
      </MenuItem>
    );
  };

  return (
    <SidebarContainer isOpen={isOpen} isMobile={isMobile}>
      <SidebarHeader>
        <LogoIcon />
        <LogoText>微前端平台</LogoText>
      </SidebarHeader>

      <SidebarContent>
        <MenuList>
          {menuItems.map(renderMenuItem)}
        </MenuList>
      </SidebarContent>

      <SidebarFooter>
        <UserInfo>
          <UserAvatar src="/api/user/avatar" alt="用户头像" />
          <UserInfoText>
            <UserName>张三</UserName>
            <UserRole>管理员</UserRole>
          </UserInfoText>
        </UserInfo>
      </SidebarFooter>
    </SidebarContainer>
  );
};

// 样式组件
const SidebarContainer = styled.div`
  position: fixed;
  top: var(--header-height);
  left: 0;
  bottom: 0;
  width: ${props => props.isOpen ? 'var(--sidebar-width)' : 'var(--sidebar-collapsed-width)'};
  background: var(--card-background);
  border-right: 1px solid var(--border-color);
  transition: width 0.3s ease;
  z-index: 999;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 768px) {
    width: ${props => props.isOpen ? '260px' : '0'};
    transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  }
`;

const SidebarHeader = styled.div`
  height: 60px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
  overflow: hidden;
  white-space: nowrap;
`;

const LogoIcon = styled.div`
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border-radius: 6px;
  flex-shrink: 0;
`;

const LogoText = styled.span`
  margin-left: 12px;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
`;

const SidebarContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 12px 0;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MenuItem = styled.li`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.3s;
  border-left: 3px solid transparent;
  
  &:hover {
    background: var(--background-color);
  }
  
  ${props => props.active && `
    background: #e6f7ff;
    border-left-color: var(--primary-color);
    color: var(--primary-color);
  `}
`;

const MenuIcon = styled.span`
  font-size: 18px;
  margin-right: 12px;
  flex-shrink: 0;
`;

const MenuText = styled.span`
  font-size: 14px;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ActiveIndicator = styled.div`
  width: 6px;
  height: 6px;
  background: var(--primary-color);
  border-radius: 50%;
`;

const SidebarFooter = styled.div`
  padding: 16px;
  border-top: 1px solid var(--border-color);
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const UserAvatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserInfoText = styled.div`
  flex: 1;
  min-width: 0;
`;

const UserName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UserRole = styled.div`
  font-size: 12px;
  color: var(--text-secondary);
  margin-top: 2px;
`;

export default Sidebar;