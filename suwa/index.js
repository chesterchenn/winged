import fetch from 'node-fetch';
import serverJ from './serverJ.js';
import fs from 'fs';

const URL = 'https://m.sw13.icu/api_mweb/user/checkin';
const INFO_URL = 'https://m.sw13.icu/api_mweb/user/info';
const SU_WA = process.env.SU_WA;
const RESULT = './result.txt';

try {
  const data = await fetchCheckin();
  const info = await fetchInfo();
  console.log(data, info);

  if (data.code !== 100) {
    const total = calResult();
    serverJ('速蛙签到失败', `${data.message}\n\n流量剩余${info.data.unused_traffic}\n\b${total}`);
  } else {
    saveResult(data.data.message, info.data.unused_traffic);
    const total = calResult();
    serverJ('速蛙签到', `${data.data.message}\n\n流量剩余${info.data.unused_traffic}\n\n${total}`);
  }
} catch (err) {
  console.error(err);
  const status = err.status;
  const statusText = err.statusText;
  serverJ('速蛙执行失败', `${status} ${statusText}`);
}

async function fetchInfo() {
  const res = await fetch(INFO_URL, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      authorizationMweb: SU_WA,
    },
  });
  if (!res.ok) {
    throw res;
  }
  const data = await res.json();
  return data;
}

async function fetchCheckin() {
  const res = await fetch(URL, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
      authorizationMweb: SU_WA,
    },
  });
  if (!res.ok) {
    throw res;
  }
  const data = await res.json();
  return data;
}

function saveResult(message, traffic) {
  const date = new Date();
  const YYYY = date.getFullYear();
  const MM = (date.getMonth() + 1).toString().padStart(2, '0');
  const DD = date.getDate().toString().padStart(2, '0');
  if (DD === '26' && fs.existsSync(RESULT)) {
    fs.rmSync(RESULT);
  }
  const save = `${YYYY}-${MM}-${DD} ${message} 流量剩余${traffic}\n`;
  fs.appendFileSync(RESULT, save);
}

function calResult() {
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
