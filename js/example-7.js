"use strict";

( function () {
    const example7Board = document.querySelector( '.example-7' )

    function gameHandler( board ) {

        const operators = new Map()
        operators.set( '+', function ( a, b ) {
            return a + b
        } )
        operators.set( '-', function ( a, b ) {
            return a - b
        } )
        operators.set( '/', function ( a, b ) {
            return a / b
        } )
        operators.set( '*', function ( a, b ) {
            return a * b
        } )

        let number1 = null,
            number2 = null,
            operator = null,
            counter = 0

        function randomOperator() {
            const n = Math.random()
            if ( n < 0.25 ) {
                return '+'
            } else if ( n < 0.5 ) {
                return '-'
            } else if ( n < 0.75 ) {
                return '/'
            } else {
                return '*'
            }
        }

        function next() {
            if ( number1 === null ) {
                number1 = 1 + Math.random() * 100
                const number1Holder = document.createElement( 'p' )
                number1Holder.classList.add( 'card' )
                number1Holder.innerText = number1.toFixed( 2 )
                board.appendChild( number1Holder )
            }

            number2 = 1 + Math.random() * 100
            operator = randomOperator()
            counter++

            const operatorHolder = document.createElement( 'p' )
            operatorHolder.classList.add( 'operator' )
            operatorHolder.innerText = operator

            const number2Holder = document.createElement( 'p' )
            number2Holder.classList.add( 'card' )
            number2Holder.innerText = number2.toFixed( 2 )

            const equalSignHolder = document.createElement( 'p' )
            equalSignHolder.classList.add( 'operator' )
            equalSignHolder.innerText = '='

            const resultHolder = document.createElement( 'p' )
            resultHolder.classList.add( 'card' )
            resultHolder.setAttribute( 'contenteditable', 'true' )
            resultHolder.setAttribute( 'id', 'guess-5-percent-' + counter )
            resultHolder.addEventListener( 'keyup', function ( event ) {
                var enterKey = 13;
                if ( event.which == enterKey ) {
                    console.log( resultHolder.innerText )
                    const good = isGood( resultHolder.innerText )
                    console.log( good )
                    resultHolder.setAttribute( 'contenteditable', 'false' )
                    if ( good ) {
                        resultHolder.classList.add( 'good' )
                        number1 = parseFloat( resultHolder.innerText )
                        next()
                    } else {
                        resultHolder.classList.add( 'bad' )
                    }
                }
            } )

            board.appendChild( operatorHolder )
            board.appendChild( number2Holder )
            board.appendChild( equalSignHolder )
            board.appendChild( resultHolder )
            if ( counter > 1 ) {
                resultHolder.focus()
            }
        }

        function isNumeric( n ) {
            return !isNaN( parseFloat( n ) ) && isFinite( n )
        }

        function isGood( answer ) {
            if ( !isNumeric( answer ) ) {
                return false
            }
            const expectedResult = operators.get( operator )( number1, number2 )
            if ( Math.abs( expectedResult - parseFloat( answer ) ) / expectedResult > 0.05 ) {
                return false
            } else {
                return true
            }
        }

        return {
            next: next
        }
    }

    const handler = gameHandler( example7Board )

    handler.next()

}() )
