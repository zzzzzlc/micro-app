const STORAGE_KEY = 'mf:importmap-overrides';

function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function readStoredOverrides() {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  const parsed = raw ? safeParse(raw) : null;
  return parsed && typeof parsed === 'object' ? parsed : {};
}

function writeStoredOverrides(overrides) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
}

function readQueryOverrides(allowedKeys) {
  const params = new URLSearchParams(window.location.search);
  const overrides = {};

  for (const key of allowedKeys) {
    const val = params.get(key);
    if (val) {overrides[key] = val;}
  }

  return overrides;
}

function isEnabled() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('enableOverrides') === '1') {return true;}
  if (params.get('clearOverrides') === '1') {return true;}
  if (window.localStorage.getItem(STORAGE_KEY)) {return true;}
  return false;
}

/**
 * 开发调试插件：让每个开发者通过 URL 参数/localStorage 覆盖子应用地址（直接改 href），
 * 不再依赖额外的 import map 注入，避免 bare specifier 解析问题。
 *
 * 启用方式（任选其一）：
 * - `?enableOverrides=1`
 * - localStorage 中存在 `mf:importmap-overrides`
 *
 * 覆盖参数示例：
 * - `?react_app_1=http://192.168.1.10:8082/react_app_1.js`
 * - `?vue_app_1=http://192.168.1.10:8083/vue_app_1.js`
 *
 * 持久化：
 * - `&persist=1`
 *
 * 清空：
 * - `?clearOverrides=1`
 */
export function enableImportMapOverrides(appConfigs) {
  if (!isEnabled()) {return null;}

  const keys = appConfigs.map((c) => c.name);
  const params = new URLSearchParams(window.location.search);
  const persist = params.get('persist') === '1';
  const clear = params.get('clearOverrides') === '1';

  if (clear) {
    window.localStorage.removeItem(STORAGE_KEY);
  }

  const storedOverrides = clear ? {} : readStoredOverrides();
  const queryOverrides = readQueryOverrides(keys);
  const mergedOverrides = { ...storedOverrides, ...queryOverrides };

  if (persist && Object.keys(queryOverrides).length > 0) {
    writeStoredOverrides(mergedOverrides);
  }

  // 直接修改 config.href，让后续 System.import(item.href) 加载覆盖地址
  appConfigs.forEach((cfg) => {
    if (mergedOverrides[cfg.name]) {
       
      cfg.href = mergedOverrides[cfg.name];
    }
  });

  // 方便控制台调试
  window.__mf_import_overrides = {
    overrides: mergedOverrides,
    clear() {
      window.localStorage.removeItem(STORAGE_KEY);
    },
  };

  return mergedOverrides;
}

