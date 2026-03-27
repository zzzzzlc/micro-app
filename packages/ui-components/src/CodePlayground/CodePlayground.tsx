import React, { useState } from 'react';
import { CodeEditor } from './CodeEditor';
import styles from './CodePlayground.module.css';

export type CodeLanguage = 'html' | 'css' | 'javascript' | 'jsx';

export interface CodePlaygroundProps {
  /** 模式: 'display' = 预设代码展示, 'editable' = 可编辑 */
  mode?: 'display' | 'editable';
  /** 展示模式的代码 */
  code?: string;
  /** 代码语言 */
  language?: CodeLanguage;
  /** 标题 */
  title?: string;
  /** 描述 */
  description?: string;
  /** 高度 */
  height?: string | number;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export function CodePlayground({
  mode = 'display',
  code = '',
  language = 'jsx',
  title,
  description,
  height = 300,
  className = '',
  style,
  children,
}: CodePlaygroundProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const containerStyle = {
    height: typeof height === 'number' ? `${height}px` : height,
    ...style,
  };

  if (mode === 'display') {
    return (
      <div className={`${styles.container} ${className}`} style={containerStyle}>
        <div className={styles.displayLayout}>
          <div className={styles.codeSection}>
            {title && <div className={styles.sectionTitle}>{title}</div>}
            {description && <div className={styles.description}>{description}</div>}
            <div className={styles.codeWrapper}>
              <CodeEditor
                value={code}
                language={language}
                readOnly
                showLineNumbers
              />
              <button
                className={styles.copyButton}
                onClick={handleCopy}
                title="复制代码"
              >
                {copied ? '已复制!' : '复制'}
              </button>
            </div>
          </div>
          <div className={styles.previewSection}>
            <div className={styles.previewLabel}>效果预览</div>
            <div className={styles.previewContent}>
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // editable 模式暂时保留旧的实现
  return (
    <div className={`${styles.container} ${className}`} style={containerStyle}>
      <div className={styles.editorPane}>
        <CodeEditor
          value={code}
          language={language}
          showLineNumbers
        />
      </div>
      <div className={styles.previewPane}>
        <div className={styles.previewContent}>
          {children}
        </div>
      </div>
    </div>
  );
}
