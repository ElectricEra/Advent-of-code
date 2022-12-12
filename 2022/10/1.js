// Setup
const fs = require('fs');
const data = fs.readFileSync('./data.txt', 'utf8');

// Solution
const tickTracker = [1];

data.split('\r\n').map(row => row.split(' ')).forEach(row => {
  tickTracker.push(tickTracker[tickTracker.length - 1]);
  if (row[0] === 'addx') { tickTracker.push(tickTracker[tickTracker.length - 1] + Number(row[1])) }
});

const result = [20, 60, 100, 140, 180, 220].reduce((acc, tick) => acc += (tick * tickTracker[tick-1]), 0);

// Answer
console.log(result);
