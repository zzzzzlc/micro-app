import React, { useEffect, useRef } from 'react';
import styles from './Preview.module.css';

export interface PreviewProps {
  srcdoc: string;
  onError?: (error: Error, type: 'js' | 'css') => void;
}

export function Preview({ srcdoc, onError }: PreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'js-error' && onError) {
        onError(new Error(event.data.message), 'js');
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onError]);

  return (
    <div className={styles.previewContainer} style={{ height: '100%' }}>
      <iframe
        ref={iframeRef}
        className={styles.previewFrame}
        srcDoc={srcdoc}
        sandbox="allow-scripts"
        title="code-preview"
      />
    </div>
  );
}
