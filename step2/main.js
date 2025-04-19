/**
 * @file main.js
 * @description
 * Initializes the CardDeck, wires up the "Shuffle" and "Deal" buttons,
 * and updates the UI with the remaining card count.
 */

// import { shuffleDeck } from './shuffleCards.js';
// import CardDeck from './CardDeck.js';
// import { dealCards } from './dealCards.js';
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
    const cardsLeft = document.getElementById("numberOfCardsLeft")
    cardsLeft.innerHTML = `# Cards Left in Deck: ${deck.getCardCount()}`
})

const dealOneButton = document.querySelector("#dealOne")
dealOneButton.addEventListener("click", () => {
   dealCards(deck, 1, true)
   const cardsLeft = document.getElementById("numberOfCardsLeft")
   cardsLeft.innerHTML = `# Cards Left in Deck: ${deck.getCardCount()}`
})
