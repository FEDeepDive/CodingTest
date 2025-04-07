const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [[n], ...inputs] = fs
  .readFileSync(path)
  .toString()
  .trim()
  .split('\n')
  .map((it) => it.split(' ').map(Number));

let ans = Infinity;
for (let startColor = 0; startColor < 3; startColor++) {
  const dp = Array.from({ length: n }, () => Array(3).fill(Infinity));
  dp[0][startColor] = inputs[0][startColor];

  for (let i = 1; i < n; i++) {
    dp[i][0] = Math.min(dp[i - 1][1], dp[i - 1][2]) + inputs[i][0];
    dp[i][1] = Math.min(dp[i - 1][0], dp[i - 1][2]) + inputs[i][1];
    dp[i][2] = Math.min(dp[i - 1][0], dp[i - 1][1]) + inputs[i][2];
  }

  for (let endColor = 0; endColor < 3; endColor++) {
    if (startColor === endColor) continue;
    ans = Math.min(ans, dp[n - 1][endColor]);
  }
}

console.log(ans);
