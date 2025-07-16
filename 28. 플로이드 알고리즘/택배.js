const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const inputs = fs
  .readFileSync(path)
  .toString()
  .trim()
  .split('\n')
  .map((it) => it.split(' ').map(Number));
const [n, m] = inputs.shift();

const graph = Array.from({ length: n + 1 }, () => []);
const map = Array.from({ length: n + 1 }, () => Array(n + 1).fill('-'));

for (const [s, e, c] of inputs) {
  graph[s].push([e, c]);
  graph[e].push([s, c]);
}
const getMinNode = (visited, distances) => {
  let minNode = -1;
  let minDistance = Infinity;

  for (let i = 1; i <= n; i++) {
    if (!visited[i] && minDistance > distances[i]) {
      minNode = i;
      minDistance = distances[i];
    }
  }

  return minNode;
};

// 다익스트라
const dijkstra = (start) => {
  const distances = Array(n + 1).fill(Infinity);
  const visited = Array(n + 1).fill(false);

  distances[start] = 0;

  while (true) {
    const node = getMinNode(visited, distances);

    if (node === -1) break;
    visited[node] = true;

    for (const [next, cost] of graph[node]) {
      if (distances[next] > distances[node] + cost) {
        distances[next] = distances[node] + cost;
        map[start][next] = map[start][node] !== '-' ? map[start][node] : next;
      }
    }
  }
};

for (let i = 1; i <= n; i++) {
  dijkstra(i);
}

for (let i = 1; i <= n; i++) {
  let ans = '';

  for (let j = 1; j <= n; j++) {
    ans += map[i][j] + ' ';
  }
  console.log(ans.trim());
}
