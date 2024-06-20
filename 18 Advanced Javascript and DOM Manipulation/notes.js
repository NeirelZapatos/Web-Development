function add(num1, num2){
    return num1 + num2;
}

function multi(num1, num2){
    return num1 * num2;
}

function calculator(num1, num2, operator){
    return operator(num1, num2);
}

console.log(calculator(4, 5, add));
// you can pass funcitons into other functions. This is called higher order funcitons

// creating a javascript object
var housekeeper1 = {
    name: "Alyssa",
    age: 28,
    hasPermit: true
}

console.log(housekeeper1);

// creating an object factory
function BellBoy(name, age, hasPermit)  {
    this.name = name;
    this.age = age;
    this.hasPermit = hasPermit;
    this.clean = function() { 
        console.log("cleaning");
        alert("TESTING");
    }
}

bellBoy1 = new BellBoy("David", 18, false);
console.log(bellBoy1.clean());
