/**
 * Renders the given shuffled deck into the UI by clearing any existing
 * cards in the container with id = "shuffle" and appending an <img> for
 * each card in the new order.
 *
 * @param {Array<Card>} shuffledDeck
 *  The array of card objects in their shuffled order. 
 */
function displayCards(shuffledDeck) {
    const shuffleContainer = document.getElementById('shuffle');
    
    // clear all the initial hardcoded cards 
    const existingCards = shuffleContainer.querySelectorAll('img');
    existingCards.forEach(card => card.remove());

    // Loop through shuffled deck and display each card
    shuffledDeck.forEach(card => {
        const cardElement = document.createElement('img');
        
        cardElement.src = `../cardsJPG/${card.id}.jpg`; 
        cardElement.id = 'cardImage';
        cardElement.alt = `Card ${card.id}`;
        cardElement.classList.add('cardPic');
    
        shuffleContainer.appendChild(cardElement);
    });
}

/**
 * Shuffles the provided deck, updates the UI to show the new order,
 * and triggers a CSS “shuffling” animation on the container.
 *
 * @param {CardDeck} deck
 *   The CardDeck instance whose cards you want to shuffle.
 * @returns {Array<Card>}
 *   The array of Card objects in their new, shuffled order.
 */
function shuffleDeck(deck){
    const shuffleContainer = document.getElementById('shuffle');
    const shuffledDeck = deck.shuffle();
    displayCards(shuffledDeck);  // Display shuffled cards in the UI

    setTimeout(() => {
        shuffleContainer.classList.add('shuffling');  // Start shuffle animation
    }, 0);

    setTimeout(() => {
        shuffleContainer.classList.remove('shuffling');  // End shuffle animation
    }, 1000);

    return shuffledDeck;
}

