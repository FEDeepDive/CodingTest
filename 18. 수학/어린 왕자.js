const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [T, ...inputs] = fs.readFileSync(path).toString().trim().split('\n');

let front = 0;
for (let _ = 0; _ < +T; _++) {
  const [x1, y1, x2, y2] = inputs[front++].split(' ').map(Number);
  const n = +inputs[front++];
  let ans = 0;

  for (let i = 0; i < n; i++) {
    const [cx, cy, r] = inputs[front++].split(' ').map(Number);

    const isIncludeStart = (x1 - cx) ** 2 + (y1 - cy) ** 2 < r ** 2;
    const isIncludeEnd = (x2 - cx) ** 2 + (y2 - cy) ** 2 < r ** 2;

    if (isIncludeStart && isIncludeEnd) continue;
    else if (isIncludeStart || isIncludeEnd) ans += 1;
  }
  console.log(ans);
}
