const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const inputs = fs
  .readFileSync(path)
  .toString()
  .trim()
  .split('\n')
  .map((it) => it.split(' ').map(Number));

const [x1, y1, x2, y2] = inputs[0];
const [x3, y3, x4, y4] = inputs[1];

const CCW = (x1, y1, x2, y2, x3, y3) => {
  return (x2 - x1) * (y3 - y1) - (y2 - y1) * (x3 - x1);
};

const a = CCW(x1, y1, x2, y2, x3, y3);
const b = CCW(x1, y1, x2, y2, x4, y4);

const c = CCW(x3, y3, x4, y4, x1, y1);
const d = CCW(x3, y3, x4, y4, x2, y2);

if (a * b <= 0 && c * d <= 0) console.log(1);
else console.log(0);
