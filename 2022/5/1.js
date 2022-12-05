// Setup
const fs = require('fs');
const data = fs.readFileSync('./data.txt', 'utf8');

// Solution
const [boxes, moves] = data.split('\r\n\r\n');

const [countOfBoxes, ...boxStacks] = boxes.split('\r\n').reverse();
const amountOfStacks = countOfBoxes.split(' ').filter(Number).map(Number);
const mappedRows = amountOfStacks.map(stack =>
  boxStacks.map(boxStackRow => boxStackRow[4 * (stack - 1) + 1]).filter(el => el !== ' ')
)

moves.split('\r\n').forEach(move => {
  const [quantity, fromPile, toPile] = move.split(' ').filter(Number).map(Number);
  mappedRows[toPile - 1].push(...mappedRows[fromPile - 1].splice(-quantity).reverse())
})

const result = mappedRows.map(row => row[row.length - 1]).join('');

// Answer
console.log(`-- Answer: ${result}`);
