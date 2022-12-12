// Setup
const fs = require('fs');
const data = fs.readFileSync('./data.txt', 'utf8');

// Solution
let coords = [{ x: 0, y: 0 }];

for (let i = 1; i <= 9; i++) {
  coords.push({ x: 0, y: 0, visitedCoordinates: ['0 0'] })
}

data
  .split('\r\n')
  .map(row => row.split(' '))
  .map(([direction, amount]) =>
    [direction === 'U' ? [0, 1] : direction === 'D' ? [0, -1] : direction === 'L' ? [-1, 0] : [1, 0], amount]
  )
  .forEach(([direction, amount]) => {
    for (let i = 0; i < Number(amount); i++) {
      coords[0].x += direction[0];
      coords[0].y += direction[1];

      for (let i = 1; i < coords.length; i++) {
        const prevKnot = coords[i - 1];
        const currentKnot = coords[i];
        if (Math.sqrt(Math.pow(prevKnot.x - currentKnot.x, 2) + Math.pow(prevKnot.y - currentKnot.y, 2)) >= 2) {
          currentKnot.x += Math.sign(prevKnot.x - currentKnot.x)
          currentKnot.y += Math.sign(prevKnot.y - currentKnot.y)
          currentKnot.visitedCoordinates.push(`${currentKnot.x} ${currentKnot.y}`)
        }
      }
    }
  })

const result = [...new Set(coords[coords.length - 1].visitedCoordinates)].length;

// Answer
console.log(`-- Answer: ${result}`);
