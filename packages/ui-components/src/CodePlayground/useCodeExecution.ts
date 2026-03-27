import { useState, useEffect, useRef, useCallback } from 'react';

export interface UseCodeExecutionOptions {
  html: string;
  css: string;
  js: string;
  liveUpdate?: boolean;
  updateDelay?: number;
  onError?: (error: Error, type: 'js' | 'css') => void;
}

export function useCodeExecution({
  html,
  css,
  js,
  liveUpdate = true,
  updateDelay = 300,
  onError,
}: UseCodeExecutionOptions) {
  const [srcdoc, setSrcdoc] = useState('');
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const buildSrcdoc = useCallback(() => {
    const errorHandlerCode = `
      <script>
        window.onerror = function(msg, url, line, col, error) {
          parent.postMessage({ type: 'js-error', message: msg }, '*');
          return true;
        };
        window.addEventListener('unhandledrejection', function(e) {
          parent.postMessage({ type: 'js-error', message: e.reason }, '*');
        });
      <\/script>
    `;

    return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <style>${css}</style>
    ${errorHandlerCode}
  </head>
  <body>
    ${html}
    <script>${js}<\/script>
  </body>
</html>`;
  }, [html, css, js]);

  useEffect(() => {
    if (!liveUpdate) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setSrcdoc(buildSrcdoc());
    }, updateDelay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [html, css, js, liveUpdate, updateDelay, buildSrcdoc]);

  const execute = useCallback(() => {
    setSrcdoc(buildSrcdoc());
  }, [buildSrcdoc]);

  return { srcdoc, execute };
}
