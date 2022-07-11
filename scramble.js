/**********************************************
 * STARTER CODE
 **********************************************/

/**
 * shuffle()
 * Shuffle the contents of an array
 *   depending the datatype of the source
 * Makes a copy. Does NOT shuffle the original.
 * Based on Steve Griffith's array shuffle prototype
 * @Parameters: Array or string
 * @Return: Scrambled Array or string, based on the provided parameter
 */
function shuffle(src) {
    const copy = [...src]

    const length = copy.length
    for (let i = 0; i < length; i++) {
        const x = copy[i]
        const y = Math.floor(Math.random() * length)
        const z = copy[y]
        copy[i] = z
        copy[y] = x
    }

    if (typeof src === 'string') {
        return copy.join('')
    }

    return copy
}

/**********************************************
 * YOUR CODE BELOW
 **********************************************/

const app = Vue.createApp({

    data: function() {
        return {
            passes: 4,
            maxGuesses: 4,

            game: {
                active: false,
                strikes: 0,
                points: 0,
                guesses: 0,
                guess: '',
                message: '',
                words: ''
            }
        }
    },




    created: function() {
        const game = localStorage.getItem('game')

        if (game) {
            this.game = JSON.parse(game)
        }
    },

    computed: {
        word: function() {
            return this.game.words[0]
        },

        scrambled: function() {
            return shuffle(this.word)
        }
    },


    methods: {

        playGame: function() {
            this.game.guesses = 0
            this.game.message = `Guess the word`
            this.game.active = true

        },

        pass: function() {
            if (this.game.passes) {
                this.game.passes--
                    this.game.words.shift()
            }
        },



        verifyGuess: function() {
            if (this.word === this.game.guess.toLowerCase()) {
                this.game.message = 'You guessed the number!'
                this.game.points++
                    // this.resetGame()
            } else {
                this.game.strikes++

                    // this.resetGame()
            }
        }


    },







    watch: {
        game: {
            deep: true,
            handler: function(game) {
                localStorage.setItem('game', JSON.stringify(game))
            }
        }
    }

})



const vm = app.mount('#app')