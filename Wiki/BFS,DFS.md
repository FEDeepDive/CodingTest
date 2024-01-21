# 📌DFS, BFS 차이

```
💡 무슨 방법을 쓰든 방문한 노드 반드시 체크❗ 다시 방문하면 시간 초과
```

|  | DFS(Depth First Search) | BFS(Breath First Search) |
| --- | --- | --- |
| **설명** | 깊이 우선 탐색 | 너비 우선 탐색 |
| **방문 예정 노드 관리** | `스택` or `재귀 함수` | `큐` |
| **특징** | 연결된 노드 중 방문할 노드가 없을 때까지 탐색 | 한 번(depth)에 여러 주변 노드 탐색 ⇒ 반복 |
| **특화 분야** | 완전 탐색이 필요한 경우 | depth 활용이 필요한 경우 |
| **예시 문제** | ✅ 경로의 특징/정보 기억 | ✅ 최단 거리 구하기 |
|  | ✅ 사이클(순환) 유무 확인 | ✅ 현재 시간, 날짜, 카운트 기준으로 다음 카운트 찾기 |

---

# 📌정보 정리 방법

```
💡 노드 수, 간선 수, 간선 정보를 1️⃣인접 행렬, 2️⃣인접 리스트로 정리
```

## 인접 행렬

```javascript
// 노드 개수: V, 간선 개수: E

// 행렬 크기는 (V+1) * (V+1). 0번째 행과 열은 사용하지 않음
const matrix = Array.from({ length: V + 1 }).map(() =>
  Array.from({ length: V + 1 }).fill(0),
);

// 간선 수만큼 반복
for (let [start, end] of edges) {
  matrix[start][end] = 1;
  matrix[end][start] = 1; // 양방향인 경우
}

/** 예시
 * [[0, 0, 0, 0]
 *  [0, 0, 1, 0]
 *  [0, 1, 0, 1]
 *  [0, 0, 1, 0]]
 * /
```

## 인접 리스트

```javascript
// 노드 개수: V, 간선 개수: E

// 리스트 크기는 V. 0번째 열은 사용하지 않음
const list = Array.from({ length: V + 1 }).map(() => []);

// 간선 수만큼 반복
for (let [start, end] of edges) {
  matrix[start].push(end);
  matrix[end].push(start); // 양방향인 경우
}

// 예시: [[], [2], [1,3], [2]]
```

---

# 📌탐색 방법

## 4방 탐색(델타 탐색, 상하좌우 탐색)

- 2차원 배열로 이루어진 공간 탐색 시

```javascript
dr = [1, -1, 0, 0]; // direction of row
dc = [0, 0, 1, -1]; // direction of column

function DFS() {
  const [r, c] = stack.pop() // BFS면 queue.shift()
  visited[r][c] = true; // 방문 체크

  for (let i = 0; i < 4; i++) {
    nr = r + dr[i]; // new row
    nc = c + dc[i]; // new column
    if (/* 갈 수 있고, 방문한 적 X */) {
      stack.push([nr, nc]) // BFS면 queue.push([nr, nc])
      /* ... */
    }
  }
}

while (stack.length > 0) {
  DFS();
}
```
