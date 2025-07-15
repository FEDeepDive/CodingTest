const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const [[n], inOrder, postOrder] = fs
  .readFileSync(path)
  .toString()
  .trim()
  .split('\n')
  .map((it) => it.split(' ').map(Number));

const inOrderMap = new Map();
const ans = [];

for (let i = 0; i < n; i++) {
  inOrderMap.set(inOrder[i], i);
}

const getPostOrderTree = (inStart, inEnd, postStart, postEnd) => {
  if (inStart > inEnd || postStart > postEnd) return;
  const root = postOrder[postEnd];
  ans.push(root);

  const rootIdx = inOrderMap.get(root);

  const leftTreeSize = rootIdx - inStart;

  getPostOrderTree(inStart, rootIdx - 1, postStart, postStart + leftTreeSize - 1);
  getPostOrderTree(rootIdx + 1, inEnd, postStart + leftTreeSize, postEnd - 1);
};

getPostOrderTree(0, n - 1, 0, n - 1);

console.log(ans.join(' ').trim());
