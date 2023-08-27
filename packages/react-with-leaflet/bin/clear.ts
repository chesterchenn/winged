import fs from 'fs';
import path from 'path';

const root = process.cwd();
const needClear: string[] = ['src', '.config.json', '.babelrc', 'tsconfig.json'];
/**
 * 清除目标目录
 */
function clear(): void {
  needClear.forEach(item => {
    const file = path.join(root, item);
    if (fs.existsSync(file)) {
      fs.rmSync(file, { recursive: true });
    }
  });
}

clear();
