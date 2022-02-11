import fetch from 'node-fetch';
import serverJ from './serverJ.js';

const URL = 'https://m.sw13.icu/api_mweb/user/checkin';
const SU_WA = process.env.SU_WA;

const res = await fetch(URL, {
  method: 'put',
  headers: {
    'Content-Type': 'application/json',
    authorizationMweb: SU_WA,
  },
});

const data = await res.json();
serverJ('速蛙签到', data.message);

console.log(data);
