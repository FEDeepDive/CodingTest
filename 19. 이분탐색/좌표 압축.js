const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [[n], inputs] = fs
  .readFileSync(path)
  .toString()
  .trim()
  .split('\n')
  .map((it) => it.split(' ').map(Number));
const numbers = Array.from(new Set(inputs)).sort((a, b) => a - b);
const map = new Map();

for (let i = 0; i < numbers.length; i++) {
  map[numbers[i]] = i;
}

let ans = '';
for (const input of inputs) {
  ans += map[input] + ' ';
}

console.log(ans.trim());
