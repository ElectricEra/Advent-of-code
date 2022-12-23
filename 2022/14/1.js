// Setup
const fs = require('fs');
const data = fs.readFileSync('./data.txt', 'utf8');

// Solution
const parsedData = data.split('\n').map(row => row.split(' -> ').map(el => el.split(',').map(Number)));

const parsedMap = parsedData.map(row => row.reduce((acc, el) => {
  if (!acc.length) {
    acc.push(el)
  } else {
    if (acc[acc.length - 1][0] - el[0] === 0) {
      const from = acc[acc.length - 1][1];
      const to = el[1];
      const increment = Math.sign(to - from);
      for (var i = from; i !== to; i += increment) {
        acc.push([el[0], i + increment])
      }
    } else {
      const from = acc[acc.length - 1][0];
      const to = el[0];
      const increment = Math.sign(to - from);
      for (var i = from; i !== to; i += increment) {
        acc.push([i + increment, el[1]])
      }
    }
  }

  return acc
}, [])).flat();

const formattedMap = new Set(parsedMap.map(coords => coords.join(',')));
const findEndY = parsedMap.reduce((highest, element) => highest[1] > element[1] ? highest : element);
const moves = [[0, 1], [-1, 1], [1, 1]];

let hasNotFallenOverTheEdge = true;
let count = 0;

const dropSand = () => {
  let sandCoords = [500, 0];

  while (sandCoords[1] < findEndY[1] + 1) {
    const availableMoves = moves
      .map(move => [move[0] + sandCoords[0], move[1] + sandCoords[1]])
      .filter(move => !formattedMap.has(move.join(',')));
    if (availableMoves.length) {
      sandCoords = availableMoves[0];
    } else {
      formattedMap.add(sandCoords.join(','))
      return true
    }
  }
  return false
}

while (hasNotFallenOverTheEdge) {
  count++;
  hasNotFallenOverTheEdge = dropSand();
}

console.log(count - 1);
