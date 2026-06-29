/*  File: main.js
 *  Author: Anbu Damodaran
 */

$(document).ready(function() {
    let scrabbleGame = new ScrabbleManager()

    $('#restart').on("click", function() {
        scrabbleGame.resetGame()
    })

    $('#submit').on("click", function() {
        scrabbleGame.submitGame()
    })

})

