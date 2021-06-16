module.exports = {
  env: {
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    project: './tsconfig.json'
  },
  plugins: ['@typescript-eslint'],
  rules: {
    quotes: ['error', 'single'],
  }
};