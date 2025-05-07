const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const inputs = fs.readFileSync(path).toString().trim().split('\n');

const isGroupWord = (word) => {
  const charSet = new Set();

  for (const w of word) {
    if (charSet.has(w)) return false;
    charSet.add(w);
  }

  return true;
};

let ans = 0;

for (let i = 1; i < inputs.length; i++) {
  if (isGroupWord(inputs[i])) ans += 1;
}

console.log(ans);
