const fs = require('fs');
const [n, p, q] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split(' ')
  .map(Number);

const memo = new Map();

function dp(i) {
  if (i === 0) return 1;
  if (memo.has(i)) return memo.get(i);

  const result = dp(Math.floor(i / p)) + dp(Math.floor(i / q));
  memo.set(i, result);

  return result;
}

console.log(dp(n));
