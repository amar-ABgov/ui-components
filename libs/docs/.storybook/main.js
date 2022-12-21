// https://github.com/storybookjs/storybook/blob/master/addons/docs/docs/recipes.md
const path = require("path");
const rootMain = require("../../../.storybook/main");

module.exports = {
  ...rootMain,

  core: { ...rootMain.core, builder: "webpack5" },

  stories: ["../src/main.stories.mdx", "../src/**/*.stories.mdx"],
  staticDirs: ["../src", "../src/components/common", "../cms"],
  addons: [...rootMain.addons, "@nrwl/react/plugins/storybook"],
  webpackFinal: async (config, { configType }) => {
    // apply any global webpack configs that might have been specified in .storybook/main.js
    if (rootMain.webpackFinal) {
      config = await rootMain.webpackFinal(config, { configType });
    }

    // add your own webpack tweaks if needed
    const adminConfig = {
      name: 'admin',
      mode: 'development',
      entry: {cms1: "./libs/docs/cms/admin/cms.js"},
      output: {
        path: path.resolve(
          __dirname,
          "../../../dist/storybook/docs/admin"
        ),
        filename: 'cms1.js',
        publicPath: '/admins/'
      },
      module: {
        rules: [
          {
            test: /\.(js|jsx|ts|tsx)$/,
            use: {
              loader: 'babel-loader',
            },
            exclude: /node_modules/,
          },
          {
            test: /\.css$/,
            use: [
              'style-loader',
              'css-loader'
            ]
          },
          {
            test: /\.svg$/,
            use: [
              'svg-url-loader'
            ]
          }
        ]
      },
      resolve: {
        extensions: [
          '.mjs', '.js',
          '.jsx', '.ts',
          '.tsx', '.json',
          '.cjs'
        ],
        modules: [ 'node_modules' ],
        mainFields: [ 'browser', 'module', 'main' ],
        fallback: {
          path: '/Users/amar/tests/abgov/ui-components/node_modules/path-browserify/index.js'
        },
        alias: {
          "@abgov/shared/storybook-common": path.resolve(
            __dirname,
            "../../../libs/shared/storybook-common/src/index.ts"
          ),
          "@abgov/shared/common": path.resolve(
            __dirname,
            "../../../libs/shared/common/src/index.ts"
          ),

          "@abgov/styles": path.resolve(__dirname, "../../../libs/styles/src/index.ts"),
          "@abgov/web-components": path.resolve(
            __dirname,
            "../../../dist/libs/web-components/web-components.es.js"
          ),
          "@abgov/react-components": path.resolve(
            __dirname,
            "../../../libs/react-components/src/index.ts"
          ),
        }
      }
    };

    return [config, adminConfig];
  },
};
