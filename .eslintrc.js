const react = require("eslint-plugin-react");

module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    plugins: ["react"],
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:storybook/recommended"
    ],
    parserOptions: {
        ecmaVersion: 12,
        ecmaFeatures: {
            jsx: true
        }
    },

    rules: {
        // Add custom ESLint rules here
    },

    settings: {
        react: {
            version: "detect",
        },
    },
};
