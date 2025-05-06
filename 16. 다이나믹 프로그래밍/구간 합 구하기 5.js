const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const inputs = fs
  .readFileSync(path)
  .toString()
  .trim()
  .split('\n')
  .map((it) => it.split(' ').map(Number));
const [n, m] = inputs[0];
const dp = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));
const map = [];

for (let i = 1; i <= n; i++) {
  map.push(inputs[i]);
}

for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= n; j++) {
    dp[i][j] = map[i - 1][j - 1] + dp[i - 1][j] + dp[i][j - 1] - dp[i - 1][j - 1];
  }
}

for (let i = n + 1; i <= n + m; i++) {
  const [x1, y1, x2, y2] = inputs[i];
  const ans = dp[x2][y2] - dp[x1 - 1][y2] - dp[x2][y1 - 1] + dp[x1 - 1][y1 - 1];
  console.log(ans);
}
