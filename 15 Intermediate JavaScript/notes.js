console.log("Hello World!");

var n = Math.random();
n = n * 100;
n = Math.floor(n) + 1;
// gets a random int that is from 1-100
console.log(n);

// Three equal signs check for if they are equal and the same data type
if (n === 50){
    console.log("Yo");
} 

// two equal signs check for if they are equal regardless of the data type
if(n == 50){
    console.log("Dog");
}

var array = ["hello", "dog"];
array.length;
array.includes("hello"); // this returns a boolean data type
array.push("cat");
array.pop;