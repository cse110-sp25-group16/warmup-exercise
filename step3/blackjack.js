let deck = new CardDeck();
let player = [];
let dealer = [];
let bankroll = localStorage.getItem("bankroll") || 100;

document.getElementById("bankroll").textContent = bankroll;

/**
 * Function to start new blackjack game
 */
function initGame() {
  deck = new CardDeck();
  deck.fillDeck();
  deck.shuffle();

  const shuffleContainer = document.getElementById('shuffle');
  const shuffleImg = document.querySelectorAll('#cardImage');
  setTimeout(() => {
      shuffleContainer.classList.add('shuffling');  // Start shuffle animation
      shuffleImg.forEach(image => {
        console.log("test");
        image.style.visibility = 'visible';
      });
  }, 0);

  setTimeout(() => {
      shuffleContainer.classList.remove('shuffling');  // End shuffle animation
  }, 1000);

  setTimeout(() => {
    shuffleImg.forEach(image => {
      image.style.visibility = 'hidden';
    });
  }, 1580);

  player = [deck.removeTopCard(), deck.removeTopCard()];
  dealer = [deck.removeTopCard(), deck.removeTopCard()];

  setTimeout(() => {
    renderHands(true);
  }, 1580)

  document.getElementById("result").textContent = "";

  document.getElementById("hit").addEventListener("click", playerHit);
  document.getElementById("stand").addEventListener("click", endGame);
}

/**
 * Render both player & dealer's hands
 * @param {boolean} hideDealerSecondCard Whether or not to hide the dealer's second card
 */
function renderHands(hideDealerSecondCard = false) {
  renderHand("playerHand", player);
  renderHand("dealerHand", dealer, hideDealerSecondCard);

  setTimeout(() => {
    flip(hideDealerSecondCard);
  })
}

/**
 * Play flip animation on cards
 * @param {boolean} dealer Whether or not to hide dealer's second card
 */
function flip(dealer = false) {
  var cards = document.querySelectorAll('.flipCardInner');
  cards.forEach(card => {
    console.log('flipping!');
    card.classList.toggle('is-flipped');
  })

  if(dealer) {
    var cards = document.querySelectorAll('.flipCardInner--dealer');
    cards.forEach(card => {
      card.classList.toggle('is-flipped');
      card.classList.toggle('dealer');
    })
  }
}

/**
 * Render a hand of cards
 * @param {String} containerId Container id: either player or dealer
 * @param {div} hand Div containing cards
 * @param {boolean} hideSecond Whether or not to hide dealer's second card
 */
function renderHand(containerId, hand, hideSecond = false) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  hand.forEach((card, index) => {

    const flipCard = document.createElement("div");
    flipCard.style.margin = "5px";
    flipCard.style.height = "195px";
    flipCard.style.width = "140px";
    flipCard.className = "flipCardInner";

    if(hideSecond && index === 1) {
      flipCard.className = "flipCardInner--dealer"
    }

    const cardPicBack = document.createElement("div");
    cardPicBack.className = "cardPic cardPic--back";

    const backImg = document.createElement("img");
    backImg.src = "../cardsJPG/back.jpg";
    backImg.id = "cardImage";
    backImg.alt = card.getCardName();
    backImg.style.margin = "5px";
    backImg.style.height = "195px";
    backImg.style.width = "140px";
    cardPicBack.appendChild(backImg);

    const cardPicFront = document.createElement("div");
    cardPicFront.className = "cardPic cardPic--front";

    const frontImg = document.createElement("img");
    frontImg.src = `../cardsJPG/${card.id}.jpg`;
    frontImg.id = "cardImage";
    frontImg.alt = card.getCardName();
    frontImg.style.margin = "5px";
    frontImg.style.height = "195px";
    frontImg.style.width = "140px";
    cardPicFront.appendChild(frontImg);

    flipCard.appendChild(cardPicBack);
    flipCard.appendChild(cardPicFront);

    container.appendChild(flipCard);

/*<div class = "flipCardInner">
    <div class ="cardPic cardPic--back">
        <img src="../cardsJPG/back.jpg" id="cardImage">
    </div>
    <div class="cardPic cardPic--front">
        <img src="../cardsJPG/0.jpg" id="cardImage">
    </div>
  </div>*/

  /*
    const img = document.createElement("img");
    img.src = (index === 1 && hideSecond && containerId === "dealerHand")
      ? "../cardsJPG/back.jpg"
      : `../cardsJPG/${card.id}.jpg`;
    img.alt = card.getCardName();
    img.style.margin = "5px";
    img.style.height = "195px";
    img.style.width = "140px";
    container.appendChild(img);*/
  });
}

/**
 * Returns the value of a hand of cards
 * @param {div} hand Div containing cards
 * @returns {number} Value of hand of cards
 */
function handValue(hand) {
  let total = 0, aces = 0;
  for (const card of hand) {
    const rank = card.id % 13;
    if (rank === 0) { total += 11; aces++; } // Ace
    else if (rank >= 10) total += 10; // Face cards
    else total += rank + 1;
  }
  while (total > 21 && aces > 0) {
    total -= 10;
    aces--;
  }
  return total;
}

/**
 * "Hits" for the player, drawing a new card
 * @returns {null} Returns nothing
 */
function playerHit() {
  player.push(deck.removeTopCard());
  if (handValue(player) > 21) {
    endGame();
    return;
  }
  renderHands(true);
}

/**
 * Handles logic for drawing next dealer card depending on dealer AI
 */
function dealerTurn() {
  const mode = document.getElementById("dealerMode").value;

  if (mode === "brain-dead") {
    const hits = Math.floor(Math.random() * 2) + 1; // 1 or 2
    for (let i = 0; i < hits && deck.getCardCount() > 0; i++) {
      dealer.push(deck.removeTopCard());
    }
  } else if (mode === "random") {
    while (Math.random() < 0.5 && deck.getCardCount() > 0) {
      dealer.push(deck.removeTopCard());
    }
  } else {
    while (handValue(dealer) < 17) {
      dealer.push(deck.removeTopCard());
    }
  }
}

/**
 * Ends game depending on dealer's or player's hand value
 */
function endGame() {
  dealerTurn();
  renderHands(false);

  const p = handValue(player);
  const d = handValue(dealer);

  let result = "";
  let balChange ="";
  if (p > 21) {
    result = "You busted! Dealer wins";
    balChange = "-$10";
    document.getElementById("balChange").style.color = 'red';
  } else if (d > 21 || p > d) {
    result = "You win!";
    balChange = "+$10";
    document.getElementById("balChange").style.color = 'green';
  } else if (p === d) { 
    result = "Push!"; 
    balChange = "+$0";
    document.getElementById("balChange").style.color = 'green';
  } else { 
    result = "Dealer wins!";
    balChange = "-$10";
    document.getElementById("balChange").style.color = 'red';
  }

  updateBankroll(result);
  document.getElementById("result").textContent = result;
  document.getElementById("balChange").textContent = balChange;
  document.getElementById("resultPopupText").textContent = result;

  document.getElementById("resultPopup").setAttribute("open", "");
  document.getElementById("hit").removeEventListener("click", playerHit);
  document.getElementById("stand").removeEventListener("click", endGame);
}
/**
 * Updates player's bankroll number depending on the game result.
 * @param {String} result The result of the game (win or loss, dealer, busted)
 */
function updateBankroll(result) {
  if (result.includes("win") && !result.includes("Dealer")) bankroll = +bankroll + 10;
  else if (result.includes("Dealer wins") || result.includes("busted")) bankroll = +bankroll - 10;

  localStorage.setItem("bankroll", bankroll);
  document.getElementById("bankroll").textContent = bankroll;
}

document.getElementById("hit").addEventListener("click", playerHit);
document.getElementById("stand").addEventListener("click", endGame);
document.getElementById("restart").addEventListener("click", initGame);

// Start game initially
initGame();


