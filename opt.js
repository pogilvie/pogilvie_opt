const
       SPACE = ' ',
        DASH = '-',
  DOUBLEDASH = '--',
  SHORTTOKEN = /^-\w{1,2}/,                             // -x or -xy
   LONGTOKEN = /--\w{1,20}/,                            // --hello
      REQARG = /<\w{1,20}>/,                            // <ImRequired>  
      OPTARG = /\[\w{1,20}\]/,                          // [ImOptional]
         ARG = /[a-zA-Z1-9\.@_]{1,30}/,                  // john@doe.com or foo
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

    result = word.match(LONGTOKEN)
    if (result) {

        if (word == result[result.index])
            return { type: TT_longflag, value: word }
        else
            throw `illegal long flag ${word}`
    }

    // argument to a flag -s Account
    result = word.match(ARG)
    if (result) {

        if (word == result[result.index]) 
            return { type: TT_argument, value: word }
        else
            throw `syntax error illegal argument ${word}`
    }

    throw `undefined token ${word}`

}

function isFlag(token) {
    return token.type == TT_shortflag || token.type == TT_longflag
}

function setOption(currentToken, index, tokens) {

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
        if (option.reqarg || option.optarg) {

            if (option.reqarg && index + 1 == tokens.length) {
                throw `${option.longflag} requires an argument`
            } else if (index + 1 < tokens.length) {

                argumentToken = tokens[index + 1]

                if (argumentToken.type == TT_argument) {
                    argument = argumentToken.value
                    index += 1
                } else if (ption.reqarg) {
                    throw `${argumentToken.value} argument expected`
                }
            }
        }

        // rubber hits road
        if (argument)
            this[option.name] = argument
        else
            this[option.name] = true

    }

    return ++index
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

Program.prototype.option = function (flag, description) {

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
         description : description
    })

    return this
}

Program.prototype.parse = function(args) {
    
    let index, currentToken, tokens = []

    args.slice(2).forEach(function(a) {

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

module.exports = Program
