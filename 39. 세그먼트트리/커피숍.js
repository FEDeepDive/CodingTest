const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const inputs = fs
  .readFileSync(path)
  .toString()
  .trim()
  .split('\n')
  .map((it) => it.split(' ').map(Number));
const [n, q] = inputs[0];
const tree = Array(4 * n).fill(0);
const numbers = inputs[1];

const init = (start, end, node) => {
  if (start === end) return (tree[node] = numbers[start]);

  const mid = Math.floor((start + end) / 2);

  return (tree[node] = init(start, mid, 2 * node) + init(mid + 1, end, 2 * node + 1));
};

const update = (start, end, node, idx, diff) => {
  if (idx < start || end < idx) return;
  tree[node] += diff;

  if (start === end) return;
  const mid = Math.floor((start + end) / 2);

  update(start, mid, 2 * node, idx, diff);
  update(mid + 1, end, 2 * node + 1, idx, diff);
};

const sum = (start, end, node, left, right) => {
  if (start > right || end < left) return 0;
  if (left <= start && end <= right) return tree[node];

  const mid = Math.floor((start + end) / 2);

  return sum(start, mid, node * 2, left, right) + sum(mid + 1, end, node * 2 + 1, left, right);
};

init(0, n - 1, 1);

for (let i = 2; i < inputs.length; i++) {
  const [x, y, a, b] = inputs[i];

  const s = Math.min(x - 1, y - 1);
  const e = Math.max(x - 1, y - 1);
  console.log(sum(0, n - 1, 1, s, e));

  const diff = b - numbers[a - 1];
  numbers[a - 1] = b;
  update(0, n - 1, 1, a - 1, diff);
}
