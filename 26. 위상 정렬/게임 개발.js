const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const inputs = fs
  .readFileSync(path)
  .toString()
  .trim()
  .split('\n')
  .map((it) => it.split(' ').map(Number));
const [n] = inputs[0];
const graph = Array.from({ length: n + 1 }, () => []);
const indegree = Array(n + 1).fill(0);
const costs = Array(n + 1).fill(0);
const dp = Array(n + 1).fill(0);

// dp[n] = Math.max(dp[이전단계]) + cost[n]
// 자기가 꼭 수행해야 하는 녀석들 + 자기 짓는 시간
// 위의 dp가 수행되려면 이전단계(위상정렬) 순서대로 dp를 채워야 함

for (let i = 1; i <= n; i++) {
  dp[i] = costs[i] = inputs[i].shift();

  inputs[i].pop();

  for (const num of inputs[i]) {
    graph[num].push(i);
    indegree[i] += 1;
  }
}

const q = [];
for (let i = 1; i <= n; i++) {
  if (indegree[i] === 0) {
    q.push(i);
  }
}

while (q.length) {
  const node = q.shift();

  for (const next of graph[node]) {
    dp[next] = Math.max(dp[node] + costs[next], dp[next]);

    indegree[next] -= 1;

    if (indegree[next] === 0) q.push(next);
  }
}

for (let i = 1; i <= n; i++) {
  console.log(dp[i]);
}
