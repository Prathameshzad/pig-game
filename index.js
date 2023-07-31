'use strict';

const playerE1 = document.querySelector('.player--1');
const playerE0 = document.querySelector('.player--0'); 
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currentEl0 = document.querySelector('#current--0');
const currentEl1 = document.querySelector('#current--1');

let player1CurrScore = 0;

let scores, currentScore, activePlayer, playing;

const switchPlayer = function(){
    playerE1.classList.toggle('player--active');
        playerE0.classList.toggle('player--active');
        document.getElementById(`current--${activePlayer}`).textContent = 0;
        currentScore = 0;
        activePlayer = activePlayer == 0 ? 1 : 0;
}

const init = function(){
     scores = [0, 0];
     currentScore = 0;
     activePlayer = 0;
     playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    currentEl0.textContent = 0;
    currentEl1.textContent = 0;

    diceEl.classList.add('hidden');
    playerE0.classList.remove('player--winner');
    playerE1.classList.remove('player--winner');
    playerE0.classList.add('player--active');
    playerE1.classList.remove('player--active');
    
};

init();

btnRoll.addEventListener('click', function(){
    if(playing){
        const dice = Math.trunc(Math.random()*6)+1;
        console.log(dice);
    
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;
    
        if(dice!==1){
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
            // currentEl0.textContent = currentScore;
    
        }else{
            switchPlayer();
        }
    }
    
})

btnHold.addEventListener('click', function(){
    if(playing){
        diceEl.classList.add('hidden');
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        if(scores[activePlayer]>=100){
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        }else{
            switchPlayer();
        }
    }
    
});

btnNew.addEventListener('click', init);