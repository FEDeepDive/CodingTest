const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [p1, p2, p3] = fs
  .readFileSync(path)
  .toString()
  .trim()
  .split('\n')
  .map((it) => it.split(' ').map(Number));

const [x1, y1] = p1;
const [x2, y2] = p2;
const [x3, y3] = p3;

const v1 = [x2 - x1, y2 - y1];
const v2 = [x3 - x1, y3 - y1];

// 두 벡터의 외적이 양수면 반시계방향
// 두 벡터의 외적이 음수면 시계방향
const product = v1[0] * v2[1] - v1[1] * v2[0];
if (product > 0) console.log(1);
else if (product < 0) console.log(-1);
else console.log(0);
