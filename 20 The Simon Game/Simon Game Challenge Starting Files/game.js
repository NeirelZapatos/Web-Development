var gamePattern = [];
var userPattern = [];
var color = ["red", "blue", "green", "yellow"];
var level = 0;
var currentLevel = 0;

function nextSequence(){
    userPattern = [];
    var randNum = Math.round(Math.random() * (color.length - 1));
    randomColor = color[randNum];

    gamePattern.push(randomColor);

    setTimeout(function() {
        $('#' + randomColor).fadeOut(100).fadeIn(100);
    }, 300);
    

    $('h1').text("Level " + level);
    level ++;
}

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userPattern[currentLevel]){
        if(gamePattern.length === userPattern.length){
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    else{
        var audio = new Audio('./sounds/wrong.mp3');
        audio.play();
        
        $('body').addClass('game-over');
        setTimeout(function() {
            $('body').removeClass('game-over');
        }, 200);

        $('h1').text("Game Over, Press Any Key to Restart");

        gameOver();
    }
}

$('.btn').click(function (e) {
    var userColor = this.id;
    
    buttonClicked(userColor);
    userPattern.push(userColor);

    checkAnswer(userPattern.length - 1);
});

$(document).ready(()=>{
    $(document).keydown(function (e) {
        if(level === 0){
            nextSequence();
        }
    });
});

function buttonClicked(userColor){
    $('#' + userColor).addClass('pressed');
    setTimeout(function() {
        $('#' + userColor).removeClass('pressed');
    }, 100);

    var audio = new Audio('./sounds/' + userColor + '.mp3');
    audio.play();
}

function gameOver(){
    gamePattern = [];
    level = 0;
}