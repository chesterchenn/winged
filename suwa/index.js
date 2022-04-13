import fetch from 'node-fetch';
import serverJ from './serverJ.js';
import { calResult, saveResult } from './result.js';

const URL = 'https://m.sw13.icu/api_mweb/user/checkin';
const INFO_URL = 'https://m.sw13.icu/api_mweb/user/info';
const SU_WA = process.env.SU_WA;

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
