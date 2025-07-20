const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [[n], ...inputs] = fs
  .readFileSync(path)
  .toString()
  .trim()
  .split('\n')
  .map((it) => it.split(' ').map(Number));
const p = Array.from({ length: n }, (_, idx) => idx);

const find = (a) => {
  if (a !== p[a]) p[a] = find(p[a]);

  return p[a];
};

const union = (a, b) => {
  const pa = find(a);
  const pb = find(b);

  p[pb] = pa;
};

const CCW = (x1, y1, x2, y2, x3, y3) => {
  const v1 = [x2 - x1, y2 - y1];
  const v2 = [x3 - x1, y3 - y1];

  const product = v1[0] * v2[1] - v1[1] * v2[0];

  if (product > 0) return 1;
  if (product < 0) return -1;
  return 0;
};

const isCross = ([x1, y1, x2, y2], [x3, y3, x4, y4]) => {
  const ab = CCW(x1, y1, x2, y2, x3, y3) * CCW(x1, y1, x2, y2, x4, y4);
  const cd = CCW(x3, y3, x4, y4, x1, y1) * CCW(x3, y3, x4, y4, x2, y2);

  if (ab === 0 && cd === 0) {
    return (
      Math.min(x1, x2) <= Math.max(x3, x4) &&
      Math.min(x3, x4) <= Math.max(x1, x2) &&
      Math.min(y1, y2) <= Math.max(y3, y4) &&
      Math.min(y3, y4) <= Math.max(y1, y2)
    );
  }

  return ab <= 0 && cd <= 0;
};

for (let i = 0; i < n; i++) {
  for (let j = i + 1; j < n; j++) {
    if (isCross(inputs[i], inputs[j])) union(i, j);
  }
}

const ans = Array(n).fill(0);
for (let i = 0; i < n; i++) {
  ans[find(i)] += 1;
}

console.log(ans.filter((it) => it > 0).length);
console.log(Math.max(...ans));
