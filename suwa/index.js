import fetch from 'node-fetch';
import serverJ from './serverJ.js';

const URL = 'https://m.sw13.icu/api_mweb/user/checkin';
const SU_WA = process.env.SU_WA;

try {
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
  console.log(data);
  if (data.code !== 100) {
    serverJ('速蛙签到失败', data.message);
  } else {
    serverJ('速蛙签到', data.data.message);
  }
} catch (err) {
  console.error(err);
  const status = err.status;
  const statusText = err.statusText;
  serverJ('速蛙执行失败', `${status} ${statusText}`);
}
