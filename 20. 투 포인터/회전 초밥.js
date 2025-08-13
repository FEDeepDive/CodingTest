const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const inputs = fs.readFileSync(path).toString().trim().split('\n');
const [n, d, k, c] = inputs.shift().split(' ').map(Number);
const sushi = inputs.map(Number);
sushi.push(...sushi);

const count = Array(d + 1).fill(0);
let ans = 0;
let kind = 0;

for (let i = 0; i < k; i++) {
  const idx = sushi[i];
  if (count[idx] === 0) kind++;
  count[idx]++;
}

for (let i = 0; i < n; i++) {
  ans = Math.max(ans, kind + (count[c] ? 0 : 1));

  const start = sushi[i];
  const end = sushi[i + k];

  count[start] -= 1;
  if (count[start] === 0) kind--;

  if (count[end] === 0) kind++;
  count[end] += 1;
}

console.log(ans);
