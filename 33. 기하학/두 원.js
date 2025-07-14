const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [x1, y1, r1, x2, y2, r2] = fs.readFileSync(path).toString().trim().split(' ').map(Number);
const d = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

let ans;
if (r1 + r2 < d) ans = 0;
else if (d <= Math.abs(r1 - r2)) ans = Math.PI * Math.min(r1, r2) ** 2;
else {
  const c1 = 2 * Math.acos((r1 ** 2 + d ** 2 - r2 ** 2) / (2 * r1 * d));
  const c2 = 2 * Math.acos((r2 ** 2 + d ** 2 - r1 ** 2) / (2 * r2 * d));

  const part1 = 0.5 * r1 ** 2 * (c1 - Math.sin(c1));
  const part2 = 0.5 * r2 ** 2 * (c2 - Math.sin(c2));

  ans = part1 + part2;
}

console.log(ans.toFixed(3));
