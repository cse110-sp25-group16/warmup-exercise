let deck = new CardDeck();
let player = [];
let dealer = [];
let bankroll = localStorage.getItem("bankroll") || 100;

document.getElementById("bankroll").textContent = bankroll;

function initGame() {
  deck = new CardDeck();
  deck.fillDeck();
  deck.shuffle();

  player = [deck.removeTopCard(), deck.removeTopCard()];
  dealer = [deck.removeTopCard(), deck.removeTopCard()];

  renderHands(true);
  document.getElementById("result").textContent = "";
}

function renderHands(hideDealerSecondCard = false) {
  renderHand("playerHand", player);
  renderHand("dealerHand", dealer, hideDealerSecondCard);
}

function renderHand(containerId, hand, hideSecond = false) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  hand.forEach((card, index) => {
    const img = document.createElement("img");
    img.src = (index === 1 && hideSecond && containerId === "dealerHand")
      ? "../cardsJPG/back.jpg"
      : `../cardsJPG/${card.id}.jpg`;
    img.alt = card.getCardName();
    img.style.margin = "5px";
    img.style.height = "195px";
    img.style.width = "140px";
    container.appendChild(img);
  });
}

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

function playerHit() {
  player.push(deck.removeTopCard());
  renderHands(true);
  if (handValue(player) > 21) endGame();
}

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

function endGame() {
  dealerTurn();
  renderHands(false);

  const p = handValue(player);
  const d = handValue(dealer);

  let result = "";
  if (p > 21) result = "You busted! Dealer wins.";
  else if (d > 21 || p > d) result = "You win!";
  else if (p === d) result = "Push!";
  else result = "Dealer wins!";

  updateBankroll(result);
  document.getElementById("result").textContent = result;
}

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


