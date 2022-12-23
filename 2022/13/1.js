// Setup
const fs = require('fs');
const data = fs.readFileSync('./data.txt', 'utf8');

// Solution
const parsedData = data.split('\n\n').map(pair => pair.split('\n'));

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

const pairValues = (parsedData.map(pair => evaluatePair(eval(pair[0]), eval(pair[1]))));
const result = pairValues.reduce((acc, el, i) => acc += !!el ? (i + 1) : 0, 0);

console.log(result);
