// Setup
const fs = require('fs');
const data = fs.readFileSync('./data.txt', 'utf8');

// Solution
const result = data
    .split('\n')
    .reduce((acc, row) => {
        if (acc[acc.length - 1].length < 3) {
            acc[acc.length - 1].push(row)
        } else {
            acc.push([row])
        }
        return acc
    }, [[]])
    .map(group => {
        for (let i = 0; i < group[0].length; i++) {
            let sum = 1;
            for (let j = 1; j < group.length; j++) {
                if (group[j].includes(group[0][i])) {
                    sum++
                };
                if (sum === 3) {
                    return group[0][i]
                }
            }
        }
    })
    .map(letter => letter.charCodeAt(0) - (letter === letter.toUpperCase() ? 38 : 96))
    .reduce((a, b) => +a + +b);

// Answer
console.log(`-- Answer: ${result}`);
// console.log(result);
