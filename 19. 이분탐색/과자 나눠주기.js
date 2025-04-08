const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [[m, n], sticks] = fs
  .readFileSync(path)
  .toString()
  .trim()
  .split('\n')
  .map((it) => it.split(' ').map(Number));

let left = 1;
let right = Math.max(...sticks);
let answer = 0;
while (left <= right) {
  const mid = Math.floor((left + right) / 2);
  let stickCnt = 0;

  for (const stick of sticks) {
    stickCnt += Math.floor(stick / mid);
  }

  if (stickCnt < m) right = mid - 1;
  else {
    left = mid + 1;
    answer = mid;
  }
}

console.log(answer);
