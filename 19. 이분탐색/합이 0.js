const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const inputs = fs.readFileSync(path).toString().trim().split('\n');
const n = +inputs[0];
const A = inputs[1]
  .split(' ')
  .map(Number)
  .sort((a, b) => a - b);

let ans = 0;
const twoPointer = (target, start, end) => {
  let left = start;
  let right = end;

  while (left <= right) {
    const sum = A[left] + A[right] + target;

    if (sum < 0) left += 1;
    else if (sum > 0) right -= 1;
    else {
      if (A[left] === A[right]) {
        ans += ((right - left) * (right - left + 1)) / 2;
        break;
      }

      let leftCnt = 1;
      while (left + 1 < right && A[left] === A[left + 1]) {
        left += 1;
        leftCnt += 1;
      }

      let rightCnt = 1;
      while (right - 1 > left && A[right] === A[right - 1]) {
        right -= 1;
        rightCnt += 1;
      }

      ans += leftCnt * rightCnt;
      left += 1;
      right -= 1;
    }
  }
};

for (let i = 0; i < n - 2; i++) {
  twoPointer(A[i], i + 1, n - 1);
}

console.log(ans);
