import DeckService from '../services/DeckService';
import * as ACTION_TYPES from '../actions/action_types';

/**
 * Defines the win condition for this game.
 * @type {number}
 */
const WIN_CONDITION_VALUE = 21;

/**
 * Defines the minimum sum of card values under which the dealer can't stand (has to draw).
 * @type {number}
 */
const DEALER_CARDS_VALUE_STOP_THRESHOLD = 17;

/**
 * A representation of the deck used in this game.
 * @type {DeckService}
 */
const deckService = new DeckService();

/**
 * The main reducer for this game.
 *
 * @param state Represents the state of the current game.
 * @param action Represents the action that's been triggered.
 */
function gameReducer(state, action) {
    switch (action.type) {
        case ACTION_TYPES.DEAL:
            return handleDealAction(state);

        case ACTION_TYPES.HIT:
            return handleHitAction(state);

        case ACTION_TYPES.STAND:
            return handleStandAction(state);

        default:
            return state;
    }
}

/**
 * Represents the handler for the DEAL action.
 *
 * When invoked it will setup a new game.
 *
 * @param state Represents the state of the game.
 */
function handleDealAction(state) {
    if (state.isGameStarted) {
        return state;
    }

    createNewShuffledDeck();
    console.log(deckService.cardsInDeck())
    console.log(deckService.drawRandom())
    console.log(deckService.cardsInDeck())

    let dealerCards = [];
    dealerCards.push({...deckService.draw(), isHidden: true});
    dealerCards.push(deckService.draw());

    let playerCards = [];
    playerCards.push(deckService.draw())
    playerCards.push(deckService.draw())

    return {
        ...state,
        isGameStarted: true,

        isPlayerTheWinner: false,
        isDealerTheWinner: false,

        dealer: {...state.dealer, cards: dealerCards},
        player: {...state.player, cards: playerCards},

    };
}

/**
 * Represents the handler for the HIT action.
 *
 * When invoked it will draw a new card from the deck, and add it to the player's list of cards.
 * It also tries to determine if the winning/losing conditions have been met by the player.
 *
 * @param state Represents the state of the game.
 */
function handleHitAction(state) {
    if (!state.isGameStarted) {
        return state;
    }

    let nextCard = deckService.draw();
    let playerCards = [...state.player.cards];
    playerCards.push(nextCard);

    const cardsValue = calculateCardsValue(playerCards);

    const playerWon = cardsValue === WIN_CONDITION_VALUE;
    const playerBusted = cardsValue > WIN_CONDITION_VALUE;
    const shouldGameStop = !playerBusted && !playerWon;

    return {
        ...state,
        isGameStarted: shouldGameStop,

        isDealerTheWinner: playerBusted,
        isPlayerTheWinner: playerWon,

        player: {...state.player, cards: playerCards}
    }
}

/**
 * Represents the handler for the STAND action.
 *
 * When triggered it will draw cards for the dealer, until the DEALER_CARDS_VALUE_STOP_THRESHOLD has been met.
 * It will then try to determine the winner/loser based on the sum of cards each player holds in hand.
 * After the winner has been determined the game will be stopped.
 *
 * @param state Represents the state of the game.
 */
function handleStandAction(state) {
    let dealerCards = [...state.dealer.cards];

    while (calculateCardsValue(dealerCards) < DEALER_CARDS_VALUE_STOP_THRESHOLD) {
        dealerCards.push(deckService.draw());
    }

    dealerCards.forEach(card => {
        card.isHidden = false;
    })

    const dealerCardsValue = calculateCardsValue(dealerCards);
    const playerCardsValue = calculateCardsValue(state.player.cards);

    const dealerBusted = dealerCardsValue > WIN_CONDITION_VALUE;
    const dealerWonByScore = dealerCardsValue > playerCardsValue;

    return {
        ...state,

        isGameStarted: false,

        isDealerTheWinner: !dealerBusted && dealerWonByScore,
        isPlayerTheWinner: dealerBusted || !dealerWonByScore,

        dealer: {...state.dealer, cards: dealerCards}
    }
}

/**
 * Helper method that will initialise a new deck and then shuffle it.
 */
function createNewShuffledDeck() {
    deckService.initNewDeck();
    deckService.shuffle();
}

/**
 * Helper method that will calculate the sum of values of the given cards.
 *
 * @param cards A list of cards for which the sum of values should be calculated.
 * @returns {number} The sum of values for the given list of cards.
 */
function calculateCardsValue(cards) {
    let sum = 0;

    cards.forEach(card => {
        if (isNaN(card.value)) {
            sum += 10;
        } else {
            sum += card.value;
        }
    })

    return sum;
}

export default gameReducer;