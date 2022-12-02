// Setup
const fs = require('fs');
const data = fs.readFileSync('./data.txt', 'utf8');

// Solution
const result = data
    .split('\n\n')
    .map(e => e.split('\n')
    .reduce((a, b) => +a + +b))
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => +a + +b);

// Answer
console.log(`-- Answer: ${result}`);
