import React, {useReducer} from 'react';
import * as ACTION_TYPES from './actions/action_types';

import styles from './App.module.css';
import Controls from './components/Controls';
import Player from './components/Player';
import GameStats from './components/GameStats';
import gameReducer from './reducers/gameReducer';
import initialState from './state/initialState';


/**
 * Renders the view of a blackjack game.
 *
 * @returns {JSX.Element}
 */
function App() {
    const [state, dispatch] = useReducer(gameReducer, initialState)

    return (
        <div className={styles.app}>
            <Player name={state.dealer.name} cards={state.dealer.cards}/>

            <div className={styles.gameControls}>
                <div className={styles.gameStats}>
                    <GameStats
                        isGameStarted={state.isGameStarted}
                        isPlayerTheWinner={state.isPlayerTheWinner}
                        isDealerTheWinner={state.isDealerTheWinner}/>
                </div>
                <Controls
                    isGameStarted={state.isGameStarted}

                    onDealButtonClicked={() => dispatch({type: ACTION_TYPES.DEAL})}
                    onHitButtonClicked={() => dispatch({type: ACTION_TYPES.HIT})}
                    onStandButtonClicked={() => dispatch({type: ACTION_TYPES.STAND})}/>
            </div>

            <Player name={state.player.name} cards={state.player.cards}/>
        </div>
    );
}

export default App;
