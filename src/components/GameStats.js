import styles from './GameStats.module.css';

/**
 * Renders the messages presented to the user throughout the game.
 * @param isGameStarted Determines if the game has been started.
 * @param isDealerTheWinner Determines if the dealer has won the game.
 * @param isPlayerTheWinner Determines if the player has won the game.
 */
function GameStats({isGameStarted, isDealerTheWinner, isPlayerTheWinner}) {
    /**
     * Determines if this is the first time the game has been opened.
     */
    const isStartOfTheGame = !isGameStarted && !isDealerTheWinner && !isPlayerTheWinner;

    return (
        <div className={styles.gameStats}>

            {isPlayerTheWinner &&
            <div className={styles.winMessage}>You won!!!</div>
            }

            {isDealerTheWinner &&
            <div className={styles.looseMessage}>Sorry you lost.</div>
            }

            {isStartOfTheGame &&
            <div className={styles.gameInfo}>To start a
                new game, press the DEAL button</div>
            }

            {isGameStarted &&
            <div className={styles.gameInfo}>Get to 21. All face cards, including Aces, have a value of 10.</div>
            }
        </div>
    );
}

export default GameStats;