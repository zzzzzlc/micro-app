const activeOutletIdByApp = new Map();

export function setActiveOutletId(appName, outletId) {
  activeOutletIdByApp.set(appName, outletId);
}

export function getActiveOutletElement(appName) {
  const outletId = activeOutletIdByApp.get(appName);
  if (outletId) {
    const el = document.getElementById(outletId);
    if (el) {return el;}
  }
  return document.getElementById('app');
}

export function domElementGetterForApp(appName) {
  return () => getActiveOutletElement(appName);
}

