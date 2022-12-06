// Setup
const fs = require('fs');
const data = fs.readFileSync('./data.txt', 'utf8');

// Solution 4 - 14
for (let i = 0; i < data.length - 3; i++) {
    const myString = data.substring(i, i + 4)
    let hasSameLetters = false;
    for (let j = 0; j < myString.length; j++) {
        if (myString.indexOf(myString[j]) !== myString.lastIndexOf(myString[j])) {
            hasSameLetters = true;
            break
        }
    }
    if (!hasSameLetters) {
        // Answer
        console.log(`-- Answer: ${i + 4}`);
        break
    }
}
