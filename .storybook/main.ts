const path = require('path');

module.exports = {
  stories: ["../src/components/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-actions",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
  ],
  features: {
    emotionAlias: false,
  },
  framework: {
    name: "@storybook/nextjs",
    options: {}
  },
  staticDirs: ["../public"],
  core: {
    builder: "@storybook/builder-webpack5"
  },
  webpackFinal: async config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src')
    };
    // `postcss-loader` を追加する
    config.module.rules.push({
      test: /\.css$/,
      use: [
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                require('tailwindcss')('./tailwind.config.js'),
                require('autoprefixer'),
              ],
            },
          },
        },
      ],
    });
    return {
      ...config
    };
  },
  docs: {
    autodocs: false,
  },
  refs: {
    '@chakra-ui/react': { disable: true },
  }
};
