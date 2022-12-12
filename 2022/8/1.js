// Setup
const fs = require('fs');
const data = fs.readFileSync('./data.txt', 'utf8');

// Solution
const analyzedMap = data
  .split('\r\n')
  .map(row => row.split(''));

const highest = analyzedMap
  .map((row, i, rowArr) => row.map((element, j) => {
    const directions = { element, left: [], right: [], top: [], bottom: [] };

    for (var k = 0; k < analyzedMap.length; k++) {
      if (k < i) directions.top.unshift(analyzedMap[k][j])
      if (k > i) directions.bottom.push(analyzedMap[k][j])
    }
    for (var l = 0; l < rowArr.length; l++) {
      if (l < j) directions.left.unshift(analyzedMap[i][l])
      if (l > j) directions.right.push(analyzedMap[i][l])
    }

    return directions
  }))
  .map(row => row.map(({ element, ...rest }) => Object.values(rest).map(prop => Math.max(...prop) >= element).every(Boolean)))

const result = highest.flat().map(el => !Boolean(el)).reduce((a, b) => a + b)

// Answer
console.log(`-- Answer: ${result}`);
