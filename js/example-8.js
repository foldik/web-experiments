"use strict";

( function () {

    const helps = new Map()
    helps.set( 'package', `Java files are usually placed in different folders. Let's say you put your Hello.java file into the my/awesomeness folder. Then you have to put the package my.awesomeness on top of the <span class="keyword">Hello.java</span> file.` )
    helps.set( 'import', `Let's say you want to do something interesting by using some programs already been written by smart people. You should use the <span class="keyword">import</span> keyword and you can use those classes.` )
    helps.set( '@Great', `It's a simple annotation. If you want to look smart you can call it "byte level meta data". Now it's just a fancy thing here but later we will learn how can you use it.` )
    helps.set( 'public', `This is a tricky keyword and we can use it in several sitations. Briefly it shows where we can use the marked <span class="keyword">class</span>, method.` )
    helps.set( '"Just because"', 'This is a simple string which means some text. You can define a string by cover some characters with quotation mark.' )
    helps.set( '"Hello World! #"', 'This is a simple string which means some text. You can define a string by cover some characters with quotation mark.' )
    helps.set( 'static', 'Static means the mentioned method or data is owned by the class the object created from it. For example PI is a static property of the Math class.' )
    helps.set( 'int', `It's a data type. <span class="keyword">int</span> variables can keep whole numbers like <span class="number">10</span>, <span class="number">26565468</span>.` )
    helps.set('Main', 'This is the name of the class.')
    helps.set('main', 'This is the main method. Each program has to have a main method. Not each class, but each program. This is where the program starts.')
    helps.set('String', 'String is a data type for text. You can store bare text in these kind of variables.')
    helps.set('void', 'When you want a method to return nothing then you can use the <span class="keyword">void</span> keyword.')
    helps.set('for', 'This is the <span class="keyword">for</span> cycle. You can do repeated tasks with it.')
    helps.set('println', 'This is the famous print line method. You can show messages in the console by using this method.')
    helps.set('foldik', 'This is me. I hope you liked this experiment. :)')

    const splitter = {
        split: function ( code ) {

            const keywords = new Set( [
                'abstract', 'continue', 'for', 'new', 'switch', 'assert', 'default', 'goto', 'package', 'synchronized', 'boolean', 'do', 'if', 'private', 'this', 'break', 'double', 'implements',
                'protected', 'throw', 'byte', 'else', 'import', 'public', 'throws', 'case', 'enum', 'instanceof', 'return', 'transient', 'catch', 'extends', 'int', 'short', 'try', 'char', 'final', 'interface',
                'static', 'void', 'class', 'finally', 'long', 'strictfp', 'volatile', 'const', 'float', 'native', 'super', 'while'
            ] )

            const separators = new Map()
            separators.set( '\n', 'indent' )
            separators.set( '\t', 'indent' )
            separators.set( ' ', 'indent' )
            separators.set( ';', 'semicolon' )
            separators.set( ',', 'colon' )
            separators.set( '(', 'openingBracket' )
            separators.set( ')', 'closingBracket' )
            separators.set( '[', 'openingSquareBracket' )
            separators.set( ']', 'closingSquareBracket' )
            separators.set( '{', 'openingCurlyBracket' )
            separators.set( '}', 'closingCurlyBracket' )
            separators.set( '.', 'dot' )
            separators.set( '=', 'equalSign' )

            const add = function ( type, content ) {
                elements.push( {
                    type: type,
                    content: content
                } )
            }

            const isNumber = function ( n ) {
                return !isNaN( parseFloat( n ) ) && isFinite( n );
            }

            const evaluateText = function ( ch ) {
                if ( keywords.has( cache ) ) {
                    add( 'keyword', cache )
                } else {
                    if ( isNumber( cache ) ) {
                        add( 'number', cache )
                    } else if ( cache !== '' && cache.charAt( 0 ) === '@' ) {
                        add( 'annotation', cache )
                    } else if ( cache !== '' ) {
                        add( 'text', cache )
                    }
                }
                if ( ch !== '' ) {
                    add( separators.get( ch ), ch )
                }
                cache = ''
            }

            let elements = [],
                cache = '',
                inString = false,
                codeCharacters = code.split( '' )

            while ( codeCharacters.length > 0 ) {
                const ch = codeCharacters.shift()
                if ( ch === '"' ) {
                    let stringContent = ch
                    let tmpChar = ''
                    let completed = false
                    while ( codeCharacters.length > 0 && !completed ) {
                        if ( ( tmpChar = codeCharacters.shift() ) === '"' && stringContent.charAt( stringContent.length - 1 ) !== '\\' ) {
                            completed = true
                        }
                        stringContent = stringContent + tmpChar
                    }
                    add( 'string', stringContent )
                } else if ( separators.has( ch ) ) {
                    evaluateText( ch )
                } else {
                    cache = cache + ch
                }
            }

            return elements
        }
    }

    const processor = {
        processString: function ( text, language ) {
            if ( language !== 'java' ) {
                throw 'Only java language is supported at the moment.'
            }
            const codeParts = splitter.split( text )

            let result = ''
            for ( var i = 0; i < codeParts.length; i++ ) {
                const part = codeParts[ i ]
                if ( part.type === 'indent' ) {
                    result = result + part.content
                } else {
                    result = result + '<span class="' + part.type + '">' + part.content + '</span>'
                }
            }
            return result
        }
    }

    const preHolder = document.querySelector( 'pre' )
    const codeHolder = document.querySelector( '.language-java' )
    const helpHolder = document.querySelector( '.help' )

    codeHolder.innerHTML = processor.processString( codeHolder.innerText, 'java' )

    codeHolder.querySelectorAll( '.language-java>span' ).forEach( function ( element ) {
        element.addEventListener( 'click', function ( event ) {
            event.preventDefault()
            event.stopPropagation()
            const className = event.target.className
            if ( helps.has( event.target.innerText ) ) {
                let helpMessage = '<p class="' + className + ' message-title">' + event.target.innerText + '</p>'
                helpMessage = helpMessage + '<p>' + helps.get( event.target.innerText ) + '</p>'
                helpHolder.innerHTML = helpMessage
                var rect = preHolder.getBoundingClientRect()
                var y = event.clientY - rect.top
                var x = event.clientX - rect.left
                helpHolder.style.top = y + 'px'
                helpHolder.style.left = x + 'px'
                helpHolder.classList.add( 'show' )
            }

        } )
    } )

    preHolder.addEventListener( 'click', function ( event ) {
        helpHolder.classList.remove( 'show' )
        helpHolder.innerText = ''
    } )

}() )
