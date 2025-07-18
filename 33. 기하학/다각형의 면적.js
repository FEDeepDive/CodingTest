const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [[n], ...inputs] = fs
  .readFileSync(path)
  .toString()
  .trim()
  .split('\n')
  .map((it) => it.split(' ').map(Number));
inputs.push(inputs[0]);

let ans = 0;

for (let i = 0; i < n; i++) {
  ans += inputs[i][0] * inputs[i + 1][1] - inputs[i][1] * inputs[i + 1][0];
}

console.log((Math.abs(ans) * 0.5).toFixed(1));
