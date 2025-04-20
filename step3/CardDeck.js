class CardDeck {

    /**
     * Initializes an empty deck of cards
     */
    constructor() {
        this.cards = [];
        this.displayCards = []
    }

    /**
     * 
     * @returns {number} Current count of cards in deck
     */
    getCardCount() {
        return this.cards.length;
    }

    /**
     * 
     * @returns {Array<Card>} Array of cards in the deck
     */
    getCards() {
        return this.cards;
    }

    /**
     * Fills the deck with a standard 52-card deck
     */
    fillDeck() {
        for(let i = 0;i<52;i++) {
            rank = i % 13;

            if (rank === 0) 
                value = 1; // Ace 
            else if (rank >= 10) 
                value = 10; // Jack, Queen, King
            else 
                value = rank + 1;
            


            this.cards.push(new Card(i,false, value));
        }
    }

    /**
     * 
     * @returns {number} Value of the hanc
     */

    handvalue() {
        const cardsValue = document.getElementById("total");
        let total = 0;
        let aceCount = 0;

        for (let i = 0; i < this.displayCards.length; i++) {
            let card = this.displayCards[i];
            total += card.value;
            if (card.value === 11) aceCount++;
        }

        // Adjust Aces from 11 to 1 if total is over 21
        while (total > 21 && aceCount > 0) {
            total -= 10;
            aceCount--;
        }

        if (cardsValue) {
            cardsValue.innerHTML = `Your total: ${total}`;
        }

        return total;
    }

    /**
     * Shuffles cards in deck according to Fisher-Yates algorithm
     */
    shuffle() {
        let curr = this.getCardCount();

        while(curr != 0) {
            let random = Math.floor(Math.random() * curr);
            curr -= 1;
    
            let temp = this.cards[curr];
            this.cards[curr] = this.cards[random];
            this.cards[random] = temp;
        }

        return this.cards;
    }

    /**
     * Helper function: Prints out all cards currently in deck by id into console
     */
    printCards() {
        let max = this.getCardCount();
        for(let i = 0;i<max;i++) {
            // console.log(this.cards[i].id);
        }
    }

    /**
     * 
     * @param {number} id Removes card from deck of given id
     */
    removeCard(id) {
        let max = this.getCardCount();
        for(let i = 0;i<max;i++) {
            if(this.cards[i].id == id) {
                this.cards.splice(i,1);
            }
        }
    }

    /**
     * 
     * @returns {Card} Returns top card of the deck
     */
    removeTopCard() {
        return this.cards.pop();
    }

    /**
     * 
     * @param {number} id Adds card of provided id to top of deck
     */
    addCard(id) {
        this.cards.push(new Card(id,false));
    }
}