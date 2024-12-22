var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var user=[];

var level = 0;
var started = false;

$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
  });
  
  
  $(".box").click(function(){
      var _this=this;
      user.push($(_this).attr("id"));
      $("."+$(_this).attr("id")).addClass("pressed");
      setTimeout(function(){
          $("."+$(_this).attr("id")).removeClass("pressed");
        },200)
        var audio = new Audio("sounds/" + $(_this).attr("id") + ".mp3");
        audio.play();
        checkAnswer(user.length-1);
    })

    function checkAnswer(currentLevel) {
        if (gamePattern[currentLevel] === user[currentLevel]) {
            console.log("success");
            if (user.length === gamePattern.length){
                setTimeout(function () {
                    nextSequence();
                }, 1000);
            }
        } else {
            var audio = new Audio("sounds/wrong.mp3");
            audio.play();
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over")
            },200)
            $("h1").text("Game Over, Press Any Key to Restart")
            startover();
        }
}

function nextSequence() {
    user = [];
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("." + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();
}

function startover(){
    level=0;
    gamePattern=[];
    started=false;
}