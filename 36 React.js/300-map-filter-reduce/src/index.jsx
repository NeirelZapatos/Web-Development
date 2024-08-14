var numbers = [3, 56, 2, 48, 5];

// Map -Create a new array by doing something with each item in an array.

const newNumbers = numbers.map(function (x) {
    return x * 2;
});
console.log(newNumbers);

// Filter - Create a new array by keeping the items that return true.

const newNumbers = numbers.filter(function (nu,) {
    return num > 10;
});
console.log(newNumbers);

// Reduce - Accumulate a value by doing something to each item in an array.

const newNumbers = numbers.reduce(function (accumulator, currentNumber){
    return accumulator + currentNumber;
});
console.log(newNumbers);

// Find - find the first item that matches from an array.

const newNumber = numbers.find(function (num) {
    return num > 10;
});
console.log(newNumber);

// FindIndex - find the index of the first item that matches.

const newIndex = numbers.findIndex(function (num) {
    return num > 10;
});
console.log(newIndex);

// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser

import emojipedia from "./emojipedia";

const newStrings = emojipedia.map(function (entry) {
  return entry.meaning.substring(0, 100);
});
console.log(newStrings);
