const fs = require('fs');
const input = fs
  // .readFileSync('/dev/stdin')
  .readFileSync('../input.txt')
  .toString()
  .trim()
  .split('\n');

/*
- 난이도, 문제번호 기준으로 BST 구성
- { 문제번호: 난이도 } 꼴의 해시 구성

1. recommend
  => BST 가장 왼쪽 / 오른쪽 노드 반환

2. add
  => insert할 자리에 isnert

3. solved
  => P-L 해시에서 문제 P의 난이도 L을 찾은 다음,
  => L과 P가 일치하는 노드 찾아서 삭제
*/

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(data) {
    const newNode = new Node(data);

    if (this.root === null) {
      this.root = newNode;
      return;
    }

    this._insertNode(newNode, this.root);
  }

  _insertNode(newNode, root) {
    // 삽입하는 노드의 문제 난이도가 더 작은 경우
    if (newNode.data.l < root.data.l) {
      if (!root.left) {
        root.left = newNode;
        return;
      }
      this._insertNode(newNode, root.left);
    }

    // 삽입하는 노드의 문제 난이도가 더 큰 경우
    else if (newNode.data.l > root.data.l) {
      if (!root.right) {
        root.right = newNode;
        return;
      }
      this._insertNode(newNode, root.right);
    }

    // 삽입하는 노드의 문제 난이도가 현재 노드와 같은 경우
    else {
      // 문제 번호 비교
      if (newNode.data.p < root.data.p) {
        if (!root.left) {
          root.left = newNode;
          return;
        }
        this._insertNode(newNode, root.left);
      } else {
        if (!root.right) {
          root.right = newNode;
          return;
        }
        this._insertNode(newNode, root.right);
      }
    }
  }

  remove(data) {
    this.root = this._removeNode(this.root, data);
  }

  _removeNode(node, data) {
    // 현재 root가 타겟 노드가 아닌 경우
    if (node === null) {
      return null;
    } else if (
      data.l < node.data.l ||
      (data.l === node.data.l && data.p < node.data.p)
    ) {
      node.left = this._removeNode(node.left, data);
      return node;
    } else if (
      data.l > node.data.l ||
      (data.l === node.data.l && data.p > node.data.p)
    ) {
      node.right = this._removeNode(node.right, data);
      return node;
    }

    // 현재 root가 타겟 노드인 경우 1,2,3에 따라 삭제
    // 1. 타겟 노드가 leaf인 경우, null 반환
    if (!node.left && !node.right) {
      node = null;
      return node;
    }

    // 2. 타겟 노드에 자식이 하나인 경우, 해당 자식을 반환
    if (!node.left) {
      node = node.right;
      return node;
    } else if (!node.right) {
      node = node.left;
      return node;
    }

    // 3. 타겟 노드에 자식이 둘 이상인 경우, right 서브 트리에서 최솟값인 노드 반환
    const nextNodeData = this.findMinData(node.right);
    node.data = nextNodeData;
    node.right = this._removeNode(node.right, nextNodeData);
    return node;
  }

  findMinData(root = this.root) {
    let current = root;
    while (current.left) {
      current = current.left;
    }

    return current.data;
  }

  findMaxData(root = this.root) {
    let current = root;
    while (current.right) {
      current = current.right;
    }

    return current.data;
  }
}

// 변수 및 자료구조 초기화
const n = Number(input[0]);
const BST = new BinarySearchTree();
const PLMap = {};

// BST 초기 구성
for (let i = 1; i <= n; i++) {
  const [p, l] = input[i].split(' ').map(Number);
  PLMap[p] = l;
  BST.insert({ p, l });
}

// 삽입/삭제/추천 명령 실행
for (let i = n + 2; i < input.length; i++) {
  const [command, ...pl] = input[i].split(' ');
  const [p, l] = pl.map(Number);

  switch (command) {
    // 리스트에 [p, l]을 삽입
    case 'add':
      BST.insert({ p, l });
      PLMap[p] = l;
      break;

    // 리스트에서 문제번호 p를 삭제
    case 'solved':
      BST.remove({ p, l: PLMap[p] });
      delete PLMap[p];
      break;

    case 'recommend':
      // 가장 어려운 문제 중 문제번호가 가장 큰 문제의 번호 p를 출력
      if (p === 1) {
        const data = BST.findMaxData();
        console.log(data.p);
      }
      // 가장 쉬운 문제 중 문제번호가 가장 작은 문제의 번호 p를 출력
      else if (p === -1) {
        const data = BST.findMinData();
        console.log(data.p);
      }
      break;
  }
}
