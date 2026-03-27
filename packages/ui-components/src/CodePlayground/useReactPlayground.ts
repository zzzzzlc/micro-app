import { useState, useEffect, useRef, useCallback } from 'react';

export interface UseReactPlaygroundOptions {
  code: string;
  liveUpdate?: boolean;
  updateDelay?: number;
  onError?: (error: Error) => void;
}

export function useReactPlayground({
  code,
  liveUpdate = true,
  updateDelay = 300,
  onError,
}: UseReactPlaygroundOptions) {
  const [srcdoc, setSrcdoc] = useState('');
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const buildSrcdoc = useCallback(() => {
    // Only escape </script> to prevent premature termination of the script tag
    const safeCode = code
      .replace(/<\/script>/gi, '<\\/script>');

    return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: system-ui, -apple-system, sans-serif; padding: 16px; background: #fff; }
      .btn {
        padding: 8px 16px;
        border-radius: 6px;
        border: none;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s;
        font-family: inherit;
      }
      .btn-primary { background: #7DC77D; color: white; }
      .btn-secondary { background: #f0f0f0; color: #333; }
      .btn-danger { background: #ff4d4f; color: white; }
      .btn:hover { opacity: 0.85; }
      .btn:disabled { opacity: 0.5; cursor: not-allowed; }
      .input-wrapper { display: flex; flex-direction: column; gap: 4px; }
      .input {
        padding: 8px 12px;
        border: 1px solid #d9d9d9;
        border-radius: 6px;
        font-size: 14px;
        font-family: inherit;
        outline: none;
        transition: border-color 0.2s;
      }
      .input:focus { border-color: #7DC77D; }
      .input:disabled { background: #f5f5f5; cursor: not-allowed; }
      .input-error { border-color: #ff4d4f; }
      .input-error-msg { color: #ff4d4f; font-size: 12px; }
      .card {
        border: 1px solid #f0f0f0;
        border-radius: 8px;
        padding: 16px;
        background: #fff;
        transition: box-shadow 0.2s;
      }
      .card-hover:hover { box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
      .card-loading { opacity: 0.6; pointer-events: none; }
      .card-cover { border-radius: 8px 8px 0 0; margin: -16px -16px 16px -16px; overflow: hidden; }
      .card-title { font-weight: 600; margin-bottom: 8px; color: #333; }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel">
      // Make React available globally
      window.React = React;
      window.ReactDOM = ReactDOM;

      try {
        ${safeCode}
      } catch (e) {
        const err = e instanceof Error ? e.message : String(e);
        document.getElementById('root').innerHTML = '<div style="color: red; padding: 20px; font-family: monospace;">' + err + '</div>';
        if (window.parent !== window) {
          window.parent.postMessage({ type: 'js-error', message: err }, '*');
        }
      }
    </script>
  </body>
</html>`;
  }, [code]);

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
  }, [code, liveUpdate, updateDelay, buildSrcdoc]);

  // Initial render
  useEffect(() => {
    setSrcdoc(buildSrcdoc());
  }, [buildSrcdoc]);

  const execute = useCallback(() => {
    setSrcdoc(buildSrcdoc());
  }, [buildSrcdoc]);

  return { srcdoc, execute };
}
