// var audio =  new Audio('./sounds/tom-1.mp3');

for (var i = 0; i < document.querySelectorAll(".drum").length; i++){
    //query Select returns a node list aka an array

    // this adds an event listener to every element in the array
    document.querySelectorAll(".drum")[i].addEventListener("click", function() {
        // this.style.color = "white";
        // console.log(this.innerHTML);
        // instructions

        switch(this.innerHTML){
            case "w":
                var crash = new Audio("./sounds/crash.mp3");
                crash.play();
                break;
            case "a":
                var kick = new Audio("./sounds/kick-bass.mp3");
                kick.play();
                break;
            case "s":
                var snare = new Audio("./sounds/snare.mp3");
                snare.play();
                break;
            case "d":
                var tom1 = new Audio("./sounds/tom-1.mp3");
                tom1.play();
                break;
            case "j":
                var tom2 = new Audio("./sounds/tom-2.mp3");
                tom2.play();
                break;
            case "k":
                var tom3 = new Audio("./sounds/tom-3.mp3");
                tom3.play();
                break;
            case "l":
                var tom4 = new Audio("./sounds/tom-4.mp3");
                tom4.play();
                break;
            default:
                console.log(this.innerHTML);
        }

    }); 
}





audio.play();
alert("I got clicked!");