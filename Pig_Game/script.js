"use strict";
//Selecting Elements
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;
//Functions
//Starting conditions and
const init = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  diceEl.classList.add("hidden");
  btnRoll.classList.remove("hidden");
  btnHold.classList.remove("hidden");
};
init();
//--switching players
const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};
//-- Rolling Dice Funcionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    //1.Generate a randome number
    const diceFunc = () => Math.trunc(Math.random() * 6) + 1;
    let dice = diceFunc();
    //2.Display Dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    //3.Check for rolled
    if (dice !== 1) {
      //Add the Dice to the current Score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //1.Add Current score to active player score
    scores[activePlayer] += currentScore;
    activePlayer === 0
      ? (score0El.textContent = scores[activePlayer])
      : (score1El.textContent = scores[activePlayer]);
    //2.check if players score is bellow 100
    if (scores[activePlayer] >= 20) {
      //finish
      playing = false;
      diceEl.classList.add("hidden");
      btnRoll.classList.add("hidden");
      btnHold.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      alert(`Player ${activePlayer + 1} won the Game🥇`);
    } else {
      //switch
      switchPlayer();
    }
  }
});
btnNew.addEventListener("click", init);
