import js from '@eslint/js';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import vuePlugin from 'eslint-plugin-vue';

/**
 * 微前端项目 ESLint 配置
 * 适用于 single-spa 架构的多个子应用项目
 */
export default [
  // ==========================================
  // 1. 忽略目录
  // ==========================================
  {
    ignores: [
      '**/dist/**',
      '**/build/**',
      '**/node_modules/**',
      '**/.cache/**',
      '**/coverage/**',
    ],
  },

  // ==========================================
  // 2. 主应用 (single-spa-base) - React
  // ==========================================
  {
    name: 'single-spa-base/rules',
    files: ['single-spa-base/**/*.js', 'single-spa-base/**/*.jsx'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        System: 'readonly',
        singleSpa: 'readonly',
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: { react: reactPlugin },
    rules: {
      ...js.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      // single-spa 主应用特殊规则
      'no-undef': 'error',
      'no-restricted-globals': ['error', 'localStorage', 'sessionStorage'],
      // 允许在主应用中访问 window 进行子应用管理
      'no-restricted-properties': ['error',
        { object: 'window', property: 'eval', message: '禁止使用 eval' },
      ],
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      // 强制组件文件命名
      'react/display-name': 'off',
    },
    settings: {
      react: { version: 'detect' },
    },
  },

  // ==========================================
  // 3. React 子应用 (react-app)
  // ==========================================
  {
    name: 'react-app/rules',
    files: ['react-app/**/*.js', 'react-app/**/*.jsx'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        System: 'readonly',
        singleSpa: 'readonly',
        __SINGLE_SPA__: 'readonly',
        __REGISTER__: 'readonly',
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: { react: reactPlugin },
    rules: {
      ...js.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      // single-spa 子应用必须导出标准生命周期
      'no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
      // 子应用禁止使用 localStorage/sessionStorage（避免状态冲突）
      'no-restricted-globals': ['error',
        { name: 'localStorage', message: '子应用禁止使用 localStorage，请使用 single-spa 的 sharedProps 进行状态共享' },
        { name: 'sessionStorage', message: '子应用禁止使用 sessionStorage，请使用 single-spa 的 sharedProps 进行状态共享' },
      ],
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/display-name': 'off',
      // 强制使用 prop-types 进行 props 验证（子应用间通信推荐）
      'react/require-prop-types': 'warn',
    },
    settings: {
      react: { version: 'detect' },
    },
  },

  // ==========================================
  // 4. Vue 子应用 (vue-app)
  // ==========================================
  {
    name: 'vue-app/rules',
    files: ['vue-app/**/*.js', 'vue-app/**/*.vue'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        System: 'readonly',
        singleSpa: 'readonly',
        __SINGLE_SPA_VUE__: 'readonly',
      },
    },
    plugins: { vue: vuePlugin },
    rules: {
      ...js.configs.recommended.rules,
      ...vuePlugin.configs['vue3-recommended']?.rules || {},
      // Vue 子应用生命周期函数检查
      'no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
      'no-restricted-globals': ['error',
        { name: 'localStorage', message: '子应用禁止使用 localStorage，请使用 single-spa 的 sharedProps 进行状态共享' },
        { name: 'sessionStorage', message: '子应用禁止使用 sessionStorage，请使用 single-spa 的 sharedProps 进行状态共享' },
      ],
      // Vue specific
      'vue/multi-word-component-names': 'off',
      'vue/no-reserved-keys': 'error',
    },
  },

  // ==========================================
  // 5. 通用配置文件
  // ==========================================
  {
    files: ['**/webpack.config.js', '**/webpack.config.cjs'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
      globals: {
        ...globals.node,
      },
    },
  },

  // ==========================================
  // 6. Docker 和 Nginx 配置
  // ==========================================
  {
    files: ['**/nginx.conf', '**/Dockerfile*', '**/.dockerignore'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
    },
  },

  // ==========================================
  // 7. 根目录通用 JS 文件
  // ==========================================
  {
    name: 'root-config/rules',
    files: ['*.js', '*.mjs', 'config/**/*.js'],
    ignores: ['**/webpack.config.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        System: 'readonly',
        singleSpa: 'readonly',
      },
    },
    plugins: { react: reactPlugin },
    rules: {
      ...js.configs.recommended.rules,
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-console': 'warn',
    },
  },
];
