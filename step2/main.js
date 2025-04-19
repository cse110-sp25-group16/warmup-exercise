import { shuffleDeck } from './shuffleCards.js';
import CardDeck from './CardDeck.js';
import { dealCards } from './dealCards.js';


// Create a new deck instance
const deck = new CardDeck();
deck.fillDeck(); // Fill the deck with cards
deck.printCards(); // Print the cards to console
const shuffleButton = document.querySelector('#shuffleButton');

shuffleButton.addEventListener('click', () => {
    shuffleDeck(deck);
});

const dealButton = document.querySelector("#deal")
dealButton.addEventListener("click", () => {
   console.log("deal button clicked")
   dealCards(deck, 5)
})