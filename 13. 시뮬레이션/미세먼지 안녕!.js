const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [[r, c, t], ...map] = fs
  .readFileSync(path)
  .toString()
  .trim()
  .split('\n')
  .map((it) => it.split(' ').map(Number));

const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];

const spreadDust = (dusts) => {
  const q = [];
  // 하나의 먼지를 확산시킨
  for (const [x, y] of dusts) {
    const spreadAmount = Math.floor(map[x][y] / 5);
    let spreadCount = 0;

    // 현재의 먼지의 4 방향을 확인
    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      // 칸이 없음
      if (nx < 0 || ny < 0 || nx >= r || ny >= c) continue;
      if (map[nx][ny] === -1) continue;

      spreadCount += 1;
      q.push([nx, ny, spreadAmount]);
    }

    q.push([x, y, -spreadAmount * spreadCount]);
  }

  for (const [x, y, amount] of q) {
    map[x][y] += amount;
  }
};

// 공청기의 좌표와 순환 방향
const runAirCleaner = (x, y, d) => {
  let preNum = 0;
  let nextNum = 0;

  if (d === -1) {
    for (let i = y + 1; i < c; i++) {
      nextNum = map[x][i];
      map[x][i] = preNum;
      preNum = nextNum;
    }
    for (let i = x - 1; i >= 0; i--) {
      nextNum = map[i][c - 1];
      map[i][c - 1] = preNum;
      preNum = nextNum;
    }
    for (let i = c - 2; i >= 0; i--) {
      nextNum = map[0][i];
      map[0][i] = preNum;
      preNum = nextNum;
    }
    for (let i = 1; i < x; i++) {
      nextNum = map[i][0];
      map[i][0] = preNum;
      preNum = nextNum;
    }

    return;
  }

  for (let i = y + 1; i < c; i++) {
    nextNum = map[x][i];
    map[x][i] = preNum;
    preNum = nextNum;
  }
  for (let i = x + 1; i < r; i++) {
    nextNum = map[i][c - 1];
    map[i][c - 1] = preNum;
    preNum = nextNum;
  }
  for (let i = c - 2; i >= 0; i--) {
    nextNum = map[r - 1][i];
    map[r - 1][i] = preNum;
    preNum = nextNum;
  }
  for (let i = r - 2; i > x; i--) {
    nextNum = map[i][0];
    map[i][0] = preNum;
    preNum = nextNum;
  }
};

for (let _ = 0; _ < t; _++) {
  const dusts = [];
  const airCleaner = [];

  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (map[i][j] > 0) dusts.push([i, j]);
      if (map[i][j] === -1) airCleaner.push([i, j]);
    }
  }

  // 먼지를 확산시킴
  spreadDust(dusts);

  runAirCleaner(airCleaner[0][0], airCleaner[0][1], -1);
  runAirCleaner(airCleaner[1][0], airCleaner[1][1], 1);
}

let dustAmount = 0;
for (let i = 0; i < r; i++) {
  for (let j = 0; j < c; j++) {
    dustAmount += map[i][j];
  }
}

console.log(dustAmount + 2);
