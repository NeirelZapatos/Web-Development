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
