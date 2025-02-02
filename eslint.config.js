import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import typescriptParser from '@typescript-eslint/parser'
import stylisticJs from '@stylistic/eslint-plugin-js'

export default [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        ignores: ["**/vendor/**", "**/mazemap.min.js"],
    },
    {
        plugins: {
            '@stylistic/js': stylisticJs,
        },
        languageOptions: {
            sourceType: 'module',
            ecmaVersion: 2024,
            parser: typescriptParser
        },
        rules: {
            'strict': 'error',
            'no-var': 'error',
            'array-callback-return': 'error',
            'yoda': 'error',
            '@stylistic/js/indent': [
                'error',
                4,
            ],
            '@stylistic/js/quotes': [
                'error',
                'single'
            ],
            '@stylistic/js/semi': [
                'error',
                'never'
            ],
            '@typescript-eslint/no-unused-vars': 'error',
            '@typescript-eslint/ban-ts-comment': 'off',
            '@typescript-eslint/no-non-null-assertion': 'off'
        }
    }
];
