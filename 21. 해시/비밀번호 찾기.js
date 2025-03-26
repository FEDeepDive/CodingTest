const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);
const hash = {};

input.slice(1, n + 1).forEach((line) => {
  const [site, password] = line.split(' ');
  hash[site] = password;
});

const answer = input.slice(n + 1).map((site) => hash[site]);
console.log(answer.join('\n'));
