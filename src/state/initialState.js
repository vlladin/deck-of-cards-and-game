/**
 * Represents the initial state of the game.
 */
const initialState = {
    dealer: {
        name: "Dealer",
        cards: [{id: 1, isHidden: true}, {id: 2, isHidden: true}]
    },
    player: {
        name: "You",
        cards: [{id: 3, isHidden: true}, {id: 4, isHidden: true}]
    },

    isGameStarted: false,

    isPlayerTheWinner: false,
    isDealerTheWinner: false
}

export default initialState;