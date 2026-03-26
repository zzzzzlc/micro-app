import React from 'react';
import { Layout, Menu, Tag, Tabs, Typography } from 'antd';
import 'antd/dist/reset.css';
import { navigateTo } from './shared-app-context';
import { setActiveOutletId } from './tab-outlets';
import { unloadApplication } from 'single-spa';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const navItems = [
  {
    key: '/app1',
    label: 'React App 1',
    description: '/app1 · SystemJS',
  },
  {
    key: '/app2',
    label: 'vue App 2 (预留)',
    description: '/app2 · 预留',
  },
];

export function ShellLayout() {
  const [selectedKeys, setSelectedKeys] = React.useState([]);
  const [tabs, setTabs] = React.useState([]);
  const [activeTabKey, setActiveTabKey] = React.useState('');

  const tabKeyFromPath = (pathname) => pathname || '/';
  const appNameFromPath = (pathname) => {
    if ((pathname || '').startsWith('/app1')) {return 'react_app_1';}
    if ((pathname || '').startsWith('/app2')) {return 'vue_app_1';}
    return null;
  };

  const ensureTabForPath = React.useCallback((pathname) => {
    const key = tabKeyFromPath(pathname);
    const appName = appNameFromPath(pathname);
    if (!appName) {return;}

    const outletId = `outlet:${key}`;

    // 关键：在路由切换触发 single-spa 挂载前，确保 outlet 容器真实存在于 DOM
    // 否则 domElementGetter 会回退到 #app，而 #app 若被隐藏会造成“容器里没内容”
    const appContainer = document.getElementById('app');
    if (appContainer && !document.getElementById(outletId)) {
      const outlet = document.createElement('div');
      outlet.id = outletId;
      appContainer.appendChild(outlet);
    }

    setTabs((prev) => {
      if (prev.some((t) => t.key === key)) {return prev;}
      return [
        ...prev,
        {
          key,
          label: key,
          appName,
          outletId,
        },
      ];
    });
    setActiveTabKey(key);
    setActiveOutletId(appName, outletId);
  }, []);

  const syncOutletVisibility = React.useCallback((nextActiveKey, nextTabs) => {
    const activeKey = nextActiveKey || '';
    (nextTabs || []).forEach((t) => {
      const el = document.getElementById(t.outletId);
      if (!el) {return;}
      el.style.display = t.key === activeKey ? '' : 'none';
    });
  }, []);

  React.useEffect(() => {
    syncOutletVisibility(activeTabKey, tabs);
  }, [activeTabKey, tabs, syncOutletVisibility]);

  React.useEffect(() => {
    ensureTabForPath(window.location.pathname);
    const handler = () => ensureTabForPath(window.location.pathname);
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, [ensureTabForPath]);
  const handleMenuClick = (e) => {
    setSelectedKeys([e.key]);
    navigateTo(e.key);
  };

  const onTabChange = async (key) => {
    setActiveTabKey(key);
    setSelectedKeys([key]);
    const tab = tabs.find((t) => t.key === key);
    if (!tab) {return;}

    // 切换 tab 时，确保该 app 的挂载容器指向这个 tab 的 outlet
    setActiveOutletId(tab.appName, tab.outletId);

    // 同一个应用在不同子路由 tab 之间切换时，主动卸载以触发重新挂载到新容器
    // try {
    //   await unloadApplication(tab.appName, { waitForUnmount: true });
    // } catch (err) {
    // }
    navigateTo(key);
  };
  const onTabClose = (key) => {
    setTabs((prev) => prev.filter((t) => t.key !== key));
    if (activeTabKey === key) {
      const next = tabs.find((t) => t.key !== key);
      if (next) {
        onTabChange(next.key);
      } else {
        setSelectedKeys([]);
        navigateTo('/');
      }
    }
  };
  const onTabEdit = (targetKey, action) => {
    if (action !== 'add') {
      onTabClose(targetKey);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        width={260}
        style={{
          background:
            'radial-gradient(circle at top, #0f172a, #020617 60%)',
          borderRight: '1px solid #1f2937',
        }}
      >
        <div
          style={{
            height: 56,
            display: 'flex',
            alignItems: 'center',
            paddingInline: 16,
            borderBottom: '1px solid #1f2937',
            gap: 10,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 999,
              background:
                'conic-gradient(from 140deg, #3b82f6, #22c55e, #eab308, #3b82f6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              fontWeight: 600,
              color: '#020617',
            }}
          >
            MF
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#e5e7eb' }}>
              Microfrontend Shell
            </div>
            <div style={{ fontSize: 11, color: '#9ca3af' }}>
              single-spa 根基座
            </div>
          </div>
        </div>

        <div style={{ padding: 12 }}>
          <Text
            style={{
              display: 'block',
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: 2,
              color: '#9ca3af',
              marginBottom: 8,
            }}
          >
            子应用
          </Text>
          <Menu
            defaultSelectedKeys={['app1']}
            selectedKeys={selectedKeys}
            onClick={handleMenuClick}
            items={navItems.map((item) => ({
              key: item.key,
              label: (
                <div>
                  <div style={{ fontSize: 13 }}>{item.label}</div>
                  <div
                    style={{
                      fontSize: 11,
                      color: '#9ca3af',
                      marginTop: 2,
                    }}
                  >
                    {item.description}
                  </div>
                </div>
              ),
            }))}
            style={{
              borderInline: 'none',
              background: 'transparent',
            }}
          />

          <div
            style={{
              marginTop: 16,
              paddingTop: 10,
              borderTop: '1px dashed #374151',
              fontSize: 11,
              color: '#9ca3af',
            }}
          >
            <div>点击左侧链接在右侧区域挂载子应用。</div>
            <div style={{ marginTop: 4 }}>
              配置来自 <code>config/index.js</code>
            </div>
          </div>
        </div>
      </Sider>

      <Layout>
        <Header
          style={{
            background:
              'radial-gradient(circle at top left, rgba(56,189,248,0.2), transparent)',
            borderBottom: '1px solid #1f2937',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingInline: 20,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: '#e5e7eb',
              }}
            >
              微前端基座
            </div>
          </div>
          <Tag color="blue" bordered={false}>
            Shell running on 8081
          </Tag>
        </Header>

        <Content
          style={{
            padding: 20,
            background:
              'radial-gradient(circle at top left, #020617, #020617)',
          }}
        >
          <div
            style={{
              borderRadius: 14,
              border: '1px solid #1f2937',
              padding: 16,
              marginBottom: 12,
              background:
                'radial-gradient(circle at top left, rgba(37,99,235,0.25), rgba(15,23,42,0.98))',
            }}
          >
            <div style={{ fontSize: 12, color: '#9ca3af' }}>
              当路由匹配到 <code>/app1</code>、<code>/app2</code> 等前缀时，
              对应子应用会被挂载到下方容器中。
            </div>
          </div>
          <Tabs
            size="small"
            type="editable-card"
            hideAdd
            activeKey={activeTabKey || (tabs[0] && tabs[0].key) || ''}
            onChange={onTabChange}
            onEdit={onTabEdit}
            items={tabs.map((t) => ({
              key: t.key,
              label: t.label,
              // outlet DOM 已在 #app 内创建，这里只负责 tab 展示
              children: null,
            }))}
          />
          <div
            style={{
              borderRadius: 12,
              border: '1px dashed #4b5563',
              background: '#020617',
              minHeight: 180,
              padding: 12,
              color: '#9ca3af',
              fontSize: 12,
              marginTop: 12,
            }}
          >
            <div id="app" />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

