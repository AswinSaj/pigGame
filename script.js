'use strict';
//selecting the elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let scores, currentScore, activePlayer, playing;
const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  diceEl.classList.add('hidden');
};
init();
//function
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
//rolling
btnRoll.addEventListener('click', function () {
  if (playing) {
    //generating dice roll
    let randomNum = Math.floor(Math.random() * 6 + 1);
    console.log(randomNum);

    //display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${randomNum}.png`;

    //check rolled dice

    if (randomNum !== 1) {
      //Add dice to current score
      currentScore += randomNum;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch to next player
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    //add current score to active player
    scores[activePlayer] += currentScore;
    // score[1]=score[1]+currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //check 100>=
    if (scores[activePlayer] >= 20) {
      //finish game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //Finish
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', init);
