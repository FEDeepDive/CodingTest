const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [[n, m], ...map] = fs
  .readFileSync(path)
  .toString()
  .trim()
  .split('\n')
  .map((it) => it.split(' ').map(Number));

const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];

const chickens = [];
let ans = Infinity;

// 모든 치킨 위치를 저장
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (map[i][j] === 2) chickens.push([i, j]);
  }
}

// 치킨집을 없애고 난 뒤 치킨 거리를 구해서 최소값 갱신
const getChickenDistance = (selected) => {
  const houses = [];
  const survivedChickens = [];
  let totalChickenDistance = 0;

  for (let i = 0; i < selected.length; i++) {
    map[selected[i][0]][selected[i][1]] = 0;
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (map[i][j] === 1) houses.push([i, j]);
      if (map[i][j] === 2) survivedChickens.push([i, j]);
    }
  }

  for (const [houseX, houseY] of houses) {
    let minChickenDistance = Infinity;

    for (const [chickenX, chickenY] of survivedChickens) {
      const chickenDistance = Math.abs(chickenX - houseX) + Math.abs(chickenY - houseY);
      if (chickenDistance < minChickenDistance) minChickenDistance = chickenDistance;
    }

    totalChickenDistance += minChickenDistance;
  }

  for (let i = 0; i < selected.length; i++) {
    map[selected[i][0]][selected[i][1]] = 2;
  }

  return totalChickenDistance;
};

// 백트래킹으로 치킨집 없애주기
const bt = (selected, start) => {
  // 치킨집을 chickens.length - m 만큼 없애줘야 함.
  if (selected.length === chickens.length - m) {
    const chickenDistance = getChickenDistance(selected);

    if (chickenDistance < ans) ans = chickenDistance;

    return;
  }

  for (let i = start; i < chickens.length; i++) {
    bt([...selected, chickens[i]], i + 1);
  }
};

bt([], 0);

console.log(ans);
