import { useState, useEffect } from 'react';

const useAppStatus = () => {
  const [appStatus, setAppStatus] = useState({});

  useEffect(() => {
    // 监听应用状态变化
    const checkAppStatus = () => {
      const apps = singleSpa.getAppNames();
      const statusMap = {};
      
      apps.forEach(appName => {
        statusMap[appName] = singleSpa.getAppStatus(appName);
      });
      
      setAppStatus(statusMap);
    };

    // 定期检查状态
    const interval = setInterval(checkAppStatus, 1000);
    
    // 初始检查
    checkAppStatus();

    return () => clearInterval(interval);
  }, []);

  return appStatus;
};

export default useAppStatus;