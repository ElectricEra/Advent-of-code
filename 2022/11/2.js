// Setup
const fs = require('fs');
const data = fs.readFileSync('./data.txt', 'utf8');

// Solution
const count = (...params) =>
  (value) => {
    const var1 = params[0] === 'old' ? value : Number(params[0]);
    const var2 = params[2] === 'old' ? value : Number(params[2]);

    return eval(`${var1}${params[1]}${var2}`)
  }

const monkeys = data
  .split('\r\n\r\n')
  .map(monkey => {
    const parsedMonkey = monkey
      .split('\r\n')
      .map(command => command.trim().split(':')[1])
    return {
      items: parsedMonkey[1].trim().split(', ').map(Number),
      inspectOperation: count(...parsedMonkey[2].trim().split(' ').slice(2)),
      throwTest: Number(parsedMonkey[3].slice(14)),
      throwTrue: Number(parsedMonkey[4].slice(17)),
      throwFalse: Number(parsedMonkey[5].slice(17)),
      countOfItemsChecked: 0
    }
  })

const mod = monkeys.reduce((acc, monkey) => acc * monkey.throwTest, 1)

for (let i = 0; i < 10000; i++) {
  monkeys.forEach((monkey) => {
    monkey.items.forEach(item => {
      const newStressLevel = monkey.inspectOperation(item) % mod;
      const newMonkey = (newStressLevel / monkey.throwTest === Math.floor(newStressLevel / monkey.throwTest)) ? monkey.throwTrue : monkey.throwFalse;
      monkeys[newMonkey].items.push(newStressLevel);
      monkey.countOfItemsChecked += 1;
    })
    monkey.items = [];
  })
}

const result = monkeys.map(monkey => monkey.countOfItemsChecked).sort((a, b) => b - a).slice(0, 2);

// Answer
console.log(result[0] * result[1]);
