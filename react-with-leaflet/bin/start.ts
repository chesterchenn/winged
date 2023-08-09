/**
 * 校验服务启动前是否进行初始化
 */
import spawn from 'cross-spawn';
import chalk from 'chalk';
import { isJavaScript, isTypeScript } from '../paths';

const exec = () => {
  const args = ['serve', '--config', 'webpack/webpack.dev.ts'];
  spawn('webpack', args, { stdio: 'inherit' });
};

if (!isTypeScript && !isJavaScript) {
  console.error(
    chalk.red('You need to run ') +
      chalk.green('npm run init ') +
      chalk.red('or ') +
      chalk.green('yarn run init:js ') +
      chalk.red('at first.')
  );
} else {
  exec();
}
