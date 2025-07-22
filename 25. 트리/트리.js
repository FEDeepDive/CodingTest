const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const inputs = fs
  .readFileSync(path)
  .toString()
  .trim()
  .split('\n')
  .map((it) => it.split(' ').map(Number));

let front = 0;
let testcase = 1;
while (front < inputs.length - 1) {
  const [n, m] = inputs[front++];
  const p = Array.from({ length: n + 1 }, (_, idx) => idx);
  const cycles = new Set();
  let ans = 0;

  const find = (a) => {
    if (a !== p[a]) p[a] = find(p[a]);

    return p[a];
  };

  const union = (a, b) => {
    const pa = find(a);
    const pb = find(b);

    p[pb] = pa;
  };

  for (let _ = 0; _ < m; _++) {
    const [s, e] = inputs[front++];
    const ps = find(s);
    const pe = find(e);

    if (ps === pe) cycles.add(s);
    else union(s, e);
  }

  for (let i = 1; i <= n; i++) {
    find(i);
  }

  const cycleSet = new Set();
  for (const cycle of cycles) {
    cycleSet.add(p[cycle]);
  }

  for (let i = 1; i <= n; i++) {
    if (cycleSet.has(p[i])) continue;
    ans += 1;
    cycleSet.add(p[i]);
  }

  if (ans > 1) console.log(`Case ${testcase++}: A forest of ${ans} trees.`);
  else if (ans === 1) console.log(`Case ${testcase++}: There is one tree.`);
  else console.log(`Case ${testcase++}: No trees.`);
}
