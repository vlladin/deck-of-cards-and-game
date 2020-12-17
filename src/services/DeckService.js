/**
 * Represents a deck of cards, consisting of 52 playing cards, and includes helper methods.
 * The cards are stored in a list, each card being binary encoded to save memory/cpu/bandwidth.
 *
 * Each card is encoded using 6 bits, the first 2 bits encode the suit and the last 4 bits encode the values.
 * The color of the card can be easily determined by reading the first bit of the sequence.
 *
 */
class DeckService {

    /**
     * Initializes the required properties and populates the list of cards.
     */
    constructor() {

        /**
         * Represents a list containing the possible suits of cards in the deck.
         */
        this.suits = ['♥', '♦', '♣', '♠'];

        /**
         * Represents a list containing all the possible values of the cards in the deck.
         */
        this.values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];

        /**
         * Represents a list that holds all the cards in the deck,
         */
        this.deck = [];

        this.initNewDeck();
    }

    /**
     * Initializes a new deck of cards. All the cards will be in sequential order.
     */
    initNewDeck() {
        this.deck = [];

        for (let suit = 0; suit < this.suits.length; suit++) {
            for (let value = 0; value < this.values.length; value++) {
                this.deck.push(((suit << 4) | value))
            }
        }

        // The deck gets reversed here, because we want to use pop() not shift() to draw from the top of the deck.
        this.deck.reverse();
    }

    /**
     * Initializes a deck of cards using the provided seed.
     *
     * @param seed Represents the seed of a deck of cards.
     */
    initDeckFromSeed(seed) {
        const deck = seed.split('.').map(element => parseInt(element));
        this.deck = deck;
    }

    /**
     * Shuffles the deck using the Fisher–Yates shuffle.
     * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
     */
    shuffle() {
        let m = this.deck.length;
        let roll;

        while (m) {
            roll = Math.floor(Math.random() * m--);
            [this.deck[m], this.deck[roll]] = [this.deck[roll], this.deck[m]];
        }
    }

    /**
     * Returns the top card from the deck.
     */
    draw() {
        if (this.cardsInDeck() === 0) {
            throw new Error('There are no cards available in the deck');
        }

        return this.decode(this.deck.pop());
    }

    /**
     * Returns a random card from the deck.
     */
    drawRandom() {
        if (this.cardsInDeck() === 0) {
            throw new Error('There are no cards available in the deck');
        }

        const randomIndex = Math.floor(Math.random() * this.deck.length);
        const item = this.deck[randomIndex];

        this.deck.splice(randomIndex, 1);

        return this.decode(item);
    }

    /**
     * Converts the value of a card, as stored in the list, to an object representation of the card, with all the
     * information needed.
     *
     * The value of the card is determined by the last 4 bits of the encodedCard. The resulting number is the index of
     * the card's value in the values list.
     *
     * The suite of the cars is determined by reading the first 2 bits of the encodedCard. The resulting number is
     * the index of the card's suit in the suits list.
     *
     * The color of the card is determined by reading the first bit of the encodedCard.
     *
     * @param encodedCard Represents the encoded card as stored in the card list.
     */
    decode(encodedCard) {
        return {
            id: encodedCard,
            value: this.values[encodedCard & 0b001111],
            suite: this.suits[encodedCard >> 4],
            isRedCard: !(encodedCard >> 5),
            isBlackCard: !!(encodedCard >> 5)
        }
    }

    /**
     * Returns the number of cards left in the deck.
     */
    cardsInDeck() {
        return this.deck.length;
    }

    /**
     * Returns the serialized version of the deck.
     */
    serializeDeck() {
        return this.deck.join('.');
    }

    /**
     * Returns a string representation of a deck, mostly for debugging purposes.
     */
    toString() {
        return JSON.stringify([...this.deck].map(card=>this.decode(card)), null, 4)
    }
}

export default DeckService;