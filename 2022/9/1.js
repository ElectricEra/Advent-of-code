// Setup
const fs = require('fs');
const data = fs.readFileSync('./data.txt', 'utf8');

// Solution
const coords = { head: { x: 0, y: 0 }, tail: { x: 0, y: 0, visitedCoordinates: ['0 1'] }}

data
  .split('\r\n')
  .map(row => row.split(' '))
  .map(([direction, amount]) =>
    [direction === 'U' ? [0, 1] : direction === 'D' ? [0, -1] : direction === 'L' ? [-1, 0] : [1, 0], amount]
  )
  .forEach(([direction, amount]) => {
    for (let i = 0; i < Number(amount); i++) {
      coords.head.x += direction[0];
      coords.head.y += direction[1];
      if (Math.sqrt(Math.pow(coords.head.x - coords.tail.x, 2) + Math.pow(coords.head.y - coords.tail.y, 2)) >= 2) {
        coords.tail.x += Math.sign(coords.head.x - coords.tail.x)
        coords.tail.y += Math.sign(coords.head.y - coords.tail.y)
        coords.tail.visitedCoordinates.push(`${coords.tail.x} ${coords.tail.y}`)
      }
    }
  })

const result = [...new Set(coords.tail.visitedCoordinates)].length;

// Answer
console.log(`-- Answer: ${result}`);
