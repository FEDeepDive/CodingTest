const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [[n, m], ...inputs] = fs
  .readFileSync(path)
  .toString()
  .trim()
  .split('\n')
  .map((it) => it.split(' ').map(Number));

const graph = Array.from({ length: n + 1 }, () => []);
const inDegree = Array(n + 1).fill(0);
const q = [];

for (const input of inputs) {
  for (let i = 1; i < input.length - 1; i++) {
    const s = input[i];
    const e = input[i + 1];

    graph[s].push(e);
    inDegree[e] += 1;
  }
}

for (let i = 1; i <= n; i++) {
  if (inDegree[i] === 0) q.push(i);
}

const ans = [];
while (q.length) {
  const current = q.shift();

  ans.push(current);

  for (const next of graph[current]) {
    inDegree[next] -= 1;

    if (inDegree[next] === 0) q.push(next);
  }
}

if (ans.length < n) console.log(0);
else console.log(ans.join('\n').trim());
