import React, { useRef } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import type { editor } from 'monaco-editor';
import { CodeLanguage } from './CodePlayground';

export interface CodeEditorProps {
  value: string;
  language: CodeLanguage;
  onChange: (value: string) => void;
  showLineNumbers?: boolean;
  readOnly?: boolean;
  className?: string;
}

const LANGUAGE_MAP: Record<CodeLanguage, string> = {
  html: 'html',
  css: 'css',
  javascript: 'javascript',
  jsx: 'javascript',
};

export function CodeEditor({
  value,
  language,
  onChange,
  showLineNumbers = true,
  readOnly = false,
  className,
}: CodeEditorProps) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const handleMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  return (
    <div className={className} style={{ height: '100%' }}>
      <Editor
        height="100%"
        language={LANGUAGE_MAP[language]}
        value={value}
        onChange={(v) => onChange(v || '')}
        onMount={handleMount}
        theme="vs"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: showLineNumbers ? 'on' : 'off',
          readOnly,
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          automaticLayout: true,
          padding: { top: 12, bottom: 12 },
          scrollbar: {
            vertical: 0,
            horizontal: 0,
            verticalScrollbarSize: 0,
            horizontalScrollbarSize: 0,
          },
          overviewRulerLanes: 0,
          hideCursorInOverviewBlock: true,
          overviewRulerBorder: false,
        }}
      />
    </div>
  );
}
