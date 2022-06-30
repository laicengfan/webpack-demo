module.exports = {
  // 继承 Eslint 规则
  root: true,
  env: {
    node: true, // 启用node中全局变量
    browser: true, // 启用浏览器中全局变量
  },
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
  rules: {
    // 禁止使用 var
    'no-var': 2,
    // 优先使用 interface 而不是 type
    '@typescript-eslint/consistent-type-definitions': [
    "error",
    "interface"
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
};