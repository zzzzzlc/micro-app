import js from '@eslint/js';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';

export default [{
        ignores: [
            '**/dist/**',
            '**/build/**',
            '**/node_modules/**',
        ],
    },
    // 通用 JS + React 规则（包含 react_app_1）
    {
        files: ['**/*.js', '**/*.jsx'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.node,
            },
            parserOptions: {
                ecmaFeatures: {
                    jsx: true, // 关键：让 espree 支持 JSX
                },
            },
        },
        plugins: {
            react: reactPlugin,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...reactPlugin.configs.recommended.rules,
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
    // webpack 配置允许 CommonJS / Node 环境
    {
        files: ['**/webpack.config.js'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'script',
            globals: {
                ...globals.node,
            },
        },
    },
];