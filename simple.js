const
    Program = require('./opt.js'),
    program = new Program(),
       args = ['-L', 'bar', '-u', 'peter', '-s']

program.version('1.0.0')

console.log(program.version)

program.option('-L --label <foo>', 'Show labels')
       .option('-u --user <username>', 'User name or alias')
       .option('-s --standard', 'show standard fields only')

program.parse(args)

console.log(program.label)
console.log(program.user)
console.log(program.standard)
console.log(program.options)
