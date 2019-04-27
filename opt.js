const
        chai = require('chai'),
      assert = chai.assert,
      should = chai.should(),
       SPACE = ' ',
        DASH = '-',
  DOUBLEDASH = '--',
  SHORTTOKEN = /^-\w{1,2}/,  // a word starting with a dash followed by 1 or 2 alpha
                             // numeric characters
   LONGTOKEN = /--\w{1,20}/,
      REQARG = /<\w{1,20}>/,
      OPTARG = /\[\w{1,20}\]/,
TT_shortflag = 1,            // Token Types  
 TT_longflag = 2,
 TT_argument = 3


 // regular expression matches return an array of descriptive information for
 // matches.  This function just returns the match part (index 0) if there is a 
 // match
function rematch(string, regex) {

    const
        result = string.match(regex)

    if (result)
        return result[0]
    else
        return null

}


// given a word return a token
function findToken(word) {

    let result
    
    // short flag {-x, -xy}
    result = word.match(SHORTTOKEN)
    if (result) {

        if (word == result[result.index])
            return { type: TT_shortflag, value: word } 
        else
            throw `illegal short flag ${word}`

    }

    throw `undefined token ${word}`

}

function isFlag(token) {
    return token.type == TT_shortflag || token.type == TT_longflag
}

function setOption(currentToken, index, tokens) {

    console.log('options: '      + JSON.stringify(this.options))
    console.log('currentToken: ' + JSON.stringify(currentToken))
    console.log('index: '        + index)
    console.log('tokens: '       + JSON.stringify(tokens))

    let option, found, argumentToken, argument

    for (let i = 0; i < this.options.length; i++) {

        option = this.options[i]
        if (  (currentToken.type == TT_shortflag && 
              currentToken.value == option.shortflag) ||
              (currentToken.type == TT_longflag && 
              currentToken.value == option.longflag) ) {
            
            found = true
            break;
        }
    }

    if (found) {

        // for required arguments next token must be an argument
        if (option.required) {

            if (index + 1 == this.tokens.length) {
                throw `${option.longflag} requires an argument`
            } else {

                argumentToken = this.tokens[index + 1]

                if (argumentToken.type == TT_argument) {
                    argument = argumentToken.value
                    index += 1
                } else {
                    throw `${argumentToken.value} argument expected`
                }
            }
        }
        // rubber hits road
        console.log('argument: ' + argument)

        if (argument)
            this[option.name] = argument
        else
            this[option.name] = true

        return ++index
    }

    return index

}

var Program = function () {
}

Program.prototype.options = []

Program.prototype.help = function () {
    console.log(this.name)
    console.log(this.version)
    this.options.forEach(o => { 
        console.log(`${o.flag} ${o.required ? 'required' : ''} ${o.description}`) 
    })
}

Program.prototype.name = function (name) {
    this.name = name
    return this
}

Program.prototype.version = function (version) {
    this.version = version
    return this
}

Program.prototype.option = function (flag, description, required) {

    const 
        longflag = rematch(flag, LONGTOKEN)

    if (!longflag)
        throw `'${flag}' Long flags are required for all options`

    this.options.push({
           shortflag : rematch(flag, SHORTTOKEN),
            longflag : rematch(flag, LONGTOKEN),
                name : longflag.substring(2, longflag.length),
              reqarg : rematch(flag, REQARG),
              optarg : rematch(flag, OPTARG),
         description : description,
            required : required
    })

    return this
}

Program.prototype.parse = function(args) {
    
    let index, currentToken, tokens = []

    args.forEach(function(a) {

        tokens.push(findToken(a))

    })

    index = 0

    do {
        currentToken = tokens[index]  // should always be a short or long flag

        if (isFlag(currentToken))
            index = setOption.call(this, currentToken, index, tokens)
        else
            throw `unexpected argument ${currentToken.value}`

    } while (index < tokens.length)

}

module.exports = Program;
