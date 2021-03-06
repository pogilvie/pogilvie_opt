const
 spawnsync = require('child_process').spawnSync,
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
    before(function() {
        hook = captureStream(process.stdout)
    })
    after(function() {
        hook.unhook()
    })

    describe('program', function() {

        
        it('verify setting program name/version', function() {

            const 
                program = new Program();

            // set program name
            program.name('example')
            expect(program.name).to.equal('example')

            // set program version
            expect(program.version).to.be.a('function')
            program.version('1.0.0')
            expect(program.version).to.be.a('string')
            expect(program.version).to.equal('1.0.0')

        }) 

        it('verify setting a flag', function() {

            const 
                program = new Program(),
                   args = ['node', 'script','-L']

            program.option('-L --labels', 'show labels')
                   .parse(args)

            expect(program.labels).to.equal(true)

        })

        it('verify setting an argument', function() {

            const 
                program = new Program(),
                   args = ['node', 'script','-u', 'someone@somewhere.org']

            program.option('-u --user <username>', 'set username')
                   .parse(args)

            expect(program.user).to.equal('someone@somewhere.org')

        })

        it('verify setting an argument ending in __c', function() {

            const 
                program = new Program(),
                   args = ['node', 'script','-s', 'Hawk__c']

            program.option('-s --sobject <sobject>', 'Setup target sobject')
                   .parse(args)

            expect(program.sobject).to.equal('Hawk__c')

        })

        it('verify setting an argument with an - inside it', function() {

            const 
                program = new Program(),
                   args = ['node', 'script','-u', 'foo-bar']

            program.option('-u --user <user>', 'user name')
                   .parse(args)

            expect(program.user).to.equal('foo-bar')

        })

        it('verify fail if a required argument is missing', function() {

            const 
                program = new Program(),
                   args = ['node', 'script', '-u']
            
            assert.throws(function() {
                program.option('-u --user <username>', 'set username').parse(args)
            }, '--user requires an argument', '--user requires an argument')

        })

        it('verify that a spawned program works', function() {

            const
                result = spawnsync('node', ['simple_real.js', '-s', 'Account'], {encoding: 'utf8'})
            
            expect('Account\n').to.be.equal(result.stdout);

        })

    })
})


