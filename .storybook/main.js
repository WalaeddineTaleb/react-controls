const webpack = require('webpack');

const path = require('path');
const ROOT_PATH = path.resolve(__dirname);

var WebpackWatchRunPlugin = require('../plugins/WebpackWatchRunPlugin');

module.exports = {
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: prop => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  stories: ['../docs/**/*.story.@(ts|md)x', '../src/**/*.stories.tsx'],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        sourceLoaderOptions: {
          injectStoryParameters: false,
        },
      },
    },
    '@storybook/addon-storysource',
    '@storybook/addon-controls',
  ],
  staticDirs: ['../public'],
  webpackFinal: async config => {
    config.resolve.alias.ui = path.resolve(ROOT_PATH, 'src/');
    config.resolve.alias.icons = path.resolve(ROOT_PATH, 'src/theming/icons');

    config.module.rules = config.module.rules.filter(r => r.test.toString() !== /\.css$/.toString());
    config.resolve.extensions.push('.ts', '.tsx', '.js', '.jsx');

    config.module.rules.push({
      test: /\.cache\/storybook\/dev-server\/*?/,
      include: [/node_modules/],
      use: ['ignore-loader'],
    });

    config.module.rules.push({
      test: /\.jsx?/,
      exclude: [/node_modules/],
      include: path.resolve(__dirname, '../'),
      use: ['babel-loader'],
    });

    // config.module.rules.push({
    //   test: /materialinear\.(tsx?)$/,
    //   include: [path.resolve(__dirname, '../src/Components/Display/Icons')],
    //   use: [require.resolve('babel-loader')],
    // });

    config.module.rules.push({
      test: /\.css$/,
      loader: ['style-loader', 'css-loader'],
      include: path.resolve(__dirname, '../'),
    });

    config.module.rules.push({
      test: /\.md$/,
      loader: 'html!markdown-loader',
      include: path.resolve(__dirname, '../'),
    });

    config.module.rules = config.module.rules.map(data => {
      if (/svg\|/.test(String(data.test) || data.toString().includes('ttf')))
        data.test = /\.(ico|jpg|jpeg|png|gif|webp|cur|ani|pdf)(\?.*)?$/;

      return data;
    });

    config.module.rules.push({
      test: /\.svg$/,
      loader: 'svg-inline-loader',
      include: path.resolve(__dirname, '../'),
    });

    config.module.rules.push({
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url-loader?name=fonts/[hash].[ext]&limit=10000&mimetype=application/font-woff',
      include: path.resolve(__dirname, '../'),
    });

    config.module.rules.push({
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url-loader?name=fonts/[hash].[ext]&limit=10000&mimetype=application/font-woff',
      include: path.resolve(__dirname, '../'),
    });

    config.module.rules.push({
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url-loader?name=fonts/[hash].[ext]&limit=10000&mimetype=application/octet-stream',
      include: path.resolve(__dirname, '../'),
    });

    config.module.rules.push({
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file-loader?name=fonts/[hash].[ext]',
      include: path.resolve(__dirname, '../'),
    });

    config.module.rules.push({
      test: /\.(jpe?g|gif|png)$/,
      loader: 'file-loader?name=img/[hash].[ext]',
      include: path.resolve(__dirname, '../'),
    });

    config.plugins.push(
      new webpack.LoaderOptionsPlugin({
        debug: true,
      })
    );

    config.plugins.push(new WebpackWatchRunPlugin());

    return config;
  },
};
