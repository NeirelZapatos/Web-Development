//generates random numbers from 1-6
var randNum1 = Math.random() * 6
randNum1 = Math.floor(randNum1) + 1

var randNum2 = Math.random() * 6
randNum2 = Math.floor(randNum2) + 1

// grabs the image elements by the class
var dice1 = document.querySelector(".img1");
var dice2 = document.querySelector(".img2");
var header = document.querySelector("h1");

var randImgSrc1 = "./images/dice" + randNum1 + ".png";
var randImgSrc2 = "./images/dice" + randNum2 + ".png";

dice1.src = randImgSrc1;
dice2.src = randImgSrc2;

if (randNum1 > randNum2) {
    header.textContent = "Player 1 Wins!"
}
else if (randNum2 > randNum1) {
    header.textContent = "Player 2 Wins!"
}
else {
    header.textContent = "Draw!"
}





