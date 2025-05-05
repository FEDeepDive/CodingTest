const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const inputs = fs.readFileSync(path).toString().trim().split('\n');
const n = Number(inputs.shift());
const tree = new Map();

for (const input of inputs) {
  const [node, left, right] = input.split(' ');

  tree.set(node, [left, right]);
}

let preOrderResult = '';
const preOrder = (node) => {
  const [left, right] = tree.get(node);
  preOrderResult += node;

  if (left !== '.') preOrder(left);
  if (right !== '.') preOrder(right);
};
preOrder('A');
console.log(preOrderResult);

let inOrderResult = '';
const inOrder = (node) => {
  const [left, right] = tree.get(node);

  if (left !== '.') inOrder(left);
  inOrderResult += node;
  if (right !== '.') inOrder(right);
};
inOrder('A');
console.log(inOrderResult);

let postOrderResult = '';
const postOrder = (node) => {
  const [left, right] = tree.get(node);

  if (left !== '.') postOrder(left);
  if (right !== '.') postOrder(right);
  postOrderResult += node;
};
postOrder('A');
console.log(postOrderResult);
