// Setup
const fs = require('fs');
const data = fs.readFileSync('./data.txt', 'utf8');

// Solution
const tickTracker = [1];

data.split('\r\n').map(row => row.split(' ')).forEach(row => {
  tickTracker.push(tickTracker[tickTracker.length - 1]);
  if (row[0] === 'addx') { tickTracker.push(tickTracker[tickTracker.length - 1] + Number(row[1])) }
});

let arr = [];
for (let i = 0; i < 240; i++) {
  arr.push((Math.abs(tickTracker[i] - i%40) <= 1) ? '#' : ' ')
}

// Answer
const chunkSize = 40;
for (let i = 0; i < arr.length; i += chunkSize) {
  console.log(arr.slice(i, i + chunkSize).join(''))
}
