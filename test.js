const
    chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect,
  should = chai.should(),
 Program = require('./opt.js')

 function captureStream(stream) {
    let oldWrite = stream.write,
        buf = ''

    stream.write = function(chunk, encoding, callback){
        buf += chunk.toString()             // chunk is a String or Buffer
        oldWrite.apply(stream, arguments)
    }
  
    return {
        unhook: function unhook() {
            stream.write = oldWrite
        },
        captured: function(){
            return buf
        }
    }
}


describe('opt', function() {
    
    // expect('hello world\n').to.be.equal(hook.captured())
    let hook
    beforeEach(function() {
        hook = captureStream(process.stdout)
    })
    afterEach(function() {
        hook.unhook()
    })

    describe('program', function() {

        
        it('should print out argument help', function() {
            
            const
                program = new Program()

            console.log('\nthis is the help output ...')
            program.name('sodescribe: get ojbect information from a salesforce org')
                   .version('1.0.0')
                   .option('-s --sobject <myObject__c>', 'name of the Salesforce object to describe', false)
                   .option('-u --user <name@example.com>', 'DX authenticated user name or alias', true)
                   .help()
            console.log('\n')
        })

        it('verify setting program name/version', function() {

            const 
                program = new Program();

            program.name('example')

            expect(program.name).to.equal('example')

            expect(program.version).to.be.a('function')
            program.version('1.0.0')
            expect(program.version).to.be.a('string')
            expect(program.version).to.equal('1.0.0')

        }) 

        it('verify setting a flag', function() {

            const 
                program = new Program(),
                   args = ['-L']

            program.option('-L --labels', 'show labels', false)
                   .parse(args)

            expect(program.labels).to.equal(true)

        })

        it('verify setting an argument', function() {

            const 
                program = new Program(),
                   args = ['-u', 'someone@somewhere.org']

            program.option('-u --user <username>', 'set username', true)
                   .parse(args)

            expect(prgram.user).to.equal('someone@somewhere.org')

        })
        
    })
})


