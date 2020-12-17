import styles from './Controls.module.css';
import * as classnames from 'classnames';

/**
 * Renders the buttons used to control the game.
 *
 * @param isGameStarted Determines if the game has been started. Used to enable/disable the buttons.
 * @param onDealButtonClicked A function that gets invoked when the DEAL button has been clicked.
 * @param onHitButtonClicked A function that gets invoked when the HIT button has been clicked.
 * @param onStandButtonClicked A function that gets invoked when the STAND button has been clicked.
 */
function Controls({isGameStarted, onDealButtonClicked, onHitButtonClicked, onStandButtonClicked}) {
    return (
        <div className={styles.controls}>
            <button
                className={classnames(styles.deal, {[styles.disabled]: isGameStarted})}
                onClick={onDealButtonClicked}>
                <div>Deal</div>
            </button>

            <button
                className={classnames(styles.hit, {[styles.disabled]: !isGameStarted})}
                onClick={onHitButtonClicked}>
                <div>Hit</div>
            </button>

            <button
                className={classnames(styles.stand, {[styles.disabled]: !isGameStarted})}
                onClick={onStandButtonClicked}>
                <div>Stand</div>
            </button>
        </div>
    );
}

export default Controls;