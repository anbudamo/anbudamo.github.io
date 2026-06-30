/*  File: scrabble_manager.js
 *  Description: This file manages the Scrabble game board, 
 *  tile distribution, player interactions, and score calculation logic.
 *  Author: Anbu Damodaran
 */

class ScrabbleManager {
    constructor() {
        // load dictionary 
        this.loadDictionary()

        // set up scrabble board and holder
        this.buildBoard()
        this.buildHolder()

        // set up game state and starting tiles
        this.startGame()
    }

    async loadDictionary() {
        try {
            // fetch the text file from the same folder
            const response = await fetch('dictionary.txt');
            const text = await response.text();

            const wordArray = text.split('\n').map(word => word.trim().toLowerCase());
            
            // wrap in a Set
            this.dictionary = new Set(wordArray);
            console.log("Dictionary loaded successfully!");
        } catch (error) {
            console.error("Failed to load dictionary:", error);
        }
    }

    buildBoard() {
        let $boardSquares = $('#scrabble-board-squares')
        $boardSquares.empty()
        for (let i = 0; i < 15; i++) {
            let $square = $('<li>', {
                class: 'square-' + i
            })

            const self = this;

            $square.droppable({
                accept: function(draggable) {
                    if ($(this).find('.scrabble-tile').length > 0) {
                        return false
                    }
                    
                    let $allSquares = $boardSquares.children()
                    let $activeTiles = $allSquares.find('.scrabble-tile:not(.ui-draggable-disabled)').length 
                    if ($activeTiles === 0) {
                        return true
                    }

                    let hasLeftNeighbor = $(this).prev().find('.scrabble-tile').not(draggable).length > 0;
                    let hasRightNeighbor = $(this).next().find('.scrabble-tile').not(draggable).length > 0;

                    return hasLeftNeighbor || hasRightNeighbor;
                },
                drop: function(event, ui) {
                    let $thisTile = ui.draggable
                    let $thisSquare = $(this)

                    $thisSquare.append($thisTile)

                    $thisTile.css({
                        position: 'relative',
                        top: 0,
                        left: 0
                    })
                    
                    // update the board
                    self.updateBoardState()

                    // update the scoreboard
                    self.calculateBoardScore()
                }
            })
            $boardSquares.append($square)
        }
    }

    buildHolder() {
        let $holderSquares = $('#scrabble-holder-squares')
        $holderSquares.empty()
        for (let i = 0; i < 7; i++) {
            let $square = $('<li>', {
                class: 'square-' + i
            })
            const self = this;
            $square.droppable({
                accept: function(draggable) {
                    if ($(this).find('.scrabble-tile').length > 0) {
                        return false
                    }
                    return true
                },
                drop: function(event, ui) {
                    let $thisTile = ui.draggable
                    let $thisSquare = $(this)

                    $thisSquare.append($thisTile)

                    $thisTile.css({
                        position: 'relative',
                        top: 0,
                        left: 0
                    })
                    
                    // update the board
                    self.updateBoardState()

                    // update the scoreboard
                    self.calculateBoardScore()
                }
            })
            $holderSquares.append($square)
        }
    }

    startGame() {
        // cntains the starting state info
        this.startingInfo = new ScrabbleStartingInfo()
         // active bag state
        this.gameBag = JSON.parse(JSON.stringify(this.startingInfo.startingTiles))
        // active board state
        this.gameBoard = structuredClone(this.startingInfo.startingBoard)

        this.getHolderTiles()
    }

    getNLetters(count) {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ-'.split('')
        let letters = []

        let totalRemaining = 0;
        for (let key in this.gameBag) {
            totalRemaining += this.gameBag[key]['number-remaining'];
        }

        const tilesToDraw = Math.min(count, totalRemaining);

        for (let i = 0; i < tilesToDraw; i++) {
            let letter = alphabet[Math.floor(Math.random() * 27)]
            
            // loop until we find a letter that is actually left in the bag
            while (this.gameBag[letter]['number-remaining'] <= 0) {
                letter = alphabet[Math.floor(Math.random() * 27)]
            }
            
            // decrement count
            this.gameBag[letter]['number-remaining']--
            letters.push(letter)
        }

        return letters
    }

    getHolderTiles() {
        let $emptyHolderSquares = $('#scrabble-holder-squares li').filter(function() {
            return $(this).find('.scrabble-tile').length === 0
        })
        let letters = this.getNLetters($emptyHolderSquares.length)

        // create the hand with chosen letters
        for (let i = 0; i < letters.length; i++) {
            console.log(letters[i])
            let $element = $emptyHolderSquares.eq(i)
            // create tile
            let link = 'img/Scrabble_Tiles/Scrabble_Tile_' + letters[i] + '.jpg'
            let $tile = $('<img>', {
                src: link,
                class: 'scrabble-tile',
                'data-letter': letters[i]
            })

            // add tile 
            $element.append($tile)
            
            $tile.draggable({
                stack: '.scrabble-tile', 
                revert: 'invalid'
            })
        }
    }

    clearHolderTiles() {
        $('#scrabble-holder-squares li').empty()
    }

    updateBoardState() {
        // get the board squares
        let $squares = $('#scrabble-board-squares li')
        $squares.each((index, element) => {
            // get the tile
            let $tile = $(element).find('.scrabble-tile')

            // update board
            if ($tile) {
                this.gameBoard[index].tile = $tile.data('letter')
            }
            else {
                this.gameBoard[index].tile = null
            }
        })
    }

    calculateBoardScore() {
        let baseScore = 0
        let finalScore = 0
        let wordMultiplier = 1

        const wordStatus = Object.freeze({
            EMPTY: 'empty',
            STARTED: 'started',
            ENDED: 'ended',
            BROKEN: 'broken'
        })
        let currentWordStatus = wordStatus.EMPTY
        for (let i = 0; i < this.gameBoard.length; i++) {
            if (currentWordStatus == wordStatus.EMPTY) {
                if (this.gameBoard[i].tile) {
                    currentWordStatus = wordStatus.STARTED
                }
            }
            else if (currentWordStatus == wordStatus.STARTED) {
                if (!this.gameBoard[i].tile) {
                    currentWordStatus = wordStatus.ENDED
                }
            }
            else if (currentWordStatus == wordStatus.ENDED) {
                if (this.gameBoard[i].tile) {
                    currentWordStatus = wordStatus.BROKEN
                }
            }
        }

        if (currentWordStatus != wordStatus.EMPTY && currentWordStatus != wordStatus.BROKEN) {
            for (let i = 0; i < this.gameBoard.length; i++) {
                let square = this.gameBoard[i];

                if (square.tile) {
                    let letter = square.tile;
                    
                    let letterValue = this.gameBag[letter].value; 

                    if (square.multiplierType === 'letter') {
                        letterValue *= square.multiplier;
                    }

                    baseScore += letterValue;

                    if (square.multiplierType === 'word') {
                        wordMultiplier *= square.multiplier;
                    }
                }
            }

            finalScore = baseScore * wordMultiplier;
        }

        if (this.notAWord()) {
            finalScore = 0
        }

        $('#score-display-current').text(finalScore)
    }

    notAWord() {
        // get the word on the board
        let $tilesOnBoard = $('#scrabble-board-squares').find('.scrabble-tile')
        let wordOnBoard = ""
        $tilesOnBoard.each(function(index, element) {
            wordOnBoard += $(element).data('letter')
        })

        return this.dictionary.has(wordOnBoard.toLowerCase())
    }

    submitGame() {
        if (Number($('#score-display-current').text()) > 0) {
            // clear board and board state
            this.buildBoard()
            this.gameBoard = structuredClone(this.startingInfo.startingBoard)

            // update scoreboard
            let currentScore = Number($('#score-display-current').text())
            let totalScore = Number($('#score-display-total').text())
            let currentRound = Number($('#round-display').text())
            $('#score-display-current').text(0)
            $('#score-display-total').text(totalScore + currentScore)
            $('#round-display').text(++currentRound)
            console.log('submitted')

            // replenish tiles
            this.getHolderTiles()
        }
        else {
            // throw error
            console.log('current play is not a word.')
        }
    }

    resetGame() {
        // setup from scratch
        this.buildBoard()
        this.buildHolder()
        this.startGame()

        // reset the scoreboard
        $('#score-display-current').text(0)
        $('#score-display-total').text(0)
        $('#round-display').text(1)
    }
}
