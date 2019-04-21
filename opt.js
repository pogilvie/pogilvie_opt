
 

const
      chai = require('chai'),
    assert = chai.assert,
    should = chai.should(),
     SPACE = ' ',
      DASH = '-'

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

    const    o = {flag: flag, description: description, required}
         split = o.flag.split(SPACE),
      dashFlag = split[0], // required for all options

    assert.equal(dashFlag[0], DASH)

    this.options.push(o)

    return this
}

module.exports = new Program();
