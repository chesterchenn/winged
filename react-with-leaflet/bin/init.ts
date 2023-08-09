import path from 'path';
import fs from 'fs';
import commander from 'commander';
import os from 'os';
import { root, localPath } from '../paths';
import chalk from 'chalk';

/**
 * 初始化
 */
function init() {
  const program = new commander.Command();
  program.option('--type <type>', 'specify the script type', 'typescript').action(async (cmd) => {
    console.log(`${chalk.green('The script type is', cmd.type)}`);
    const type = cmd.type;
    const data = {
      type,
    };
    fs.writeFileSync(localPath, JSON.stringify(data, null, 2) + os.EOL);
    const pluginDir = path.join(root, 'plugins', type);
    readFile(pluginDir, root);
  });
  program.parse(process.argv);
}

/**
 * 文件操作
 * @param {string} directory 源文件目录
 * @param {string} dest 目的文件目录
 */
function readFile(directory: string, dest: string) {
  fs.readdirSync(directory).forEach((file) => {
    const stats = fs.lstatSync(path.join(directory, file));
    if (stats.isDirectory()) {
      const subDir = path.join(directory, file);
      const subDest = path.join(root, file);
      if (!fs.existsSync(subDest)) {
        fs.mkdirSync(subDest);
      }
      readFile(subDir, subDest);
    } else {
      const destFile = path.join(dest, file);
      const readFile = fs.readFileSync(`${directory}/${file}`, 'utf-8');
      fs.writeFileSync(destFile, readFile);
    }
  });
}

init();
