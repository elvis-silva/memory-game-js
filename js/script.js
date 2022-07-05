const cards = document.querySelectorAll('.card');
const scoreCounter = document.querySelector('#score');
const topScoreCounter = document.querySelector('#topScore');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let gamesPlayed = 0;
let score = 0;
let topScore = 0;
let matches = 0;

(() => {
  cards.forEach(card => card.style.order = Math.floor(Math.random() * 16));
})()

function flipCard() {
  console.log('flipping card');
  if (lockBoard) return;

  if(this === firstCard) return;

  this.classList.add('flip');
  if(!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    updateScore();
    return;
  }

  secondCard = this;
  updateScore();
  checkForMatch();
}

function updateScore() {
  score++;
  scoreCounter.textContent = score;
}

function checkForMatch() {
  console.log('checking for match');
  let isMatch = firstCard.dataset.card === secondCard.dataset.card;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  console.log('cards match');

  console.log('MATCHES: ', matches);

  matches++;

  if(matches === 8) {

    topScore = gamesPlayed === 0 ? score : Math.min(topScore, score);
    topScoreCounter.textContent = topScore;
    
    setTimeout(() => {  
      let confirm = window.confirm('Congratulations! Play again?');
      if(confirm) {
        restartGame();
      }
    }, 700)
  }

  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function restartGame() {
  console.log('restarting game');
  gamesPlayed++;
  cards.forEach(card => card.addEventListener('click', flipCard));
  score = 0;
  scoreCounter.textContent = score;
  topScoreCounter.textContent = topScore;
  matches = 0;
  resetBoard();
  cards.forEach(card => card.classList.remove('flip'));
  setTimeout(() => {
    cards.forEach(card => card.style.order = Math.floor(Math.random() * 16));
  }, 1000)
}

function unflipCards() {
  console.log('cards don\'t match - unflipping');

  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1500)
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

cards.forEach(card => card.addEventListener('click', flipCard));