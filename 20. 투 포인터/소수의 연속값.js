const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const n = +fs.readFileSync(path).toString().trim();
const memo = Array(n + 1).fill(1);
const primeNumber = [];

// n까지의 모든 소수를 구한다
for (let i = 2; i <= Math.sqrt(n); i++) {
  if (memo[i] === 0) continue;

  for (let j = i + i; j <= n; j += i) {
    memo[j] = 0;
  }
}

for (let i = 2; i <= n; i++) {
  if (memo[i]) primeNumber.push(i);
}

// 투포인터를 사용해 소수의 연속합의 개수를 카운팅한다.
let left = 0;
let right = 0;
let ans = 0;
let sum = primeNumber[right];

while (left <= right && right < primeNumber.length) {
  if (sum < n) {
    right += 1;
    sum += primeNumber[right];
  } //
  else if (sum > n) {
    sum -= primeNumber[left];
    left += 1;
  } //
  else {
    ans += 1;
    sum -= primeNumber[left];
    left += 1;
    right += 1;
    sum += primeNumber[right];
  }
}

console.log(ans);
