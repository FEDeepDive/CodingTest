const fs = require('fs');
const [n, ...input] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');

const graph = input.map((row) => row.split(' ').map(Number));

for (let k = 0; k < n; k++) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (graph[i][k] && graph[k][j]) graph[i][j] = 1;
    }
  }
}

console.log(graph.map((row) => row.join(' ')).join('\n'));
