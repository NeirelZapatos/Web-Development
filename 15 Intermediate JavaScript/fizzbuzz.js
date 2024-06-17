var output = [];

function fizzBuzz() {
    count = output.length + 1;
    if ((count % 3) === 0 && ((count % 5) === 0)) {
        output.push("FizzBuzz");
    }
    else if ((count % 5) === 0 ){
        output.push("Buzz");
    }
    else if ((count % 3) === 0) {
        output.push("Fizz");
    }
    else {
        output.push(String(count));
    }


    console.log(output);
}

for (var i = 0; i < 100; i++) {
    fizzBuzz();
}