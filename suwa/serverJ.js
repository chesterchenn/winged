import fetch from 'node-fetch';
const serverJKey = process.env.PUSH_KEY;
const url = `https://sctapi.ftqq.com/${serverJKey}.send`;

async function serverJ(title, desp) {
  const params = new URLSearchParams();
  params.append('title', title);
  params.append('desp', desp);
  const res = await fetch(url, {
    method: 'post',
    body: params,
  });
  const data = await res.json();
  console.log(data);
}

export default serverJ;
