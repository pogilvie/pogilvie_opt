# pogilvie_opt
Command line option handling utility

Currently this module is used by the sodescribe command line utility is not
currently targeting general application use.

pogilvie_opt is inspired by the very popular
[commander](https://www.npmjs.com/package/commander) module.  I choose to write
my own.  I wanted something that would automatically enforce required arguments
instead of treating the next flag as an argument.  Example given two flags which
each require an argument.

````
sodescribe -s Account -u dev
````

Can be mistakenly typed as ...

````
sodescribe -s -u dev
`````
The commander module treats the argument of -s as -u.  Seems to be a known and
not fixable in a backward compatible way so I wrote my own.

Here's an example of how to use it.

````
const
    Program = require('pogilvie_opt'),
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
````

# Version 1.0.0 TODO

- Features
        √ program.name
        √ program.version
        √ program.option() optional argument
        √ program.option() required argument
        √ program.option() simple flag
        - option --help is automatically generated

√ mocha test suite

- circle ci github integration
