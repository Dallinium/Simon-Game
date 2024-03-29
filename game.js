let buttonColours = ["red", "blue", "green", "yellow"];
// computer generated sequence
let gamePattern = [];
// user clicked sequence
let userClickedPattern = [];
let level = 0;

let started = false;

// add the user clicked color to the userClickedPattern array and checks it against the gamePattern array
$(".btn").click(function () {
  let userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

// check user clicks against computer sequence
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    // makes sure the the number of colors clicked on is equal to the number of colors generated by the computer to move on
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press 'S' to Restart");
    startOver();
  }
}

// Resets game to beginning when game over
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

// Key press that signals game has started
// Computer changes level and starts its first sequence
$(document).keydown(function () {
  if (!started) {
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// computer changes to next level and adds another color to its sequence
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  // picks a number that corresponds to a color to show
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  // pushes the random color to the computer generated array
  gamePattern.push(randomChosenColour);
  // animates flash of chosen colors
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  const audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// animates flash of user pressed button
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
