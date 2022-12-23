// Setup
const fs = require('fs');
const data = fs.readFileSync('./data.txt', 'utf8');

// Solution
const parsedData = data.split('\r\n').map(row => row.split(''));
const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
const alphabet = 'abcdefghijklmnopqrstuvwxyz';

const findElementIn2DArray = (arr, el) => {
  const elementIndex = arr.flat().indexOf(el);
  return [parseInt(elementIndex / arr[0].length), elementIndex % arr[0].length]
}

const findNeighbours = (arr, coords) => directions
  .map(side => [coords[0] + side[0], coords[1] + side[1]])
  .filter(newCoords => arr?.[newCoords[0]]?.[newCoords[1]])

const startingPoint = findElementIn2DArray(parsedData, 'S');
const endPoint = findElementIn2DArray(parsedData, 'E');

const findPath = (start, end, rule) => {
  const array = parsedData.map(row => row.slice());
  array[start[0]][start[1]] = 'a';
  array[end[0]][end[1]] = 'z';
  array[start[0]][start[1]] = {
    value: array[start[0]][start[1]],
    weight: 0
  }
  const availablePaths = [start];

  let result;
  let stop = false;
  while (availablePaths.length && !stop) {
    const path = availablePaths.shift();
    const currentNode = array[path[0]][path[1]];

    const newCoords = findNeighbours(array, path);

    newCoords.forEach(coords => {
      const newValue = array[coords[0]][coords[1]];

      if (typeof newValue === 'object') {
        if (currentNode.weight + 1 < newValue.value) {
          array[coords[0]][coords[1]] = {
            value: newValue.value,
            weight: currentNode.weight + 1
          }
          availablePaths.push(coords);

          if (coords[0] === end[0] && coords[1] === end[1]) {
            stop = true;
            result = array[coords[0]][coords[1]].weight
          }
        }
      } else {
        if (rule.indexOf(currentNode.value) >= rule.indexOf(newValue) - 1) {
          array[coords[0]][coords[1]] = {
            value: newValue,
            weight: currentNode.weight + 1
          }
          availablePaths.push(coords);

          if (coords[0] === end[0] && coords[1] === end[1]) {
            stop = true;
            result = array[coords[0]][coords[1]].weight
          }
        }
      }
    });
  }

  return result
}

const result = findPath(startingPoint, endPoint, alphabet)

// Answer
console.log(`-- Answer: ${result}`);
