// Setup
const fs = require('fs');
const data = fs.readFileSync('./data.txt', 'utf8');

// Solution
const commands = data.split('\r\n').reduce((filesystem, command) => {
  if (command[0] === `$`) {
    const [commandSymbol, ...value] = command.split(' ');
    filesystem._lastCommand = value[0];
    if (value[0] === 'cd') {
      if (value[1] === '..') {
        filesystem._currentDirectory.pop();
      } else if (value[1] == '/') {
        filesystem._currentDirectory = ['/']
      } else {
        filesystem._currentDirectory.push(value[1])
      }
    }
  } else {
    if (filesystem._lastCommand == 'ls') {
      const [action, name] = command.split(' ');
      if (action === 'dir') {
        let currentFolder = filesystem;
        filesystem._currentDirectory.forEach(directory => {
          currentFolder = currentFolder[directory]
        });
        currentFolder[name] = { _size: 0 }
      } else {
        let currentFolder = filesystem;
        filesystem._currentDirectory.forEach(directory => {
          currentFolder[directory]._size += Number(action)
          currentFolder = currentFolder[directory]

        });
        currentFolder[name] = Number(action)
        currentFolder[name]._size += Number(action)
      }    
    }
  }
  return filesystem
}, {
  '/': { _size: 0 },
  _currentDirectory: '',
  _lastCommand: ''
});

const getSizes = (input) => [
  input._size,
  ...Object.values(input)
    .filter((propValue) => typeof propValue === 'object')
    .map((propValue) => getSizes(propValue))
    .flat()
];

const result = getSizes(commands['/']).filter(el => el <= 100000).reduce((a, b) => a + b)

// Answer
console.log(`-- Answer: ${result}`);
