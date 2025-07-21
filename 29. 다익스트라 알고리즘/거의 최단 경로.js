const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const inputs = fs
  .readFileSync(path)
  .toString()
  .trim()
  .split('\n')
  .map((it) => it.split(' ').map(Number));
let front = 0;

const getMinNode = (n, distance, visited) => {
  let minNode = -1;
  let minDistance = Infinity;

  for (let i = 0; i < n; i++) {
    if (!visited[i] && distance[i] < minDistance) {
      minNode = i;
      minDistance = distance[i];
    }
  }

  return minNode;
};

const dijkstra = (s, n, graph) => {
  const parents = Array.from({ length: n }, () => new Set());
  const distance = Array(n).fill(Infinity);
  const visited = Array(n).fill(false);
  distance[s] = 0;

  for (let _ = 0; _ < n; _++) {
    const node = getMinNode(n, distance, visited);

    if (node === -1) break;
    visited[node] = true;

    for (const [next, cost] of graph[node]) {
      if (cost === -1) continue;

      if (distance[next] > distance[node] + cost) {
        distance[next] = distance[node] + cost;
        parents[next] = new Set([node]);
      } else if (distance[next] === distance[node] + cost) {
        parents[next].add(node);
      }
    }
  }

  return { distance, parents };
};

const removeEdge = (e, parents, graph) => {
  const q = [e];
  const visited = Array(graph.length).fill(false);
  visited[e] = true;
  let front = 0;

  while (front < q.length) {
    const node = q[front++];

    for (const parent of parents[node]) {
      graph[parent] = graph[parent].map(([next, cost]) => (next === node ? [next, -1] : [next, cost]));
      if (!visited[parent]) {
        visited[parent] = true;
        q.push(parent);
      }
    }
  }
};

while (front < inputs.length - 1) {
  const [n, m] = inputs[front++];
  const [s, e] = inputs[front++];
  const graph = Array.from({ length: n }, () => []);

  for (let _ = 0; _ < m; _++) {
    const [u, v, p] = inputs[front++];

    graph[u].push([v, p]);
  }

  const { distance, parents } = dijkstra(s, n, graph);

  if (distance[e] === Infinity) {
    console.log(-1);
    continue;
  }

  removeEdge(e, parents, graph);

  const { distance: ansDistance, _ } = dijkstra(s, n, graph);
  console.log(ansDistance[e] === Infinity ? -1 : ansDistance[e]);
}
