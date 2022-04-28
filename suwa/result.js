import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const RESULT = path.resolve(__filename, '../result.txt');
// 从环境变量读取流量刷新的日期
const SW_DAY = process.env.SW_DAY || '29';

export function saveResult(message, traffic) {
  const date = new Date();
  const YYYY = date.getFullYear();
  const MM = (date.getMonth() + 1).toString().padStart(2, '0');
  const DD = date.getDate().toString().padStart(2, '0');
  if (DD === SW_DAY && fs.existsSync(RESULT)) {
    fs.rmSync(RESULT);
  }
  const save = `${YYYY}-${MM}-${DD} ${message} 流量剩余${traffic}\n`;
  fs.appendFileSync(RESULT, save);
}

export function calResult() {
  const result = fs.readFileSync(RESULT, 'utf8');
  const matches = result.matchAll(/获得了\s*\d*(M|G)B/g);
  const data = [];
  for (const m of matches) {
    const matchM = m[0].match(/\d*MB/);
    const matchG = m[0].match(/\d*GB/);
    let d;
    if (matchM) {
      d = Number.parseInt(matchM[0]);
    } else if (matchG) {
      d = Number.parseInt(matchG[0]) * 1000;
    }
    data.push(d);
  }
  let all = data.reduce((cal, d) => cal + d, 0);
  let unit = 'MB';

  if (all > 1000) {
    all /= 1000;
    all = all.toFixed(2);
    unit = 'GB';
  }
  return `当月累计签到总计 ${all}${unit}`;
}

calResult();
