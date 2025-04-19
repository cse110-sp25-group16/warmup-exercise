/**
 * Deals a specified number of cards from the top of the deck and
 * renders them in the UI by clearing previous cards, appending
 * `<img>` elements for each dealt card, and triggering the
 * CSS “dealing” animation.
 *
 * @param {CardDeck} deck
 *   The `CardDeck` instance to draw cards from.
 * @param {number} numCards
 *   How many cards to deal from the deck.
 */
const dealCards = (deck, numCards, keepDisplay = false) => {
    if (deck.cards.length < numCards) return // if there aren't enough cards left, return

  if (keepDisplay) {
    // Maintain max of 5 cards
    if (deck.displayCards.length >= 5) {
      deck.displayCards.shift();
    }
  } else {
    deck.displayCards = [];
  }

  for (let i = 0; i < numCards; i++) {
    // removes the top card numCards times
    const removedCard = deck.removeTopCard();
    deck.displayCards.push(removedCard);
  }

  const dealtContainer = document.getElementById("dealtCards");
  dealtContainer.innerHTML = ""; // removes previously dealt cards from ui

  deck.displayCards.forEach((card) => {
    //displays the dealt cards
    const cardElement = document.createElement("img");
    cardElement.src = `../cardsJPG/${card.id}.jpg`;
    cardElement.id = `cardImage${card.id}`;
    cardElement.alt = `Card ${card.id}`;
    // cardElement.classList.add('cardPic');

    dealtContainer.appendChild(cardElement); // Force reflow to restart CSS animation
    void dealtContainer.offsetWidth;

    dealtContainer.classList.add("dealing"); // <- trigger fan-out
  });
};
