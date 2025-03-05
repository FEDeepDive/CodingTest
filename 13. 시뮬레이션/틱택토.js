const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const inputs = fs.readFileSync(path).toString().trim().split('\n');

const getBingo = (map) => {
  const ansPiece = [];

  if (new Set([map[0], map[1], map[2]]).size === 1) ansPiece.push(map[0]);
  if (new Set([map[3], map[4], map[5]]).size === 1) ansPiece.push(map[3]);
  if (new Set([map[6], map[7], map[8]]).size === 1) ansPiece.push(map[6]);

  if (new Set([map[0], map[3], map[6]]).size === 1) ansPiece.push(map[0]);
  if (new Set([map[1], map[4], map[7]]).size === 1) ansPiece.push(map[1]);
  if (new Set([map[2], map[5], map[8]]).size === 1) ansPiece.push(map[2]);

  if (new Set([map[0], map[4], map[8]]).size === 1) ansPiece.push(map[0]);
  if (new Set([map[2], map[4], map[6]]).size === 1) ansPiece.push(map[2]);

  return ansPiece.filter((it) => it !== '.');
};

for (const input of inputs) {
  if (input === 'end') break;
  let xCnt = 0;
  let oCnt = 0;
  let dotCnt = 0;

  for (const piece of input) {
    if (piece === 'O') oCnt += 1;
    else if (piece === 'X') xCnt += 1;
    else dotCnt += 1;
  }

  const ansPiece = getBingo(input);

  if (dotCnt === 0) {
    if (xCnt !== 5 || oCnt !== 4) console.log('invalid');
    else if (new Set(ansPiece).size === 2) console.log('invalid');
    else if (ansPiece === 0) console.log('valid');
    else if (ansPiece.length === 2) console.log('valid');
    else {
      if (ansPiece[0] === 'O') console.log('invalid');
      else console.log('valid');
    }
  } //
  else {
    if (ansPiece.length === 2) console.log('invalid');
    else if (ansPiece.length === 1) {
      if (ansPiece[0] === 'O' && xCnt === oCnt) console.log('valid');
      else if (ansPiece[0] === 'X' && xCnt - oCnt === 1) console.log('valid');
      else console.log('invalid');
    } else console.log('invalid');
  }
}
