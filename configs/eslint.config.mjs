import js from '@eslint/js';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import vuePlugin from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';

/**
 * 微前端项目统一 ESLint 配置
 *
 * 配置策略：
 * - single-spa-base (主应用): 最严格，确保 Shell 应用质量
 * - react-app (React 子应用): 关注组件规范和 single-spa 生命周期
 * - vue-app (Vue 子应用): Vue 2 特定规则
 */
export default [
  // ==========================================
  // 0. 忽略文件
  // ==========================================
  {
    ignores: [
      '**/dist/**',
      '**/build/**',
      '**/node_modules/**',
      '**/.cache/**',
      '**/coverage/**',
      '**/*.min.js',
      '**/*.bundle.js',
      'apps/**/node_modules/**',
      '**/Dockerfile*',
      '**/.dockerignore',
      '**/nginx.conf',
      '**/docker-compose*.yaml',
      '**/docker-compose*.yml',
      '**/package.json',
      '**/tsconfig.json',
      '**/jsconfig.json',
      '**/.browserslistrc',
    ],
  },

  // ==========================================
  // 1. JavaScript 核心规则
  // ==========================================
  {
    files: ['**/*.js', '**/*.jsx', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        System: 'readonly',
        singleSpa: 'readonly',
        singleSpaReact: 'readonly',
        singleSpaVue: 'readonly',
      },
    },
    plugins: {
      js,
    },
    rules: {
      ...js.configs.recommended.rules,

      // 核心规则 - 错误
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      }],
      'no-shadow': 'error',
      'no-shadow-restricted-names': 'error',
      'no-dupe-keys': 'error',
      'no-duplicate-case': 'error',
      'no-empty': ['error', { allowEmptyCatch: true }],
      'no-invalid-regexp': 'error',
      'no-irregular-whitespace': 'error',
      'no-eval': 'error',
      'no-with': 'error',

      // 核心规则 - 最佳实践
      'eqeqeq': ['error', 'always', { null: 'ignore' }],
      'curly': ['error', 'all'],
      'brace-style': ['error', '1tbs', { allowSingleLine: true }],
      'semi': ['error', 'always'],
      'comma-dangle': ['error', {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'only-multiline',
      }],
      'quotes': ['error', 'single', { avoidEscape: true }],
      'indent': ['error', 2, { SwitchCase: 1 }],
      'linebreak-style': 'off',

      // 变量声明
      'one-var': ['error', 'never'],
      'no-multi-spaces': ['error', { ignoreEOLComments: true }],
      'space-infix-ops': 'error',
      'keyword-spacing': ['error', { before: true, after: true }],

      // 箭头函数
      'arrow-spacing': ['error', { before: true, after: true }],
      'arrow-parens': ['error', 'always'],
      'arrow-body-style': ['error', 'as-needed', { requireReturnForObjectLiteral: false }],

      // 对象和数组
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'object-shorthand': ['error', 'always', { ignoreConstructors: false }],

      // 函数
      'func-call-spacing': ['error', 'never'],
      'func-names': ['warn', 'as-needed'],
      'prefer-const': ['error', { destructuring: 'any', ignoreReadBeforeAssign: false }],
      'prefer-arrow-callback': ['error', { allowNamedFunctions: false }],

      // 注释
      'spaced-comment': ['error', 'always', { line: { markers: ['/'], exceptions: ['-', '+'] }, block: { markers: ['!'], exceptions: [':'] } }],
      'max-len': ['warn', 120, { ignoreUrls: true, ignoreComments: true, ignoreStrings: true }],
      'max-depth': ['warn', 4],
      'max-nested-callbacks': ['warn', 3],
      'max-params': ['warn', 5],
      'no-mixed-spaces-and-tabs': 'error',
    },
  },

  // ==========================================
  // 2. React 规则 (通用)
  // ==========================================
  {
    files: ['**/*.jsx', '**/*.tsx'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,

      // 关闭一些不适用的规则
      'react/display-name': 'off',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/require-default-props': 'off',

      // React Hooks 规则
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // JSX 规范
      'react/jsx-indent': ['error', 2],
      'react/jsx-indent-props': ['error', 2],
      'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
      'react/jsx-curly-spacing': ['error', 'never'],
      'react/jsx-equals-spacing': ['error', 'never'],
      'react/jsx-no-undef': 'error',
      'react/jsx-one-expression-per-line': ['error', { allow: 'single-child' }],
      'react/no-array-index-key': 'warn',
      'react/no-deprecated': 'error',
      'react/no-direct-mutation-state': 'error',
      'react/no-unescaped-entities': ['error', { entities: { "'": "'", '}': '}' } }],
      'react/no-unknown-property': 'error',
      'react/require-render-return': 'error',
      'react/self-closing-comp': ['error', { component: true, html: true }],
    },
  },

  // ==========================================
  // 3. single-spa-base (主应用) - 严格规则
  // ==========================================
  {
    name: 'single-spa-base/rules',
    files: ['apps/single-spa-base/**/*.js', 'apps/single-spa-base/**/*.jsx'],
    plugins: {
      react: reactPlugin,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      // 禁止直接使用 localStorage/sessionStorage
      'no-restricted-globals': ['error',
        { name: 'localStorage', message: '禁止使用 localStorage，请通过 sharedProps 共享状态' },
        { name: 'sessionStorage', message: '禁止使用 sessionStorage，请通过 sharedProps 共享状态' },
        { name: 'document.cookie', message: '禁止直接访问 cookie，请通过 sharedProps 共享' },
      ],

      // React 规则
      'react/display-name': 'off',
      'react/prop-types': 'off',

      // 最佳实践
      'consistent-return': 'error',
      'default-case': 'warn',
      'default-case-last': 'error',
      'default-param-last': 'error',
      'no-implicit-coercion': ['error', { boolean: true, number: true, string: true }],
      'no-new': 'error',
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-return-await': 'error',
      'no-throw-literal': 'error',
      'no-useless-return': 'warn',
      'prefer-promise-reject-errors': ['error', { allowEmptyReject: true }],
    },
  },

  // ==========================================
  // 4. react-app (React 子应用) - 组件规范
  // ==========================================
  {
    name: 'react-app/rules',
    files: ['apps/react-app/**/*.js', 'apps/react-app/**/*.jsx'],
    plugins: {
      react: reactPlugin,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      // 子应用必须遵循 single-spa 生命周期
      'no-restricted-globals': ['error',
        { name: 'localStorage', message: '子应用禁止使用 localStorage，请使用 sharedProps 进行状态共享' },
        { name: 'sessionStorage', message: '子应用禁止使用 sessionStorage，请使用 sharedProps 进行状态共享' },
        { name: 'document.cookie', message: '子应用禁止直接访问 cookie' },
        { name: 'window.localStorage', message: '子应用禁止使用 localStorage' },
        { name: 'window.sessionStorage', message: '子应用禁止使用 sessionStorage' },
      ],

      // React 规则
      'react/display-name': 'off',
      'react/prop-types': 'off',
      'react/no-deprecated': 'error',
      'react/no-unsafe': 'warn',
    },
  },

  // ==========================================
  // 5. vue-app (Vue 2 子应用) - Vue 2 特定规则
  // ==========================================
  {
    name: 'vue-app/rules',
    files: ['apps/vue-app/**/*.js', 'apps/vue-app/**/*.vue'],
    plugins: { vue: vuePlugin },
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      // Vue 特定规则
      'vue/no-v-html': 'warn',
      'vue/multi-word-component-names': 'off',

      // 禁止直接使用 localStorage/sessionStorage
      'no-restricted-globals': ['error',
        { name: 'localStorage', message: '子应用禁止使用 localStorage，请使用 single-spa 的 sharedProps' },
        { name: 'sessionStorage', message: '子应用禁止使用 sessionStorage，请使用 single-spa 的 sharedProps' },
        { name: 'window.localStorage', message: '子应用禁止使用 localStorage' },
        { name: 'window.sessionStorage', message: '子应用禁止使用 sessionStorage' },
      ],

      // JavaScript 规则
      'no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
      'no-console': 'warn',
    },
    settings: {
      'vue/migrationMode': 2,
    },
  },

  // ==========================================
  // 6. Webpack 配置文件
  // ==========================================
  {
    files: ['**/webpack.config.js', '**/webpack.config.cjs', '**/webpack.config.mjs'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-unused-vars': 'off',
      'no-console': 'off',
    },
  },
];
