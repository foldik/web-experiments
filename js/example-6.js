"use strict";

( function () {
    const colorCard = document.querySelector( '.example-6>div' )

    const header = document.querySelector( '.example-6>h1' )

    colorCard.addEventListener( 'click', function () {
        const randColor = function () {
            return 'rgb(' + Math.floor( Math.random() * 255 ) + ', ' + Math.floor( Math.random() * 255 ) + ', ' + Math.floor( Math.random() * 255 ) + ')'
        }
        const randomPercentage = function () {
            return 2 + Math.floor( Math.random() * 50 ) + '%'
        }

        const color = randColor()
        colorCard.style.backgroundColor = color
        header.style.backgroundColor = color
        colorCard.style.borderRadius = randomPercentage() + randomPercentage() + randomPercentage() + randomPercentage()
        header.style.borderRadius = randomPercentage() + randomPercentage() + randomPercentage() + randomPercentage()
    } )
}() )
