const
    chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect,
  should = chai.should(),
 Program = require('./opt.js')

 describe('parse', function() {

    it('verify setting a flag', function() {

        const 
            program = new Program(),
               args = ['-L']

        program.option('-L --labels', 'show labels', false)
               .parse(args)

        expect(program.labels).to.equal(true)

    })

})