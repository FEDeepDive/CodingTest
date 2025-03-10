const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [[n, m, l], inputs] = fs
  .readFileSync(path)
  .toString()
  .trim()
  .split('\n')
  .map((it) => it.split(' ').map(Number));

const location = [0, ...(inputs ?? []), l].sort((a, b) => a - b);
const diff = [];

for (let i = 0; i <= n; i++) {
  diff.push(location[i + 1] - location[i]);
}

let start = 1;
let end = l - 1;

while (start <= end) {
  const mid = Math.floor((start + end) / 2);
  let cnt = 0;

  for (const d of diff) {
    cnt += Math.floor((d - 1) / mid);
  }

  if (cnt > m) start = mid + 1;
  else {
    end = mid - 1;
  }
}

console.log(start);
