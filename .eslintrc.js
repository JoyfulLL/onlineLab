module.exports = {
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    parser: "@typescript-eslint/parser",
  },
  env: {
    es6: true, // 支持es6
    browser: true, // 浏览器端
    node: true,
  },
  // ESLint支持使用第三方插件。在使用插件之前，您必须使用npm安装它
  // 该eslint-plugin-前缀可以从插件名称被省略
  plugins: ["@typescript-eslint", "prettier", "vue"],
  // 继承规则
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:eslint-comments/recommended",
    // vue3语法规则
    "plugin:vue/vue3-recommended",
    // ts语法规则
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:vue/essential",
    "./.eslintrc-auto-import.json",
  ],
  // eslint规则
  rules: {
    // js/ts
    semi: ["warn", "never"],
    // 禁止 v-for 指令或范围属性的未使用变量定义
    "vue/no-unused-vars": 1,
    // 执行有效v-model指令
    "vue/valid-v-model": 2,
    // 强制执行有效的模板根
    "vue/valid-template-root": 1,
    "vue/no-v-model-argument": "off",
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",

    "vue/no-multiple-template-root": "off",
    "import/no-unresolved": 0,
    "vue/no-side-effects-in-computed-properties": 0,
  },
}
