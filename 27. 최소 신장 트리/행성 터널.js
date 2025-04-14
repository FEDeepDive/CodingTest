const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [[n], ...inputs] = fs
  .readFileSync(path)
  .toString()
  .trim()
  .split('\n')
  .map((it) => it.split(' ').map(Number));

const edges = [];
const p = Array.from({ length: n + 1 }, (_, idx) => idx);

let X = [];
let Y = [];
let Z = [];
for (let i = 0; i < n; i++) {
  const [x, y, z] = inputs[i];

  X.push([x, i]);
  Y.push([y, i]);
  Z.push([z, i]);
}

X = X.sort((a, b) => a[0] - b[0]);
Y = Y.sort((a, b) => a[0] - b[0]);
Z = Z.sort((a, b) => a[0] - b[0]);

for (let i = 0; i < n - 1; i++) {
  edges.push([X[i][1], X[i + 1][1], X[i + 1][0] - X[i][0]]);
  edges.push([Y[i][1], Y[i + 1][1], Y[i + 1][0] - Y[i][0]]);
  edges.push([Z[i][1], Z[i + 1][1], Z[i + 1][0] - Z[i][0]]);
}

const find = (a) => {
  if (a !== p[a]) p[a] = find(p[a]);

  return p[a];
};

const union = (a, b) => {
  const pa = find(a);
  const pb = find(b);

  p[pb] = pa;
};

let ans = 0;
for (const [s, e, c] of edges.sort((a, b) => a[2] - b[2])) {
  const ps = find(s);
  const pe = find(e);

  if (ps === pe) continue;
  union(s, e);
  ans += c;
}

console.log(ans);
