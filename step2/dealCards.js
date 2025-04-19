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
const dealCards = (deck, numCards) => {
    if (deck.cards.length < numCards) return // if there aren't enough cards left, return
    
   const dealtCards = []
   console.log(deck.cards.length, numCards)

   for (let i = 0; i < numCards; i++) { // removes the top card numCards times
      const removedCard = deck.removeTopCard()
      dealtCards.push(removedCard)
   }

   console.log(deck)
   const dealtContainer = document.getElementById("dealtCards")
   dealtContainer.innerHTML = "" // removes previously dealt cards from ui

   dealtCards.forEach(card => { //displays the dealt cards
      console.log(card)
      const cardElement = document.createElement('img');
        
      cardElement.src = `../cardsJPG/${card.id}.jpg`; 
      cardElement.id = `cardImage${card.id}`;
      cardElement.alt = `Card ${card.id}`;
      // cardElement.classList.add('cardPic');
  
      dealtContainer.appendChild(cardElement);
         // Force reflow to restart CSS animation
      
      void dealtContainer.offsetWidth;

      dealtContainer.classList.add("dealing"); // <- trigger fan-out
   })
}

