# https://anbudamo.github.io/HW5/scrabble.html

## Implemented Features

* **Letter tiles in the player’s “hand” are selected randomly from a data structure with the proper distribution of the letters (8 pts)**
  * **Implementation:** I have a class in scrabble_info.js that stores the associative array made by Prof Jesse Heines. I create a copy of that using a function called 'Object.structuredClone' and maintain that throughout the game.

* **Letter tiles can be dragged-and-dropped onto target Scrabble squares (8 pts)**
  * **Implementation:** I use the Jquery UI library to handle the heavy lifting. The tiles are created and the draggable() Jquery UI method is called on them. The target squares on the board are similarly made to be droppable using the JQuery UI method droppable(). I customize my draggable and droppable elements with custom methods so that they snap to grid and no more than one tile can be dropped into a target square.

* **Program identifies which letter tile is dropped onto which Scrabble square (8 pts)**
  * **Implementation:** For my tiles I create a data attribute called data-letter that just stores the letter. This way I can retrieve a target square's tile's letter.

* **Board includes bonus squares (6 pts)**
  * **Implementation:** In the calculateBoardScore method in scrabble_manager.js, I account for the tile value, and the bonus multipliers.

* **The word being played is displayed and the score is calculated real time (6 pts)**
  * **Implementation:** I display the current score on the fly and display it on screen. Placing or removing a tile from the board triggers an update to the board state and then a calculateBoardScore call which displays the score on screen.

* **Score is tallied correctly and real time, including consideration of bonus square multipliers (6 pts)**
  * **Implementation:** Inside my calculateBoardScore method, I loop through the placed tiles. If a square has a 'letter' multiplier, I multiply the tile's value by that amount and add it to a base score. If it has a 'word' multiplier, I track that and multiply the final base score before updating the display.

* **Any number of words can be played until the player wishes to quit or depletes all tiles (6 pts)**
  * **Implementation:** The submitGame method acts as the game loop. As long as a valid word is played, it advances the round. In my getNLetters method, I use Math.min() against the totalRemaining count to safely draw tiles even as the bag runs out of letters.

* **The board is cleared after each round so that a new word can be played (6 pts)**
  * **Implementation:** When the user clicks submit, my submitGame method calls buildBoard() to completely empty the board HTML and recreate the empty squares. I also reset the active gameBoard state back to a clone of the starting board.

* **After playing a word, only the number of letter tiles needed to bring the player’s “hand” back to 7 tiles are selected (6 pts)**
  * **Implementation:** In the getHolderTiles method, I use a jQuery filter to count exactly how many holder squares are currently empty. I then pass that specific number into my getNLetters function so it only draws what is needed to refill the hand.

* **Score is kept for multiple words until the user restart a new game (6 pts)**
  * **Implementation:** Inside submitGame, I read the value from the current score display and add it to the total score display. The total score persists and accumulates across rounds until the user explicitly hits the restart button.

* **Tiles can only be dragged from the “rack” to Scrabble board. If dropped elsewhere, they bounce back (6 pts)**
  * **Implementation:** When I initialize the tiles with jQuery UI's draggable(), I set the option `revert: 'invalid'`. This ensures that if a tile is dropped anywhere other than a valid droppable square, it automatically snaps back to its starting position in the rack.

* **Once the tile is placed on the Scrabble board, it cannot be moved (6 pts)**
  * **Implementation:** While building a word, the user can move tiles around. However, once the submit button is clicked and submitGame runs, the board is physically wiped clean and reset. The tiles used for that word are removed from play entirely, locking in the move.

* **Except for the first letter, all subsequent letters must be placed directly next to another letter with no space. Else, bounce back (4 pts)**
  * **Implementation:** In the accept function for my board squares, I first check if the board is completely empty. If it is, any drop is allowed. If there are active tiles, I check the adjacent squares using jQuery's prev() and next() methods. It only accepts the drop if it has a left or right neighbor.

* **User can always restart the game (4 pts)**
  * **Implementation:** I created a resetGame method that completely rebuilds the board and holder from scratch, resets the internal tile bag and board state arrays, and sets the current score, total score, and round displays back to their default values. This is bound to the restart button click event in main.js.