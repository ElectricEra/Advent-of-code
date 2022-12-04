## Taks 1
This is a fairly simple n(O^2) iteration to solve this taks. It could've been improved with more optimized search alghorithms, but in this case, it doesn't make sense.

## Task 2
Here (in searching part), n(O^3) alghoritm is being used (Letters in each word can be ultimately of any length, but because amount of elves is 3, we can replace 1 cycle with 2 lines of extra comparisons and get n(O^2). This solution would not be universal).

There is a better method to find similar items I thought of - mapping letters to binary number. Like "ACDF..." would be "101101...".
After that, simple binary AND would leave just one repeated letter.
