const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [[n, m], ...inputs] = fs
  .readFileSync(path)
  .toString()
  .trim()
  .split('\n')
  .map((it) => it.split(' ').map(Number));

const edges = inputs.sort((a, b) => a[2] - b[2]);
const p = Array.from({ length: n + 1 }, (_, idx) => idx);

const find = (a) => {
  if (a !== p[a]) p[a] = find(p[a]);
  return p[a];
};

const union = (a, b) => {
  const pa = find(a);
  const pb = find(b);

  p[pb] = pa;
};

let ans = edges.reduce((pre, cur) => pre + cur[2], 0);
for (const [s, e, c] of edges) {
  const ps = find(s);
  const pe = find(e);

  if (ps === pe) continue;
  union(s, e);
  ans -= c;
}

for (let i = 1; i <= n; i++) {
  find(i);
}

if (new Set(p).size === 2) console.log(ans);
else console.log(-1);
