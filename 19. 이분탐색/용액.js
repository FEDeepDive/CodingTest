const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [[n], liquid] = fs
  .readFileSync(path)
  .toString()
  .trim()
  .split('\n')
  .map((it) => it.split(' ').map(Number));

let left = 0;
let right = n - 1;
let minAbs = Infinity;
const ans = [0, 0];

while (left < right) {
  const abs = Math.abs(liquid[left] + liquid[right]);

  if (abs < minAbs) {
    minAbs = abs;

    ans[0] = liquid[left];
    ans[1] = liquid[right];
  }

  if (liquid[left] + liquid[right] > 0) right -= 1;
  else left += 1;
}

console.log(...ans);
