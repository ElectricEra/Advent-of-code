// Setup
const fs = require('fs');
const data = fs.readFileSync('./data.txt', 'utf8');

// Solution
const result = data
    .split('\n')
    .map(rucksack => {
        const halfOfSack = rucksack.length / 2;
        for (let i = 0; i < halfOfSack; i++) {
            for (let j = halfOfSack; j < rucksack.length; j++) {
                if (rucksack[i] === rucksack[j]) {
                    return rucksack[i];
                }
            }
        }
    })
    .map(letter => letter.charCodeAt(0) - (letter === letter.toUpperCase() ? 38 : 96))
    .reduce((a, b) => +a + +b);

// Answer
console.log(`-- Answer: ${result}`);
