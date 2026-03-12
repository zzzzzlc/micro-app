import React from 'react';
import { Layout, Menu, Typography } from 'antd';
import 'antd/dist/reset.css';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const navItems = [
  {
    key: 'app1',
    label: <a href="/app1">React App 1</a>,
    description: '/app1 · SystemJS',
  },
  {
    key: 'app2',
    label: <a href="/app2">Vue App 1</a>,
    description: '/app2 · 预留',
  },
];

export function ShellLayout() {
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
            // mode="inline"
            defaultSelectedKeys={['app1']}
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
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#e5e7eb',
                }}
              >
                子应用挂载区域
              </Text>
              <Tag
                color="geekblue"
                style={{ borderRadius: 999, fontSize: 11 }}
              >
                single-spa application outlet
              </Tag>
            </div>
            <div style={{ fontSize: 12, color: '#9ca3af' }}>
              当路由匹配到 <code>/app1</code>、<code>/app2</code> 等前缀时，
              对应子应用会被挂载到下方容器中。
            </div>
          </div>

          <div
            id="app"
            style={{
              borderRadius: 12,
              border: '1px dashed #4b5563',
              background: '#020617',
              minHeight: 180,
              padding: 12,
              color: '#9ca3af',
              fontSize: 12,
            }}
          >
            {/* 子应用会在此区域挂载 */}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

