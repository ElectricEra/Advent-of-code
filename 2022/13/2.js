// Setup
const fs = require('fs');
const data = fs.readFileSync('./data.txt', 'utf8');

// Solution
const parsedData = data.split('\n').filter(Boolean).map(eval);

const compare = (left, right) => {
  if (typeof left === 'number') {
    return left === right ? 'next' : left < right
  } else {
    return evaluatePair(left, right)
  }
}

const evaluatePair = (left, right) => {
  let value = 'next';
  
  while (value === 'next') {
    if (left.length === 0 && right.length > 0 ) {
      return true;
    }

    if (right.length === 0 && left.length > 0) {
      return false;
    }

    if (left.length === 0 && right.length === 0) {
      return 'next';
    }
    
    const leftElement = left.shift();
    const rightElement = right?.shift();
  
    const isLeftElementNumber = !Array.isArray(leftElement);
    const isRightElementNumber = !Array.isArray(rightElement);
  
    if (isLeftElementNumber === isRightElementNumber) {
      value = compare(leftElement, rightElement)
    } else {
      if (isLeftElementNumber) {
        value = compare([leftElement], rightElement)
      } else {
        value = compare(leftElement, [rightElement])
      }
    }
  
    if (value !== 'next') {
      return value
    }
  }
}

const getSortValue = (a, b) => {
  const result = evaluatePair(JSON.parse(JSON.stringify(b)), JSON.parse(JSON.stringify(a)));

  return result === 'next' ? 0 : result ? 1 : -1;
}

parsedData.push(...[[[2]], [[6]]]);
const sortedSignals = parsedData.sort(getSortValue);
const result = (sortedSignals.findIndex(el => el.length === 1 && el[0].length === 1 && el[0][0] === 2 ) + 1) *
  (sortedSignals.findIndex(el => el.length === 1 && el[0].length === 1 && el[0][0] === 6 ) + 1)

console.log(result);
