import './CardDeck.js';
import './Card.js';

function displayCards(shuffledDeck) {
    const shuffleContainer = document.getElementById('shuffle');
    
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
    shuffleContainer.classList.add('shuffling');

    const shuffledDeck = deck.shuffle();

    setTimeout(() => {
        shuffleContainer.classList.remove('shuffling');  // End shuffle animation
        
        displayCards(shuffledDeck);  // Display shuffled cards in the UI
    }, 1000);

    return shuffledDeck;
}

