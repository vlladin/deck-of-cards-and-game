import styles from './Card.module.css';
import * as classnames from 'classnames';

/**
 * Renders the view of a game card, used in the game.
 *
 * @param suite Represents the suite of the card.
 * @param value Represents the value of the card.
 * @param isRedCard Determines if the color of the card is red.
 * @param isHidden Determines if the card should be rendered hidden (bottoms up).
 *
 */
function Card({suite, value, isRedCard, isHidden}) {
    if (isHidden) {
        return (
            <div className={classnames(styles.card, {[styles.hidden]: true})}/>
        )
    }

    return (
        <div className={classnames(styles.card, {[styles.red]: isRedCard})}>
            <div className={styles.value}>{value}</div>
            <div className={styles.suite}>{suite}</div>
        </div>
    );
}

export default Card;