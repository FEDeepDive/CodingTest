const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [[N], ...W] = fs
  .readFileSync(path)
  .toString()
  .trim()
  .split('\n')
  .map((it) => it.split(' ').map(Number));
const dp = Array.from({ length: N }, () => Array(1 << (N - 1)).fill(0));

const TSP = (n, route) => {
  if (dp[n][route] !== 0) return dp[n][route];

  if (route === (1 << (N - 1)) - 1) return W[n][0] || Infinity;

  let min = Infinity;
  for (let i = 1; i < N; i++) {
    if (!W[n][i] || route & (1 << (i - 1))) continue;

    const distance = W[n][i] + TSP(i, route | (1 << (i - 1)));
    min = Math.min(distance, min);
  }

  dp[n][route] = min;

  return min;
};

console.log(TSP(0, 0));
