const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [a, b] = fs.readFileSync(path).toString().trim().split('\n');
let and = '';
let or = '';
let xor = '';
let notA = '';
let notB = '';

for (let i = 0; i < 100000; i++) {
  and += a[i] === '1' && b[i] === '1' ? 1 : 0;
  or += a[i] === '1' || b[i] === '1' ? 1 : 0;
  xor += a[i] !== b[i] ? 1 : 0;
  notA += a[i] === '1' ? 0 : 1;
  notB += b[i] === '1' ? 0 : 1;
}

console.log(and);
console.log(or);
console.log(xor);
console.log(notA);
console.log(notB);
