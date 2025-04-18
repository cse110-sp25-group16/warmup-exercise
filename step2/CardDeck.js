import './Card.js';

class CardDeck {
    constructor() {
        this.cards = [];
    }

    getCardCount() {
        return this.cards.length;
    }

    getCards() {
        return this.cards;
    }

    fillDeck() {
        for(let i = 0;i<52;i++) {
            this.cards.push(new Card(i,false));
        }
    }

    shuffle() {
        let curr = this.getCardCount();

        while(curr != 0) {
            let random = Math.floor(Math.random() * curr);
            curr -= 1;
    
            let temp = this.cards[curr];
            this.cards[curr] = this.cards[random];
            this.cards[random] = temp;
        }
    }

    printCards() {
        let max = this.getCardCount();
        for(let i = 0;i<max;i++) {
            console.log(this.cards[i].id);
        }
    }

    removeCard(id) {
        let max = this.getCardCount();
        for(let i = 0;i<max;i++) {
            if(this.cards[i].id == id) {
                this.cards.splice(i,1);
            }
        }
    }

    removeTopCard() {
        return this.cards.pop();
    }

    addCard(id) {
        this.cards.push(new Card(id,false));
    }
}

export default CardDeck;