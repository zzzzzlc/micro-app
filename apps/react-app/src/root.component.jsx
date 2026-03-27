import React, { useEffect, useState } from 'react';
import ReactDOMClient from 'react-dom/client';
import singleSpaReact from 'single-spa-react';
import { Button, Input, Card, CodePlayground } from '@microfontend/ui-components';

const COMPONENT_LIST = [
  { name: 'Button', desc: '按钮', tag: '基础' },
  { name: 'Input', desc: '输入框', tag: '数据录入' },
  { name: 'Card', desc: '卡片', tag: '数据展示' },
];

const TAG_COLORS = {
  '基础': '#7DC77D',
  '数据录入': '#1677FF',
  '数据展示': '#FA8C16',
};

function ComponentShowcase() {
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [selectedTags, setSelectedTags] = useState(['基础', '数据录入', '数据展示']);

  const filteredComponents = COMPONENT_LIST.filter((c) => selectedTags.includes(c.tag));

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  return (
    <div style={{ padding: 24, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Hero */}
      <div style={{
        padding: '40px 0 32px',
        textAlign: 'center',
        background: 'var(--gradient-card)',
        borderRadius: 16,
        marginBottom: 24,
      }}>
        <div style={{
          width: 64, height: 64, borderRadius: 16,
          background: 'var(--gradient-logo)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 28, fontWeight: 700, color: '#fff', margin: '0 auto 16px',
        }}>
          MF
        </div>
        <h1 style={{ marginBottom: 8, fontSize: 28, color: 'var(--text-primary)' }}>
          UI 组件库
        </h1>
        <p style={{ fontSize: 15, color: 'var(--text-secondary)', margin: '0 0 16px' }}>
          基于原生 React + CSS 独立封装，适配四季主题系统，开箱即用
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Button variant="primary" onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}>
            查看演示
          </Button>
          <Button variant="secondary">
            使用文档
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 16,
        marginBottom: 24,
      }}>
        <Card size="small">
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 600, color: 'var(--color-primary)' }}>3</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>组件总数</div>
          </div>
        </Card>
        <Card size="small">
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 600, color: 'var(--color-primary)' }}>1</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>基础组件</div>
          </div>
        </Card>
        <Card size="small">
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 600, color: 'var(--color-primary)' }}>2</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>业务组件</div>
          </div>
        </Card>
      </div>

      {/* Component Grid */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>组件一览</h3>
          <div style={{ display: 'flex', gap: 8 }}>
            {Object.keys(TAG_COLORS).map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  if (selectedTags.includes(tag)) {
                    setSelectedTags(selectedTags.filter((t) => t !== tag));
                  } else {
                    setSelectedTags([...selectedTags, tag]);
                  }
                }}
                style={{
                  padding: '4px 8px',
                  fontSize: 12,
                  borderRadius: 4,
                  border: '1px solid',
                  borderColor: selectedTags.includes(tag) ? TAG_COLORS[tag] : 'var(--border-base)',
                  background: selectedTags.includes(tag) ? TAG_COLORS[tag] : 'transparent',
                  color: selectedTags.includes(tag) ? '#fff' : 'var(--text-secondary)',
                  cursor: 'pointer',
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 12,
        }}>
          {filteredComponents.map((c) => (
            <Card key={c.name} hoverable size="small">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{c.name}</span>
                <span style={{
                  fontSize: 10,
                  padding: '2px 6px',
                  borderRadius: 4,
                  background: TAG_COLORS[c.tag],
                  color: '#fff',
                }}>
                  {c.tag}
                </span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
                {c.desc}
              </div>
            </Card>
          ))}
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-base)', margin: '24px 0' }} />

      {/* Live Demo */}
      <div id="demo">
        <h3 style={{ marginBottom: 16, color: 'var(--text-primary)' }}>交互演示</h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {/* Button Demo */}
          <Card title="Button 按钮">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              <Button variant="primary">主要按钮</Button>
              <Button variant="secondary">次要按钮</Button>
              <Button variant="dashed">虚线按钮</Button>
              <Button variant="text">文字按钮</Button>
              <Button variant="danger">危险按钮</Button>
            </div>
            <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              <Button size="small">小按钮</Button>
              <Button size="medium">中按钮</Button>
              <Button size="large">大按钮</Button>
            </div>
            <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              <Button variant="primary">点击加载</Button>
              <Button variant="secondary" disabled>禁用按钮</Button>
            </div>
          </Card>

          {/* Input Demo */}
          <Card title="Input 输入框">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Input
                placeholder="请输入内容..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                prefix={<span style={{ fontSize: 14 }}>👤</span>}
              />
              <Input
                placeholder="搜索组件..."
                search
                onSearch={handleSearch}
              />
              <Input
                placeholder="禁用状态"
                disabled
              />
              <Input
                placeholder="错误状态"
                error="输入格式不正确"
              />
            </div>
            {searchValue && (
              <div style={{ marginTop: 8, fontSize: 12, color: 'var(--text-secondary)' }}>
                搜索内容: {searchValue}
              </div>
            )}
          </Card>
        </div>

        {/* Card Demo */}
        <Card title="Card 卡片" style={{ marginTop: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            <Card size="small" hoverable>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>默认卡片</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>可悬浮查看效果</div>
            </Card>
            <Card size="small">
              <div style={{ fontWeight: 600, marginBottom: 4 }}>加载卡片</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>显示加载状态</div>
            </Card>
            <Card
              size="small"
              cover={
                <div style={{
                  height: 60,
                  background: 'var(--gradient-logo)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: 24,
                }}>
                  MF
                </div>
              }
            >
              <div style={{ fontWeight: 600 }}>封面卡片</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>带封面图片</div>
            </Card>
          </div>
        </Card>

        {/* Button Playground */}
        <CodePlayground
          mode="display"
          height={300}
          title="Button 按钮"
          code={`function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* 变体 */}
      <div>
        <div style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>变体</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          <Button variant="primary">primary</Button>
          <Button variant="secondary">secondary</Button>
          <Button variant="dashed">dashed</Button>
          <Button variant="text">text</Button>
          <Button variant="danger">danger</Button>
        </div>
      </div>
      {/* 尺寸 */}
      <div>
        <div style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>尺寸</div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Button size="small">small</Button>
          <Button size="medium">medium</Button>
          <Button size="large">large</Button>
        </div>
      </div>
      {/* 状态 */}
      <div>
        <div style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>状态</div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button disabled>禁用</Button>
          <Button variant="primary">主要按钮</Button>
        </div>
      </div>
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <div style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>变体</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <Button variant="primary">primary</Button>
                <Button variant="secondary">secondary</Button>
                <Button variant="dashed">dashed</Button>
                <Button variant="text">text</Button>
                <Button variant="danger">danger</Button>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>尺寸</div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Button size="small">small</Button>
                <Button size="medium">medium</Button>
                <Button size="large">large</Button>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>状态</div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <Button disabled>禁用</Button>
                <Button variant="primary">主要按钮</Button>
              </div>
            </div>
          </div>
        </CodePlayground>

        {/* Input Playground */}
        <CodePlayground
          mode="display"
          height={300}
          title="Input 输入框"
          style={{ marginTop: 24 }}
          code={`function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* 基本用法 */}
      <div>
        <div style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>基本用法</div>
        <Input placeholder="基本输入框" />
      </div>
      {/* 前缀/后缀 */}
      <div>
        <div style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>前缀/后缀</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Input prefix={<span>👤</span>} placeholder="带前缀图标" />
          <Input suffix={<span>@</span>} placeholder="带后缀" />
        </div>
      </div>
      {/* 状态 */}
      <div>
        <div style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>状态</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Input placeholder="禁用状态" disabled />
          <Input placeholder="错误状态" error="输入格式不正确" />
        </div>
      </div>
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <div style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>基本用法</div>
              <Input placeholder="基本输入框" />
            </div>
            <div>
              <div style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>前缀/后缀</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Input prefix={<span>👤</span>} placeholder="带前缀图标" />
                <Input suffix={<span>@</span>} placeholder="带后缀" />
              </div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>状态</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Input placeholder="禁用状态" disabled />
                <Input placeholder="错误状态" error="输入格式不正确" />
              </div>
            </div>
          </div>
        </CodePlayground>

        {/* Card Playground */}
        <CodePlayground
          mode="display"
          height={300}
          title="Card 卡片"
          style={{ marginTop: 24 }}
          code={`function App() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
      <Card size="small">默认卡片</Card>
      <Card size="small" hoverable>可悬浮</Card>
      <Card size="small">加载卡片</Card>
      <Card
        size="small"
        cover={<div style={{ height: 50, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 20 }}>🎨</div>}
      >
        带封面
      </Card>
      <Card size="small" title="带标题">内容区</Card>
      <Card size="small">
        <div style={{ fontWeight: 600 }}>自定义内容</div>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>可放任意内容</div>
      </Card>
    </div>
  );
}`}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            <Card size="small">默认卡片</Card>
            <Card size="small" hoverable>可悬浮</Card>
            <Card size="small">加载卡片</Card>
            <Card
              size="small"
              cover={<div style={{ height: 50, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 20 }}>🎨</div>}
            >
              带封面
            </Card>
            <Card size="small" title="带标题">内容区</Card>
            <Card size="small">
              <div style={{ fontWeight: 600 }}>自定义内容</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>可放任意内容</div>
            </Card>
          </div>
        </CodePlayground>
      </div>

      {/* Features */}
      <div style={{ marginTop: 24 }}>
        <Card title="组件特性">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, marginBottom: 4 }}>🎨</div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>主题适配</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>CSS 变量随四季切换</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, marginBottom: 4 }}>📦</div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>独立封装</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>无第三方依赖</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, marginBottom: 4 }}>🔄</div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>高复用性</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>props 参数化设计</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, marginBottom: 4 }}>⚡</div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>高性能</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>轻量无冗余代码</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

const Root = (props) => {
  const { globalState } = props;

  useEffect(() => {
    if (!globalState) return undefined;
    return globalState.subscribe(() => {});
  }, [globalState]);

  return (
    <div style={{ background: 'var(--bg-elevated)', color: 'var(--text-primary)', minHeight: '100%' }}>
      <ComponentShowcase />
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
    return <div style={{ padding: 20, color: 'red' }}>Error: {err.message}</div>;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
