# Simple Blackjack game

A small scaled down version of a classic Blackjack game (21).

Try to beat the dealer by reaching 21 (add your card values to get your score).

All the face cards have a value of 10 (including Aces). 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to run the game
In the project directory run:

### `npm install`
and then
### `npm start`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified, and the filenames include the hashes.\
Your app is ready to be deployed!


## More about the game
This game is a scaled down version of the classic Blackjack. It uses only one deck of cards, the Aces have a value of 10,
and the dealer has been dumbed down to save time (no AI, nothing fancy).

I allocated 8 hours for this and managed to land right on the estimation.

Given more time, I would have done *some* things differently:

1. React is not a game engine. There are plenty of JS game engines out there, but they require more setup. Also, useReducer
   is not really a proper state management system.
2. I would have invested time into making the dealer smarter.
3. I would have connected the game to a backend of sorts, to enable internet multiplayer capabilities.
4. For a more production ready game that includes multiplayer, parts of the architecture will need improvements. 

## More about the deck class
The deck class was built with these things in mind:
1. Portability - should have no external dependencies.
2. Memory - keep the memory footprint low.
3. Performance - avoid loops and time-consuming code when shuffling/drawing/decoding a card. 

Given more time, the deck class can also be improved:
1. The seed is not validated at all.
2. There should be a way of swapping out Math.random() and use an external RNG or the one from web crypto.
3. The ability to add more than one deck in the cards list (casinos are using more decks in a game).
4. Implement more shuffle strategies.
5. Replace the array holding all the cards with a more performant list structure. 

## More about the code
Other than the react, react-scripts and react-dom, this project depends also on classnames. Tried to keep the list small. 

For styling I used node-modules.

I tried to keep the naming conventions/code style uniform, and also heavily commented the code.

It should be readable enough.