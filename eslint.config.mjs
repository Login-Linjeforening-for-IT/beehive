import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";

export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  {
    languageOptions: {
      globals: {
        // Some node globals are used like process.env...
        // some browser globals are used like localStorage
        ...globals.node,
        ...globals.browser,
      },
    }
  },
  { ignores: ["**/*.min.js"] },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  eslintPluginPrettier,
  {
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/jsx-no-target-blank": "off",
      "react/prop-types": "off", // Should enable and fix in the future...
    },
  },
];