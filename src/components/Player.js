import styles from './Player.module.css';
import Card from './Card';

/**
 * Renders a player and its cards.
 *
 * @param name Represents the name of the player.
 * @param cards Represents a list of the player's cards.
 */
function Player({name, cards}) {
    const cardElements = getCardElements(cards);

    return (
        <div className={styles.player}>
            <div className={styles.playerName}>
                <h2>{name}</h2>
            </div>
            <div className={styles.cards}>
                {cardElements}
            </div>
        </div>
    );
}

/**
 * Maps the player's cards to their corresponding elements.
 * @param cards Represents a list of the player's cards.
 */
function getCardElements(cards) {
    return cards.map(card => {
        return (
            <div key={card.id} className={styles.card}>
                <Card
                    suite={card.suite}
                    value={card.value}
                    isRedCard={card.isRedCard}
                    isHidden={card.isHidden}
                />
            </div>
        )
    })
}

export default Player;