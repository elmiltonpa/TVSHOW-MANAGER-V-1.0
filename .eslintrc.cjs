module.exports = {
  env: { browser: true, es2020: true, node: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    indent: ["error", 2],
    "react/prop-types": "off",
    quotes: ["error", "double"],
    "react/react-in-jsx-scope": "off",
    "react-refresh/only-export-components": "warn",
  },
};
