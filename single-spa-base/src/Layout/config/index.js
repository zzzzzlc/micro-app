// 布局断点配置
const LAYOUT_BREAKPOINTS = {
    mobile: '768px',    // 移动设备
    tablet: '1024px',   // 平板设备
    desktop: '1440px',  // 桌面设备
    large: '1920px'     // 大屏设备
  };
  
  // 布局状态管理
  const LAYOUT_STATE = {
    sidebarCollapsed: false,
    headerHeight: '64px',
    sidebarWidth: '260px',
    contentPadding: '24px',
    transitionDuration: '0.3s'
  };
  export { LAYOUT_BREAKPOINTS, LAYOUT_STATE };