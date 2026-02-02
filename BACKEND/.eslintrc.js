module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
  },
  plugins: ["react"],
  rules: {
    indent: ["error", 2],
    "react/prop-types": "off",
    quotes: ["error", "double"],
    "react/react-in-jsx-scope": "off",
  },
};
