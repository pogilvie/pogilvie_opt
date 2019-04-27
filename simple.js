const
    Program = require('./opt.js'),
    program = new Program(),
       args = ['-L', 'bar']

program.version('1.0.0')

console.log(program.version)

program.option('-L --label <foo>', 'Show labels'. false)

program.parse(args)

console.log(program.label)
