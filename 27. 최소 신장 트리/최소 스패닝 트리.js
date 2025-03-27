const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [[v, e], ...inputs] = fs
  .readFileSync(path)
  .toString()
  .trim()
  .split('\n')
  .map((it) => it.split(' ').map(Number));
const edges = inputs.sort((a, b) => a[2] - b[2]);
const p = Array.from({ length: v + 1 }, (_, idx) => idx);

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
for (const [s, e, c] of edges) {
  const ps = find(s);
  const pe = find(e);

  if (ps === pe) continue;
  union(s, e);
  ans += c;
}

console.log(ans);
