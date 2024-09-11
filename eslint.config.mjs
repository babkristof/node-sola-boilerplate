import globals from 'globals';
import pluginJs from '@eslint/js';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import securityPlugin from 'eslint-plugin-security';

export default [
    {
        files: ['**/*.js'],
        languageOptions: {
            sourceType: 'commonjs',
            globals: globals.node,
        },
    },
    pluginJs.configs.recommended,
    prettierConfig,
    {
        plugins: {
            prettier: prettierPlugin,
            security: securityPlugin,
        },
        rules: {
            'no-console': 'error',
            'prettier/prettier': 'error',
            ...securityPlugin.configs.recommended.rules,
        },
    },
];
