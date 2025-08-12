const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [[n], ...costs] = fs
  .readFileSync(path)
  .toString()
  .trim()
  .split('\n')
  .map((it) => it.split(' ').map(Number));

let ans = Infinity;
let stack = [];
const bt = (cnt) => {
  if (stack.length === n) {
    const start = stack[0];
    const end = stack.at(-1);
    if (costs[end][start] === 0) return;

    ans = Math.min(ans, cnt + costs[end][start]);
    return;
  }

  for (let i = 0; i < n; i++) {
    if (stack.includes(i)) continue;
    const start = stack.at(-1);
    const end = i;

    const cost = costs[start][end];
    if (cost === 0) continue;
    stack.push(i);
    bt(cnt + costs[start][end]);
    stack.pop();
  }
};

for (let i = 0; i < n; i++) {
  stack.push(i);
  bt(0);
  stack = [];
}

console.log(ans);
