const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const myFriends = new Set();
const friendsOfFriends = new Set();

const list = input.slice(2).sort();

for (let relation of list) {
  const [a, b] = relation.split(' ').map(Number);
  if (a === 1) {
    myFriends.add(b);
  } else if (myFriends.has(a)) {
    friendsOfFriends.add(b);
  } else if (myFriends.has(b)) {
    friendsOfFriends.add(a);
  }
}

console.log(new Set([...myFriends, ...friendsOfFriends]).size);
