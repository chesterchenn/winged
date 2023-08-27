import path from 'path';
import fs from 'fs';
const root = process.cwd();
const src = path.resolve(root, 'src');
const dist = path.resolve(__dirname, 'dist');
const localPath = path.resolve(__dirname, '.config.json');
const indexHTML = path.resolve(root, 'index.html');
let isTypeScript: boolean; 
let isJavaScript: boolean;
let entryIndex: string;

function exportPath() {
  let config = {
    type: '',
  };

  if (fs.existsSync(localPath)) {
    config = require(localPath);
  }
  isTypeScript = config.type === 'typescript';
  isJavaScript = config.type === 'javascript';
  entryIndex = isTypeScript ? path.join(src, 'index.tsx') : path.join(src, 'index.js');
}

exportPath();

export {
  dist,
  root,
  indexHTML,
  localPath,
  entryIndex,
  isTypeScript,
  isJavaScript,
  src,
};
