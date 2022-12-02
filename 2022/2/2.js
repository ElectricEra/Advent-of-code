// Setup
const fs = require('fs');
const data = fs.readFileSync('./data.txt', 'utf8');

// Solution
const result = data.split('\n')
    .map(game => 
        game.split(' ').map(choise => 
            choise === "A" || choise === "Y" ? 0 : choise === "B" || choise === "X" ? 1 : 2
        )
    ).map(([elfMove, outcome]) =>
        [elfMove, (3 + elfMove - outcome) % 3]
    ).reduce((sum, [elfMove, playerMove]) => 
        sum += playerMove + 1 + (playerMove === elfMove ? 3 : (playerMove + 1) % 3 === elfMove ? 0 : 6)
    , 0);

// Answer
console.log(result);
