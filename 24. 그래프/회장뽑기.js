const fs = require('fs');
let [n, ...input] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

n = Number(n);

const adjList = Array.from({ length: n + 1 }).map(() => new Set());

input.pop(); // 마지막 줄(-1 -1) 제거
input.forEach((line) => {
  const [a, b] = line.split(' ').map(Number);
  adjList[a].add(b);
  adjList[b].add(a);
});

let minDepth = 99;
let candidate = [];

for (let i = 1; i <= n; i++) {
  const depth = bfs(i);
  if (depth < minDepth) {
    minDepth = depth;
    candidate = [i];
  } else if (depth === minDepth) {
    candidate.push(i);
  }
}

console.log(minDepth, candidate.length);
console.log(candidate.join(' '));

function bfs(i) {
  const queue = Array.from(adjList[i]).map((num) => ({ num, depth: 1 }));
  let pointer = 0;
  const visited = new Set(adjList[i]);

  while (queue.length > pointer) {
    const { num, depth } = queue[pointer++];

    adjList[num].forEach((friendOfFriend) => {
      if (friendOfFriend !== i && !visited.has(friendOfFriend)) {
        queue.push({ num: friendOfFriend, depth: depth + 1 });
        visited.add(friendOfFriend);
      }
    });
  }

  if (visited.size === n - 1) {
    return queue[queue.length - 1].depth;
  }

  return -1;
}
