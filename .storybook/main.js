const path = require("path");
module.exports = {
  stories: ["../src/components/**/*.stories.@(tsx|mdx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-actions",
    "@storybook/addon-knobs",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    'storybook-addon-material-ui'
  ],
  webpackFinal: async (config) => {
    config.resolve.alias = {
      "@": path.resolve(__dirname, "../src"),
    };
    return config;
  },
};
