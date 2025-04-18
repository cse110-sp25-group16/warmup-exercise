import { shuffleDeck } from './shuffleCards.js';
import CardDeck from './CardDeck.js';


// Create a new deck instance
const deck = new CardDeck();
deck.fillDeck(); // Fill the deck with cards
deck.printCards(); // Print the cards to console
const shuffleButton = document.querySelector('.deck');

shuffleButton.addEventListener('click', () => {
    shuffleDeck(deck);
});