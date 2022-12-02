// Setup
const fs = require('fs');
const data = fs.readFileSync('./data.txt', 'utf8');

// Solution
const result = Math.max(
    ...data
        .split('\n\n')
        .map(e => e.split('\n').reduce((a, b) => +a + +b)
    )
);

// Answer
console.log(`-- Answer: ${result}`);
