const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [[_], ...inputs] = fs
  .readFileSync(path)
  .toString()
  .trim()
  .split('\n')
  .map((it) => it.split(' ').map(Number));

for (const [x1, y1, r1, x2, y2, r2] of inputs) {
  const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  const rSum = r1 + r2;
  const rDiff = Math.abs(r1 - r2);

  if (x1 === x2 && y1 === y2 && r1 === r2) console.log(-1); // 무한대
  else if (distance > rSum) console.log(0); // 만나지 않음
  else if (distance < rDiff) console.log(0);
  else if (Math.abs(distance - rSum) < 1e-6 || Math.abs(distance - rDiff) < 1e-6) console.log(1);
  else console.log(2); // 두 점에서 만남
}
