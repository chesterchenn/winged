import { merge } from 'webpack-merge';
import common from './webpack.common';
import { dist } from '../paths';
import { Configuration } from 'webpack';
import 'webpack-dev-server';

const config: Configuration = merge(common, {
  mode: 'development',
  devServer: {
    static: dist,
    port: 8080,
    open: true,
    hot: true,
  },
  devtool: 'inline-source-map',
});

export default config;
