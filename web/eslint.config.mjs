import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import globals from "globals";
import jestPlugin from "eslint-plugin-jest";

export default [
  {
    ignores: ["node_modules/**", "dist/**", "*.config.js"],
  },

  js.configs.recommended,
  // ...tseslint.configs.recommendedTypeChecked,

  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsparser,
      ecmaVersion: 2024,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
      parserOptions: {
        project: "./tsconfig.test.json",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      jest: jestPlugin,
    },
    rules: {
      // TypeScript specific rules
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/typedef": [
        "error",
        {
          arrayDestructuring: false,
          objectDestructuring: false,
          arrowParameter: true,
          memberVariableDeclaration: true,
          parameter: true,
          propertyDeclaration: true,
          variableDeclaration: true,
          variableDeclarationIgnoreFunction: false,
        },
      ],

      // General rules
      semi: ["error", "always"],
      quotes: "off",
      indent: ["error", 2],
      "comma-dangle": ["off", "never"],
      "no-console": "warn",
    },
  },
];
