Solution to this task is based on the logic that there are 3 options and every next one beats previous.

By converting "A" (Rock), "B" (Paper) and "C" (Scissors) to 0, 1 and 2, you can work with numbers now.

0 (Rock) ties with 0 (Rock).
0 (Rock) loses to 1 (Paper).
0 (Rock) wins from 2 (Scissors).

This means if you've chosen X:
 - You tie to X + 0
 - You lose to X + 1
 - You win to X + 2

And to have a proper "cycle", you should use mod. Example: 1 (Paper) loses to (+2 modifier) option. (1 + 2) % 3 = 0 (Rock)

## Task 1
Knowing the above, you just remap values and calculate the sum.


## Task 2
Same, but you add an extra step to count player option. 

Your option = (3 + elf move - outcome) % 3,
where
 - "3" is constant offset, not to go into negatives
 - "elf move" is 0 1 or 2, based on decoding
 - "outcome" - 0 = tie, 1 = lose, 2 = win