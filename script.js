const cardValues = ['🍎', '🍌', '🍇', '🍊', '🍉', '🍓', '🍍', '🍒', '🍎', '🍌', '🍇', '🍊', '🍉', '🍓', '🍍', '🍒'];
let totalMoves = 0;
let totalTime = 0;
let timerInterval;
let firstCard = null;
let secondCard = null;
let hasFlippedCard = false;
let lockBoard = false;
let matchedPairs = 0;

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCards() {
    const shuffledValues = shuffle(cardValues);
    const cardContainer = document.getElementById('card-container');
    
    shuffledValues.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.addEventListener('click', flipCard);
        cardContainer.appendChild(card);
    });
}

function startTimer() {
    timerInterval = setInterval(() => {
        totalTime++;
        document.getElementById('total-time').textContent = totalTime;
    }, 1000);
}

function flipCard() {
    if (lockBoard) return; // Prevent flipping if a match is in progress
    if (this === firstCard) return; // Prevent flipping the same card

    this.classList.add('flipped');
    this.textContent = this.dataset.value; // Show the card value

    if (!hasFlippedCard) {
        // First card flip
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    totalMoves++;
    document.getElementById('total-moves').textContent = totalMoves;

    checkForMatch();
}

function checkForMatch() {
    lockBoard = true;
    const isMatch = firstCard.dataset.value === secondCard.dataset.value;

    if (isMatch) {
        matchedPairs++;
        resetBoard();
        if (matchedPairs === cardValues.length / 2) {
            endGame();
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            firstCard.textContent = '';
            secondCard.classList.remove('flipped');
            secondCard.textContent = '';
            resetBoard();
        }, 1000);
    }
}

function resetBoard() {
    [hasFlippedCard, lockBoard, firstCard, secondCard] = [false, false, null, null];
}

function endGame() {
    clearInterval(timerInterval); 
    const winMessage = document.getElementById('win-message');
    winMessage.classList.remove('hidden');
    winMessage.style.display = 'block'; 

    winMessage.textContent = `You Win! Total Moves: ${totalMoves}, Total Time: ${totalTime} sec`;

}

createCards();
startTimer();
