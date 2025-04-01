const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [[n, m], ...inputs] = fs
  .readFileSync(path)
  .toString()
  .trim()
  .split('\n')
  .map((it) => it.split(' ').map(Number));
const graph = inputs.sort((a, b) => a[2] - b[2]);
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

const ans = [0];
for (const [s, e, c] of graph) {
  const ps = find(s);
  const pe = find(e);

  if (ps === pe) continue;
  union(s, e);
  ans.push(c);
}

ans.pop();

console.log(ans.reduce((pre, cur) => pre + cur));
