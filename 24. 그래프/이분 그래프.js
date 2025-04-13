const fs = require('fs');
const [n, ...testcases] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');

const answer = [];

for (let i = 0; i < testcases.length; ) {
  // 테스트케이스 첫째 줄에서 그래프 정보를 받고 변수 초기화
  const [v, e] = testcases[i++].split(' ').map(Number);
  const adjList = Array.from({ length: v + 1 }).map(() => new Set());

  // 간선 정보를 가지고 인접 리스트 구성
  const nodesToVisit = new Set();

  for (let j = 0; j < e; j++) {
    const [a, b] = testcases[i++].split(' ').map(Number);
    adjList[a].add(b);
    adjList[b].add(a);
    nodesToVisit.add(a);
    nodesToVisit.add(b);
  }

  // 노드를 하나씩 방문하면서 인접한 노드와 분리
  const result = isBipartiteGraph(adjList, Array.from(nodesToVisit));
  answer.push(result ? 'YES' : 'NO');
}

// 이분 그래프인지 여부 반환
function isBipartiteGraph(adjList, nodes) {
  const setA = new Set();
  const setB = new Set();
  const visited = new Set();

  while (nodes.length) {
    let node = nodes.pop();

    if (visited.has(node)) {
      continue;
    }
    visited.add(node);

    // 내가 속한 집합과 반대 집합을 정의
    const [belonged, other] = setA.has(node) ? [setA, setB] : [setB, setA];

    // 내가 속한 집합에 나 추가
    belonged.add(node);

    for (let adjNode of adjList[node]) {
      // 만약 내가 속한 집합에 인접 노드가 있으면 => false
      if (belonged.has(adjNode)) {
        return false;
      }

      // 반대 집합에 나와 인접한 노드들을 추가
      other.add(adjNode);

      // 인접 노드를 다음에 방문
      if (!visited.has(adjNode)) {
        nodes.push(adjNode);
      }
    }
  }

  return true;
}

console.log(answer.join('\n'));
