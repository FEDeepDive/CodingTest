const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const inputs = fs
  .readFileSync(path)
  .toString()
  .trim()
  .split('\n')
  .map((it) => it.split(' ').map(Number));

const [n, m, t] = inputs[0];
const map = inputs.slice(1, n + 1);

for (const [x, d, k] of inputs.splice(n + 1)) {
  // 원판 돌리기
  for (let i = x; i <= n; i += x) {
    for (let _ = 0; _ < k; _++) {
      if (d === 0) map[i - 1].unshift(map[i - 1].pop());
      else map[i - 1].push(map[i - 1].shift());
    }
  }

  // 인접한 수 확인
  const deleteXY = [];
  let sum = 0;
  let cnt = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (map[i][j] === 'x') continue;
      if (i !== n - 1 && map[i][j] === map[i + 1][j]) deleteXY.push([i, j], [i + 1, j]);
      if (j !== m - 1 && map[i][j] === map[i][j + 1]) deleteXY.push([i, j], [i, j + 1]);
      if (j === m - 1 && map[i][j] === map[i][0]) deleteXY.push([i, j], [i, 0]);
      sum += map[i][j];
      cnt += 1;
    }
  }

  // 지울 수 있으면 지우고, 아니면 평균을 구함
  const avg = sum / cnt;
  if (deleteXY.length === 0) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (map[i][j] > avg) map[i][j] -= 1;
        else if (map[i][j] < avg) map[i][j] += 1;
      }
    }
  } //
  else {
    for (const [dX, dY] of deleteXY) {
      map[dX][dY] = 'x';
    }
  }
}

let ans = 0;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (map[i][j] === 'x') continue;
    ans += map[i][j];
  }
}

console.log(ans);
