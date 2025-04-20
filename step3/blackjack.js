let playerCards = [];
let dealerCards = [];
let playerTurn = true;
let gameOver = false;



/**
 * Player's Hand
 */
const updateTotal = () => {
    const cardsValue = document.getElementById("total");
    const total = calculateHandValue(playerCards);
    cardsValue.innerHTML = `Your total: ${total}`;
};


const calculateHandValue = (cards) => {
    let total = 0;
    let aces = 0;

    cards.forEach(card => {
        total += card.getCardValue();
        if (card.getCardValue() === 1) aces += 1;
    });

 
    while (aces > 0 && total + 10 <= 21) {
        total += 10;
        aces--;
    }

    return total;
};


/**
 * 
 * Deals the cards at the start of the game for the dealer and the player.
 */
const deal = () => {
    if (deck.getCardCount() < 4) return;

    
    playerCards = [];
    dealerCards = [];
    deck.displayCards = [];
    playerTurn = true;
    gameOver = false;

 
    playerCards.push(deck.removeTopCard());
    dealerCards.push(deck.removeTopCard());
    playerCards.push(deck.removeTopCard());
    dealerCards.push(deck.removeTopCard());

    deck.displayCards = playerCards;
    renderPlayerCards();
    updateTotal();

  
    renderDealerCards(true);
};

/**
 * Shows player cards
 */


const renderPlayerCards = () => {
    const container = document.getElementById("dealtCards");
    container.innerHTML = "";

    playerCards.forEach(card => {
        const img = document.createElement("img");
        img.src = `../cardsJPG/${card.id}.jpg`;
        img.alt = card.getCardName();
        container.appendChild(img);
    });
};

/**
 * 
 * @param {boolean} hideFirstCard 
 * Shows dealer's cards.
 */

const renderDealerCards = (hideFirstCard = false) => {
    let container = document.getElementById("dealerCards");
    if (!container) {
        container = document.createElement("div");
        container.id = "dealerCards";
        document.body.appendChild(container);
    }

    container.innerHTML = "";

    dealerCards.forEach((card, index) => {
        const img = document.createElement("img");
        img.src = hideFirstCard && index === 0 ? "../cardsJPG/back.jpg" : `../cardsJPG/${card.id}.jpg`;
        img.alt = card.getCardName();
        container.appendChild(img);
    });
};

/**
 * 
 * Player hits
 */


const playerHit = () => {
    if (!playerTurn || gameOver) return;

    const card = deck.removeTopCard();
    playerCards.push(card);
    deck.displayCards = playerCards;

    renderPlayerCards();
    updateTotal();

    const total = calculateHandValue(playerCards);
    if (total > 21) {
        endGame("Player busts! Dealer wins.");
    }
};

/**
 * 
 * Player stands
 */

const playerStand = () => {
    if (!playerTurn || gameOver) return;

    playerTurn = false;
    dealerTurn();
};

/**
 * Dealer's Turn once player is done acting
 */


const dealerTurn = () => {
    renderDealerCards(false);

    const dealerTotal = () => calculateHandValue(dealerCards);

    const play = () => {
        if (dealerTotal() < 17) {
            dealerCards.push(deck.removeTopCard());
            renderDealerCards(false);
            setTimeout(play, 800); 
        } else {
            endGame(checkWinner());
        }
    };

    setTimeout(play, 1000); 
};


/**
 * 
 * Winner of this hand
 */

const checkWinner = () => {
    const playerTotal = calculateHandValue(playerCards);
    const dealerTotal = calculateHandValue(dealerCards);

    if (dealerTotal > 21) return "Dealer busts! You win!";
    if (playerTotal > dealerTotal) return "You win!";
    if (playerTotal < dealerTotal) return "Dealer wins!";
    return "Push! It's a tie.";
};

/**
 * 
 * @param {string} message 
 * Alerts player of the winner
 */

const endGame = (message) => {
    gameOver = true;
    playerTurn = false;
    renderDealerCards(false);
    alert(message);
};
