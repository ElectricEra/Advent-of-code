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
  .map(row => row.map(({ element, ...rest }) =>
    Object.values(rest).map(prop => {
      const a = prop.findIndex(el => el >= element)
      return a === -1 ? prop.length : a + 1
    }).reduce((a, b) => a * b)
  ));

const result = Math.max(...highest.flat());

// Answer
console.log(`-- Answer: ${result}`);
