"use strict";
//constants
const guessSelector = document.querySelector(".guess");
const messageBox = document.querySelector(".message");
//-Changing Score Type
const scoreTxt = document.querySelector(".score");
let scoreNum = 20;
//-Changing ScoreBanner (number)
const scoreBanner = document.querySelector(".number");
//High Score
const highScoreTxt = document.querySelector(".highscore");
let highscore = 0;

//Functions
//-- Generate Random Number
const secretNumberFunction = () => Math.trunc(Math.random() * 20) + 1;
let secretNumber = secretNumberFunction();
//-- Setting preferences
const bodi = (bgcolor) => (
  (document.querySelector("body").style.backgroundColor = bgcolor),
  (document.querySelector(".number").style.width = "15rem")
);
//-- reset the game
function resetGame() {
  secretNumber = secretNumberFunction();
  scoreNum = 20;
  displayScore(scoreNum);
  guessSelector.value = "";
  scoreBanner.textContent = "?";
  displayMessage("Start Guessing...");
  bodi("#222");
}
//-- Game Over Function
const gameOver = function () {
  bodi("red");
};
//-- GuessFunction
const guessFunction = () => Number(guessSelector.value);
//--- displays via constants^
function displayMessage(message) {
  messageBox.textContent = message;
}
//--- highscore
function displayHighScore(highscore) {
  highScoreTxt.textContent = highscore;
}
//--- score
function displayScore(score) {
  scoreTxt.textContent = score;
}
//Checking the Number
document.querySelector(".check").addEventListener("click", function () {
  let guess = guessFunction();
  //when there is no input
  if (!guess) {
    displayMessage("⛔ Enter Your Number ⛔");
  }
  //when the input is wrong
  else if (guess !== secretNumber) {
    if (scoreNum > 1) {
      displayMessage(guess > secretNumber ? "📈 Too High" : "📉 Too low");
      scoreNum--;
      displayScore(scoreNum);
    } else {
      displayScore(0);
      displayMessage("🎲 GAME OVER 🎲");
      gameOver();
    }
    //When Player Wins
  } else if (guess === secretNumber) {
    displayMessage("🎉 Correct Number !!!");
    scoreBanner.textContent = secretNumber;
    if (highscore < scoreNum) {
      highscore = scoreNum;
      displayHighScore(highscore);
    }
    bodi("#60b847");
    scoreBanner.style.width = "30rem";
  }
});
//Again btn funcrionality
document.querySelector(".again").addEventListener("click", function () {
  resetGame();
});
