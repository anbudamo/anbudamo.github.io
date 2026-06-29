/*  File: scrabble_info.js
 *  Author: Anbu Damodaran
 *  Credit: Scrabble_Pieces_Associative_Array example provided by Jesse M. Heines
 */

class ScrabbleStartingInfo {
    constructor() {
        this.startingTiles = {
            "A": { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9  },
            "B": { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  },
            "C": { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  },
            "D": { "value" : 2,  "original-distribution" : 4,  "number-remaining" : 4  },
            "E": { "value" : 1,  "original-distribution" : 12, "number-remaining" : 12 },
            "F": { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  },
            "G": { "value" : 2,  "original-distribution" : 3,  "number-remaining" : 3  },
            "H": { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  },
            "I": { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9  },
            "J": { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1  },
            "K": { "value" : 5,  "original-distribution" : 1,  "number-remaining" : 1  },
            "L": { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  },
            "M": { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  },
            "N": { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  },
            "O": { "value" : 1,  "original-distribution" : 8,  "number-remaining" : 8  },
            "P": { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  },
            "Q": { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1  },
            "R": { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  },
            "S": { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  },
            "T": { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  },
            "U": { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  },
            "V": { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  },
            "W": { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  },
            "X": { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1  },
            "Y": { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  },
            "Z": { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1  },
            "-": { "value" : 0,  "original-distribution" : 2,  "number-remaining" : 2  }
        }
        this.startingBoard = [
            { id: 0, multiplier: 1, multiplierType: null, tile: null },
            { id: 1, multiplier: 1, multiplierType: null, tile: null },
            { id: 2, multiplier: 2, multiplierType: "word", tile: null },
            { id: 3, multiplier: 1, multiplierType: null, tile: null },
            { id: 4, multiplier: 1, multiplierType: null,     tile: null },
            { id: 5, multiplier: 1, multiplierType: null,     tile: null },
            { id: 6, multiplier: 2, multiplierType: "letter", tile: null },
            { id: 7, multiplier: 1, multiplierType: null,     tile: null },
            { id: 8, multiplier: 2, multiplierType: "letter", tile: null },
            { id: 9, multiplier: 1, multiplierType: null,     tile: null },
            { id: 10, multiplier: 1, multiplierType: null,     tile: null },
            { id: 11, multiplier: 1, multiplierType: null, tile: null },
            { id: 12, multiplier: 2, multiplierType: "word", tile: null },
            { id: 13, multiplier: 1, multiplierType: null, tile: null },
            { id: 14, multiplier: 1, multiplierType: null, tile: null }
        ]
    }
}