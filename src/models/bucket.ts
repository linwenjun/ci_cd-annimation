import Card from './card';

export default class Bucket {
    cards: Card[] = [];
    constructor(cardNumber: number) {
        this.cards = Array.from({ length: cardNumber }, () => new Card());
    }
}