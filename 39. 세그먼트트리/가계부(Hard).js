const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const inputs = fs
  .readFileSync(path)
  .toString()
  .trim()
  .split('\n')
  .map((it) => it.split(' ').map(Number));
const [n, _] = inputs.shift();
const tree = Array(4 * n).fill(0);

const update = (start, end, node, idx, diff) => {
  if (idx < start || end < idx) return;

  tree[node] += diff;

  if (start === end) return;

  const mid = Math.floor((start + end) / 2);

  update(start, mid, 2 * node, idx, diff);
  update(mid + 1, end, 2 * node + 1, idx, diff);
};

const sum = (start, end, node, left, right) => {
  if (right < start || end < left) return 0;

  if (left <= start && end <= right) return tree[node];

  const mid = Math.floor((start + end) / 2);
  return sum(start, mid, node * 2, left, right) + sum(mid + 1, end, node * 2 + 1, left, right);
};

for (const [query, p, q] of inputs) {
  if (query === 1) update(0, n - 1, 1, p - 1, q);
  if (query === 2) console.log(sum(0, n - 1, 1, p - 1, q - 1));
}
