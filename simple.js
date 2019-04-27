const
    Program = require('./opt.js'),
    program = new Program(),
       args = ['-o', 'bar', '--required', 'baz', '-s', '-v']
       
program.version('1.0.0')
        .option('-o --option [anOption]', 'optional arguments are specfied with [] with a word in it')
        .option('-r --required <requiredArg>', 'required are specified with <> with a word in it')
        .option('-s --standard', 'this is a simple flag long (-- version) is required')
        .option('-u --unset',  'uset flags have undefined (false)value')
        .parse(args)

console.log(program.options)
       
console.log(program.option)                  // bar
console.log(program.required)                // baz
console.log(program.standard)                // true
console.log(program.unset)                   // undefined
