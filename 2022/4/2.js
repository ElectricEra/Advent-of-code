// Setup
const fs = require('fs');
const data = fs.readFileSync('./data.txt', 'utf8');

// Solution
const result = data
    .split('\r\n')
    .map(row => row
        .split(',')
        .map(squares => squares
            .split('-')
            .map(Number)
        )
        .sort((a, b) => (a[0] === b[0]) ? b[1] - a[1] : a[0] - b[0])
    )
    .reduce((acc, pair) => acc + +(pair[1][0] <= pair[0][1]), 0)

// Answer
console.log(`-- Answer: ${result}`);
