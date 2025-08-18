import js from '@eslint/js'
import globals from 'globals'
import { defineConfig } from 'eslint/config'
import stylistic from '@stylistic/eslint-plugin'
import eslintPluginJest from 'eslint-plugin-jest'

export default defineConfig([
  stylistic.configs.recommended,
  { files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.node } },

  {
    files: ['**/__tests__/**/*.js'],
    plugins: { jest: eslintPluginJest },
    rules: {
      ...eslintPluginJest.configs.recommended.rules,
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'warn',
    },
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
])
