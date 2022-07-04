const cards = document.querySelectorAll('.card')
let hasFlippedCard = false
let lockBoard = false
let firstCard, secondCard

function flipCard() {
  console.log('flipping card')
  if (lockBoard) return

  if(this === firstCard) return

  this.classList.add('flip')
  if(!hasFlippedCard) {
    hasFlippedCard = true
    firstCard = this
    return
  }

  secondCard =this
  checkForMatch()
}

function checkForMatch() {
  console.log('checking for match')
  let isMatch = firstCard.dataset.card === secondCard.dataset.card
  isMatch ? disableCards() : unflipCards()
}

function disableCards() {
  console.log('cards match')
  firstCard.removeEventListener('click', flipCard)
  secondCard.removeEventListener('click', flipCard)

  resetBoard()
}

function unflipCards() {
  console.log('cards don\'t match - unflipping')

  lockBoard = true

  setTimeout(() => {
    firstCard.classList.remove('flip')
    secondCard.classList.remove('flip')
    resetBoard()
  }, 1500)
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null]
}

cards.forEach(card => card.addEventListener('click', flipCard))