import './CardDeck.js';
import './Card.js';


// function to dipslay shuffled cards in the UI
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

export function shuffleDeck(deck){
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

